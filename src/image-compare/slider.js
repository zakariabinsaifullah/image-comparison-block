/**
 * Before/after slider behaviour, shared by the editor preview and the front end.
 *
 * Expects the markup produced by render.php / edit.js:
 * a root element with `.icgb-compare__container` and a `.icgb-compare__handle`.
 */

const clamp = ( value ) => Math.min( 100, Math.max( 0, value ) );

/**
 * Attach slider behaviour to a block element.
 *
 * @param {HTMLElement} root Block wrapper element.
 * @return {() => void} Cleanup function that removes all listeners.
 */
export default function initImageCompare( root ) {
	const container = root.querySelector( '.icgb-compare__container' );
	const handle = root.querySelector( '.icgb-compare__handle' );

	if ( ! container || ! handle ) {
		return () => {};
	}

	const vertical = root.classList.contains( 'is-vertical' );
	const followHover = root.dataset.hover === 'true';
	let position = clamp( parseFloat( root.dataset.start ) || 50 );
	let dragging = false;

	const setPosition = ( value ) => {
		position = clamp( value );
		root.style.setProperty( '--icgb-position', `${ position }%` );
		handle.setAttribute(
			'aria-valuenow',
			String( Math.round( position ) )
		);
	};

	const positionFromEvent = ( event ) => {
		const rect = container.getBoundingClientRect();
		if ( vertical ) {
			return rect.height
				? ( ( event.clientY - rect.top ) / rect.height ) * 100
				: position;
		}
		return rect.width
			? ( ( event.clientX - rect.left ) / rect.width ) * 100
			: position;
	};

	const onPointerDown = ( event ) => {
		if ( event.pointerType === 'mouse' && event.button !== 0 ) {
			return;
		}
		dragging = true;
		root.classList.add( 'is-dragging' );
		setPosition( positionFromEvent( event ) );
		try {
			container.setPointerCapture( event.pointerId );
		} catch {
			// Capture is a nice-to-have; dragging still works inside the image.
		}
		handle.focus( { preventScroll: true } );
		event.preventDefault();
	};

	const onPointerMove = ( event ) => {
		if ( dragging || ( followHover && event.pointerType === 'mouse' ) ) {
			setPosition( positionFromEvent( event ) );
		}
	};

	const onPointerUp = ( event ) => {
		if ( ! dragging ) {
			return;
		}
		dragging = false;
		root.classList.remove( 'is-dragging' );
		if ( container.hasPointerCapture?.( event.pointerId ) ) {
			container.releasePointerCapture( event.pointerId );
		}
	};

	const onKeyDown = ( event ) => {
		const step = event.shiftKey ? 10 : 1;
		const keys = {
			ArrowLeft: position - step,
			ArrowDown: vertical ? position + step : position - step,
			ArrowRight: position + step,
			ArrowUp: vertical ? position - step : position + step,
			PageDown: position - 10,
			PageUp: position + 10,
			Home: 0,
			End: 100,
		};
		if ( event.key in keys ) {
			event.preventDefault();
			event.stopPropagation();
			setPosition( keys[ event.key ] );
		}
	};

	// Images are not draggable on their own; avoid the ghost-image drag.
	const onDragStart = ( event ) => event.preventDefault();

	container.addEventListener( 'pointerdown', onPointerDown );
	container.addEventListener( 'pointermove', onPointerMove );
	container.addEventListener( 'pointerup', onPointerUp );
	container.addEventListener( 'pointercancel', onPointerUp );
	container.addEventListener( 'dragstart', onDragStart );
	handle.addEventListener( 'keydown', onKeyDown );

	setPosition( position );

	return () => {
		container.removeEventListener( 'pointerdown', onPointerDown );
		container.removeEventListener( 'pointermove', onPointerMove );
		container.removeEventListener( 'pointerup', onPointerUp );
		container.removeEventListener( 'pointercancel', onPointerUp );
		container.removeEventListener( 'dragstart', onDragStart );
		handle.removeEventListener( 'keydown', onKeyDown );
		root.classList.remove( 'is-dragging' );
	};
}
