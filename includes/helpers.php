<?php
/**
 * Helper functions.
 *
 * @package ImageCompareBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Build the <img> markup for one side of the comparison.
 *
 * Uses the attachment (with srcset/sizes and loading optimisation) when the
 * image is in the media library, and falls back to the stored URL otherwise.
 *
 * @param int    $id      Attachment ID.
 * @param string $url     Image URL.
 * @param string $alt     Alternative text.
 * @param string $classes CSS classes.
 * @return string Image markup, or an empty string when there is no image.
 */
function icgb_get_image_markup( $id, $url, $alt, $classes ) {
	$id  = absint( $id );
	$alt = (string) $alt;

	if ( $id && wp_attachment_is_image( $id ) ) {
		$html = wp_get_attachment_image(
			$id,
			'full',
			false,
			array(
				'class'     => $classes,
				'alt'       => $alt,
				'draggable' => 'false',
			)
		);
		if ( $html ) {
			return $html;
		}
	}

	if ( '' === esc_url( (string) $url ) ) {
		return '';
	}

	return sprintf(
		'<img src="%1$s" alt="%2$s" class="%3$s" loading="lazy" decoding="async" draggable="false" />',
		esc_url( $url ),
		esc_attr( $alt ),
		esc_attr( $classes )
	);
}

/**
 * Allowed HTML for the comparison images, for use with wp_kses().
 *
 * The default wp_kses_post() list strips srcset, sizes and decoding, so
 * responsive images need their own list.
 *
 * @return array Allowed tags and attributes.
 */
function icgb_image_allowed_html() {
	return array(
		'img' => array(
			'src'           => true,
			'srcset'        => true,
			'sizes'         => true,
			'alt'           => true,
			'class'         => true,
			'width'         => true,
			'height'        => true,
			'loading'       => true,
			'decoding'      => true,
			'fetchpriority' => true,
			'draggable'     => true,
		),
	);
}

/**
 * Sanitize a single CSS value such as a color, length or clamp() expression.
 *
 * Allows hex, rgb()/hsl(), var(), calc()/clamp() and plain lengths, and rejects
 * anything that could end the declaration or load a resource.
 *
 * @param mixed $value Raw value.
 * @return string Safe value, or an empty string.
 */
function icgb_sanitize_css_value( $value ) {
	if ( ! is_scalar( $value ) ) {
		return '';
	}

	$value = trim( (string) $value );

	if ( '' === $value || strlen( $value ) > 200 ) {
		return '';
	}

	if ( ! preg_match( '/^[a-zA-Z0-9#%.,\s()+\-\/*]+$/', $value ) || preg_match( '/url\s*\(|expression\s*\(/i', $value ) ) {
		return '';
	}

	return $value;
}
