<?php
/**
 * Plugin Name: Image Compare Block
 * Description: <strong>Image Compare Block</strong> is a custom Gutenberg Block developed with Gutenberg Native Components to showcase images comparision. 
 * Author: Zakaria Binsaifullah
 * Author URI: https://makegutenblock.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package BCB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
require_once plugin_dir_path( __FILE__ ) . 'admin/admin.php';

// Plugin Action Link 
function icgb_admin_settings_link( $links ) {
	$new_link = array(
		'<a href="'. esc_url( 'https://makegutenblock.com/contact/' ) .'" target="_blank" style="color: #A11637; font-weight: 600">Contact</a>'
	);
	return array_merge( $new_link, $links );
}
add_filter( 'plugin_action_links_' . plugin_basename(__FILE__), 'icgb_admin_settings_link' );

// Redirecting
function icgb_user_redirecting( $plugin ) {
	if( plugin_basename(__FILE__) == $plugin ){
		wp_redirect( admin_url( 'tools.php?page=icgb-image-compare' ) );
		die();
	}
}
add_action( 'activated_plugin', 'icgb_user_redirecting' );