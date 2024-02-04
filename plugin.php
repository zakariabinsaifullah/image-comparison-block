<?php
/**
 * Plugin Name:       Beaf - Photo Comparison Block
 * Description:       <strong>Beaf</strong> is a custom Gutenberg Block developed with Gutenberg Native Components to showcase photos comparison. 
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           1.6.0
 * Author:            Gutenbergkits
 * Author URI:        https://gutenbergkits.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       image-comparision-block
 */


if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly. 

/**
 * Beaf - Photo Comparison Block 
 * 
 * @package Beaf
 * @since 1.0.0
 */
final class ICGB_BLOCKS_CLASS {

	/**
	 * Initialize the plugin
	 * 
	 * @since 1.0.0
	 * @return void
	 */
	public function __construct() {

		// define constants
		$this->icgb_define_constants();

		// block initialization
		add_action( 'init', [ $this, 'icgb_blocks_init' ] );

		// Redirecting
		add_action( 'activated_plugin', [ $this, 'icgb_user_redirecting' ] );

		// enqueue block assets
		add_action( 'enqueue_block_assets', [ $this, 'icgb_external_libraries' ] );

		// include admin file
		$this->include(); 
	}

	/**
	 * Redirecting to the plugin page
	 * 
	 * @since 1.0.0
	 * @return void
	 */
	public function icgb_user_redirecting( $plugin ) {
		if( plugin_basename(__FILE__) === $plugin ){
			wp_redirect( admin_url( 'tools.php?page=icgb-image-compare' ) );
			die();
		}
	}

	/**
	 * Initialize the plugin
	 */
	public static function init(){
		static $instance = false; 
		if( ! $instance ) {
			$instance = new self();
		}
		return $instance;
	}

	/**
	 * Define the plugin constants
	 * 
	 * @since 1.0.0
	 * @return void
	 */
	private function icgb_define_constants() {
		define( 'ICGB_VERSION', '1.5.3' );
		define( 'ICGB_URL', plugin_dir_url( __FILE__ ) );
		define( 'ICGB_PATH', plugin_dir_path( __FILE__ ) );
		define( 'ICGB_LIB_URL', ICGB_URL . 'lib/' );		
	}

	/**
	 * Blocks Registration 
	 * 
	 * @param string $name 
	 * @param array $options
	 * @return void
	 */
	public function icgb_register_block( $name, $options = array() ) {
		register_block_type( __DIR__ . '/build/' . $name, $options );
	 }

	/**
	 * Blocks Initialization
	 * 
	 * @return void
	 * @since 1.0.0
	 * @return void
	*/
	public function icgb_blocks_init() {
		// register single block
		$this->icgb_register_block( 'image-comparision' );
	}

	/**
	 * Enqueue Block Assets
	 */
	public function icgb_external_libraries() {
		if( ! is_admin() ){
			wp_enqueue_style( 'icgb__image-compare-viewer-css', ICGB_LIB_URL . '/css/image-compare-viewer.css', array(), ICGB_VERSION, 'all');
			wp_enqueue_script( 'icgb__image-compare-viewer-js', ICGB_LIB_URL . '/js/image-compare-viewer.js', array(), ICGB_VERSION, true );
			wp_enqueue_script( 'icgb__plugin-js', ICGB_LIB_URL . '/js/plugin.js', array(), ICGB_VERSION, true );
		}
	}
	
	/**
	 * Include admin file
	 * 
	 * @since 1.0.0
	 * @return void
	 */
	private function include() {
		require_once plugin_dir_path( __FILE__ ) . 'admin/admin.php';
	}

}

/**
 * Kickoff
*/
ICGB_BLOCKS_CLASS::init();
