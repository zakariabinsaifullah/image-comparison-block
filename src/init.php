<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Blocks Class
*/

final class ICGB_Block_Class {

	private function __construct(){
		$this->icgb_define_constants(); 
		add_action( 'init', [ $this, 'icgb_blocks_assets' ] );
		add_action( 'enqueue_block_assets', [ $this, 'icgb_external_assets_load' ] );
	}

	/**
	 * Singleton Instanace 
	*/

	public static function icgb_init(){
		static $instance = false; 
		if( ! $instance ) {
			$instance = new self();
		}
		return $instance;
	}

	/**
	 * Constants Define 
	*/
	public function icgb_define_constants(){
		define( 'ICGB_FILE', __FILE__ );
		define( 'ICGB_BLOCK', plugins_url( '', dirname( ICGB_FILE ) ) );
		define( 'ICGB_BLOCK_ASSETS', ICGB_BLOCK . '/dist' );
		define( 'ICGB_EXTERNAL_ASSETS', ICGB_BLOCK . '/assets' );
	}

	/**
	 * Blocks Registration 
	*/
	private function icgb_single_block_register( $block, $options=array() ){
		return register_block_type(
			'icgb/'. $block, 
			array_merge(
				array(
					'editor_script' => 'icgb-editor-script',
					'editor_style'  => 'icgb-editor-style',
					'style'         => 'icgb-style',
				),
				$options
			)
		);
	}

	/**
	 * Blocks Assets + Registration 
	*/
	public function icgb_blocks_assets(){

		// Frontend + Backend Style 
		wp_register_style(
			'icgb-style',
			ICGB_BLOCK_ASSETS . '/blocks.style.build.css',
			is_admin() ? array( 'wp-editor' ) : null,
			null
		);

		// Backend Style 
		wp_register_style(
			'icgb-editor-style',
			ICGB_BLOCK_ASSETS . '/blocks.editor.build.css',
			array( 'wp-edit-blocks' ),
			null
		);

		// Editor Scripts
		wp_register_script(
			'icgb-editor-script',
			ICGB_BLOCK_ASSETS . '/blocks.build.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
			null,
			true
		);

		// Register Single Block 
		$this->icgb_single_block_register('image-compare');
	
	}

	/**
	 * External Assets Enqueue 
	*/
	public function icgb_external_assets_load(){
		if( ! is_admin() ){
			wp_enqueue_style( 'icgb__image-compare-viewer-css', ICGB_EXTERNAL_ASSETS . '/css/image-compare-viewer.css' );
			wp_enqueue_script( 'icgb__image-compare-viewer-js', ICGB_EXTERNAL_ASSETS . '/js/image-compare-viewer.js', array(), '1.0.0', true );
			wp_enqueue_script( 'icgb__plugin-js', ICGB_EXTERNAL_ASSETS . '/js/plugin.js', array(), '1.0.0', true );
		}
	}
	
}
/**
 * Initialization 
*/
function icgb_block_init(){
	return ICGB_Block_Class::icgb_init();
}

// kick-off the plugin 
icgb_block_init();