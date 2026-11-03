<?php
/**
 * Plugin Name:       Image Compare Block
 * Plugin URI:        https://wordpress.org/plugins/image-compare-block/
 * Description:       A lightweight, accessible before/after image comparison block for the WordPress block editor.
 * Version:           1.7.0
 * Requires at least: 6.6
 * Requires PHP:      7.4
 * Author:            Zakaria Binsaifullah
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       image-compare-block
 *
 * @package ImageCompareBlock
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'ICGB_VERSION', '1.7.0' );
define( 'ICGB_FILE', __FILE__ );
define( 'ICGB_DIR', plugin_dir_path( __FILE__ ) );
define( 'ICGB_URL', plugin_dir_url( __FILE__ ) );

require_once ICGB_DIR . 'includes/helpers.php';

if ( is_admin() ) {
	require_once ICGB_DIR . 'admin/class-icgb-admin-page.php';
}

/**
 * Register the block from its compiled metadata.
 */
function icgb_register_blocks() {
	register_block_type( ICGB_DIR . 'build/image-compare' );
}
add_action( 'init', 'icgb_register_blocks' );

/**
 * Add a "Contact" link to the plugin row.
 *
 * @param string[] $links Plugin action links.
 * @return string[]
 */
function icgb_plugin_action_links( $links ) {
	$new_links = array(
		sprintf(
			'<a href="%1$s">%2$s</a>',
			esc_url( admin_url( 'tools.php?page=icgb-image-compare' ) ),
			esc_html__( 'Getting started', 'image-compare-block' )
		),
		sprintf(
			'<a href="%1$s" target="_blank" rel="noopener noreferrer" style="color:#A11637;font-weight:600">%2$s</a>',
			esc_url( 'https://makegutenblock.com/contact/' ),
			esc_html__( 'Contact', 'image-compare-block' )
		),
	);
	return array_merge( $new_links, $links );
}
add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'icgb_plugin_action_links' );
