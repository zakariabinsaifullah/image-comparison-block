/**
 * Shared helpers for the Image Compare block.
 *
 * Keep the classes and CSS variables in sync with render.php.
 */

export const clampPercent = ( value ) =>
	Math.min( 100, Math.max( 0, value ?? 50 ) );

/**
 * Labels sit at the bottom in horizontal mode and on the left in vertical mode
 * unless a position is chosen.
 *
 * @param {Object}  attributes               Block attributes.
 * @param {string}  attributes.labelPosition Chosen position, if any.
 * @param {boolean} attributes.verticalMode  Whether the slider is vertical.
 * @return {string} start, center or end.
 */
export const getLabelPosition = ( { labelPosition, verticalMode } ) =>
	labelPosition || ( verticalMode ? 'start' : 'end' );

/**
 * Classes and inline CSS variables for the block wrapper.
 *
 * @param {Object} attributes Block attributes.
 * @return {{className: string, style: Object}} Wrapper props.
 */
export function getWrapperProps( attributes ) {
	const {
		verticalMode,
		showLabel,
		labelsOnHover,
		startingPoint,
		handleStyle,
		handleColor,
		handleBackground,
		handleSize,
		lineWidth,
		labelColor,
		labelBackground,
		labelFontSize,
	} = attributes;

	const className = [
		'icgb-compare',
		verticalMode ? 'is-vertical' : 'is-horizontal',
		`is-handle-${ handleStyle || 'circle' }`,
		showLabel && `is-label-${ getLabelPosition( attributes ) }`,
		showLabel && labelsOnHover && 'has-labels-on-hover',
	]
		.filter( Boolean )
		.join( ' ' );

	const style = {
		'--icgb-position': `${ clampPercent( startingPoint ) }%`,
		'--icgb-handle-color': handleColor || undefined,
		'--icgb-handle-bg': handleBackground || undefined,
		'--icgb-knob-size': handleSize ? `${ handleSize }px` : undefined,
		'--icgb-line-width': lineWidth ? `${ lineWidth }px` : undefined,
		'--icgb-label-color': labelColor || undefined,
		'--icgb-label-bg': labelBackground || undefined,
		'--icgb-label-size': labelFontSize || undefined,
	};

	return { className, style };
}
