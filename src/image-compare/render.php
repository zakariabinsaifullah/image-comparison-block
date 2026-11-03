<?php
/**
 * Server-side rendering of the `icgb/image-compare` block.
 *
 * @package ImageCompareBlock
 *
 * @var array  $attributes Block attributes.
 * @var string $content    Saved block markup (empty for blocks saved by 1.7.0+).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$icgb_before = icgb_get_image_markup(
	$attributes['beforeImageId'] ?? 0,
	$attributes['beforeImageUrl'] ?? '',
	$attributes['beforeImageAlt'] ?? '',
	'icgb-compare__image icgb-compare__image--before'
);
$icgb_after  = icgb_get_image_markup(
	$attributes['afterImageId'] ?? 0,
	$attributes['afterImageUrl'] ?? '',
	$attributes['afterImageAlt'] ?? '',
	'icgb-compare__image icgb-compare__image--after'
);

if ( ! $icgb_before || ! $icgb_after ) {
	return;
}

$icgb_vertical     = ! empty( $attributes['verticalMode'] );
$icgb_start        = isset( $attributes['startingPoint'] ) ? max( 0, min( 100, (float) $attributes['startingPoint'] ) ) : 50;
$icgb_show_labels  = ! empty( $attributes['showLabel'] );
$icgb_before_label = $icgb_show_labels ? (string) ( $attributes['leftImageLabel'] ?? '' ) : '';
$icgb_after_label  = $icgb_show_labels ? (string) ( $attributes['rightImageLabel'] ?? '' ) : '';

$icgb_handle_style = in_array( $attributes['handleStyle'] ?? '', array( 'circle', 'square', 'line' ), true ) ? $attributes['handleStyle'] : 'circle';
$icgb_label_pos    = $attributes['labelPosition'] ?? '';
if ( ! in_array( $icgb_label_pos, array( 'start', 'center', 'end' ), true ) ) {
	$icgb_label_pos = $icgb_vertical ? 'start' : 'end';
}

// Keep in sync with getWrapperProps() in utils.js.
$icgb_classes = array(
	'icgb-compare',
	$icgb_vertical ? 'is-vertical' : 'is-horizontal',
	'is-handle-' . $icgb_handle_style,
);
if ( $icgb_show_labels ) {
	$icgb_classes[] = 'is-label-' . $icgb_label_pos;
	if ( ! empty( $attributes['labelsOnHover'] ) ) {
		$icgb_classes[] = 'has-labels-on-hover';
	}
}

/*
 * Style variables go on the inner container. Core runs safecss_filter_attr()
 * on wrapper styles, which drops rgba()/hsla() colors. The slider position
 * stays on the wrapper because view.js updates it there.
 */
$icgb_vars = array(
	'--icgb-handle-color' => $attributes['handleColor'] ?? '',
	'--icgb-handle-bg'    => $attributes['handleBackground'] ?? '',
	'--icgb-knob-size'    => empty( $attributes['handleSize'] ) ? '' : max( 16, min( 200, (int) $attributes['handleSize'] ) ) . 'px',
	'--icgb-line-width'   => isset( $attributes['lineWidth'] ) && is_numeric( $attributes['lineWidth'] ) ? max( 0, min( 20, (int) $attributes['lineWidth'] ) ) . 'px' : '',
	'--icgb-label-color'  => $attributes['labelColor'] ?? '',
	'--icgb-label-bg'     => $attributes['labelBackground'] ?? '',
	'--icgb-label-size'   => $attributes['labelFontSize'] ?? '',
);

$icgb_container_style = '';
foreach ( $icgb_vars as $icgb_property => $icgb_value ) {
	$icgb_value = icgb_sanitize_css_value( $icgb_value );
	if ( '' !== $icgb_value ) {
		$icgb_container_style .= $icgb_property . ':' . $icgb_value . ';';
	}
}

$icgb_wrapper_attributes = array(
	'class'      => implode( ' ', $icgb_classes ),
	'style'      => '--icgb-position:' . $icgb_start . '%',
	'data-hover' => empty( $attributes['hover'] ) ? 'false' : 'true',
	'data-start' => (string) $icgb_start,
);

// HTML anchor. Older WordPress versions do not output it for server-rendered
// blocks. Posts saved by 1.5.0–1.6.2 keep it in the markup until re-saved.
$icgb_anchor = isset( $attributes['anchor'] ) && is_string( $attributes['anchor'] ) ? $attributes['anchor'] : '';
if ( '' === $icgb_anchor && ! empty( $content ) ) {
	$icgb_saved = new WP_HTML_Tag_Processor( $content );
	if ( $icgb_saved->next_tag() && is_string( $icgb_saved->get_attribute( 'id' ) ) ) {
		$icgb_anchor = $icgb_saved->get_attribute( 'id' );
	}
}
if ( '' !== $icgb_anchor ) {
	$icgb_wrapper_attributes['id'] = $icgb_anchor;
}

$icgb_wrapper = get_block_wrapper_attributes( $icgb_wrapper_attributes );

$icgb_image_html = icgb_image_allowed_html();
?>
<div <?php echo wp_kses_data( $icgb_wrapper ); ?>>
	<div class="icgb-compare__container" style="<?php echo esc_attr( $icgb_container_style ); ?>">
		<?php echo wp_kses( $icgb_after, $icgb_image_html ); ?>
		<div class="icgb-compare__before">
			<?php echo wp_kses( $icgb_before, $icgb_image_html ); ?>
		</div>
		<?php if ( '' !== $icgb_before_label ) : ?>
			<span class="icgb-compare__label is-before"><?php echo esc_html( $icgb_before_label ); ?></span>
		<?php endif; ?>
		<?php if ( '' !== $icgb_after_label ) : ?>
			<span class="icgb-compare__label is-after"><?php echo esc_html( $icgb_after_label ); ?></span>
		<?php endif; ?>
		<div
			class="icgb-compare__handle"
			role="slider"
			tabindex="0"
			aria-label="<?php esc_attr_e( 'Image comparison slider', 'image-compare-block' ); ?>"
			aria-orientation="<?php echo esc_attr( $icgb_vertical ? 'vertical' : 'horizontal' ); ?>"
			aria-valuemin="0"
			aria-valuemax="100"
			aria-valuenow="<?php echo esc_attr( (string) round( $icgb_start ) ); ?>"
		>
			<span class="icgb-compare__knob">
				<svg class="icgb-compare__arrows" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>
			</span>
		</div>
	</div>
</div>
