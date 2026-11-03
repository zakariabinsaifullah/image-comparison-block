/**
 * Front-end initialisation for the Image Compare block.
 */
import initImageCompare from './slider';

const init = () => {
	document
		.querySelectorAll( '.wp-block-icgb-image-compare' )
		.forEach( ( element ) => {
			if ( ! element.dataset.icgbReady ) {
				element.dataset.icgbReady = 'true';
				initImageCompare( element );
			}
		} );
};

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', init );
} else {
	init();
}
