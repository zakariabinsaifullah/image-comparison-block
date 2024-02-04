<?php
/**
 * Admin Support Page
*/

class ICGB_Admin_Page {
    /**
     * Contructor 
    */
    public function __construct(){
        add_action( 'admin_menu', [ $this, 'icgb_plugin_admin_page' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'icgb_admin_page_assets' ] );

        // include admin data SDk 
        add_action( 'plugins_loaded', [ $this, 'dci_icgb_plugin' ] );
    }

    // Admin Assets
    public function icgb_admin_page_assets($screen) {
        if( 'tools_page_icgb-image-compare' == $screen ) {
            $depencyFile = require_once( trailingslashit( ICGB_PATH ) . 'build/admin/admin.asset.php' );

            if( is_array( $depencyFile ) && !empty( $depencyFile ) ) {
                wp_enqueue_style( 'admin-css', trailingslashit( ICGB_URL ) . '/build/admin/style-admin.css', [], ICGB_VERSION, 'all' );
                wp_enqueue_script( 'admin-js', trailingslashit( ICGB_URL ) . '/build/admin/admin.js', $depencyFile['dependencies'], ICGB_VERSION, true );
            }
        }
    }

    // Include Admin SDK
    public function dci_icgb_plugin(){
        // Include DCI SDK.
        require_once dirname( __FILE__ ) . '/dci/start.php';

        dci_dynamic_init( array(
            'sdk_version'  => '1.0.0',
            'plugin_title' => 'Beaf Lite',
            'product_id'   => 7,
            'api_endpoint' => 'https://dashboard.gutenbergkits.com/wp-json/dci/v1/data-insights',
            'slug'         => 'image-compare-block',
            'public_key'   => 'pk_x0SQwuIPjqUHvg8y8456XaUf5xyspnBa',
            'is_premium'   => false,
            'menu'         => array(
                'slug' => 'icgb-image-compare',
            ),
        ) );
    } 

    // Admin Page
    public function icgb_plugin_admin_page(){
        add_submenu_page( 'tools.php', 'Image Comparison', 'Image Comparison', 'manage_options', 'icgb-image-compare', [ $this, 'icgb_admin_page_content_callback' ] );
    }
    public function icgb_admin_page_content_callback(){
        ?>
            <div id="photo-comparison-admin"></div>
        <?php 
    }
}
 new ICGB_Admin_Page();