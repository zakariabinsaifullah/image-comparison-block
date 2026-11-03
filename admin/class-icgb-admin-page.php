<?php
/**
 * Admin "Getting started" page.
 *
 * @package ImageCompareBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Admin page for the Image Compare Block plugin.
 */
class ICGB_Admin_Page {

	const SLUG = 'icgb-image-compare';

	/**
	 * Hook into the admin.
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'register_page' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
	}

	/**
	 * Enqueue the page stylesheet.
	 *
	 * @param string $hook_suffix Current admin page.
	 */
	public function enqueue_assets( $hook_suffix ) {
		if ( 'tools_page_' . self::SLUG === $hook_suffix ) {
			wp_enqueue_style( 'icgb-admin', ICGB_URL . 'admin/assets/css/admin.css', array(), ICGB_VERSION );
		}
	}

	/**
	 * Register the page under Tools.
	 */
	public function register_page() {
		add_submenu_page(
			'tools.php',
			__( 'Image Compare', 'image-compare-block' ),
			__( 'Image Compare', 'image-compare-block' ),
			'manage_options',
			self::SLUG,
			array( $this, 'render_page' )
		);
	}

	/**
	 * Output a button link.
	 *
	 * @param string $url    Link URL.
	 * @param string $label  Link text.
	 * @param string $color  Background color.
	 * @param bool   $is_new Open in a new tab.
	 */
	private function button( $url, $label, $color, $is_new = true ) {
		if ( $is_new ) {
			printf(
				'<a href="%1$s" style="background:%2$s" target="_blank" rel="noopener noreferrer">%3$s</a>',
				esc_url( $url ),
				esc_attr( $color ),
				esc_html( $label )
			);
			return;
		}

		printf(
			'<a href="%1$s" style="background:%2$s">%3$s</a>',
			esc_url( $url ),
			esc_attr( $color ),
			esc_html( $label )
		);
	}

	/**
	 * Render the page.
	 */
	public function render_page() {
		?>
		<div class="icgb-admin">
			<div class="icgb-admin__head">
				<div class="icgb-admin__head-inner">
					<h1 class="icgb-admin__title"><?php esc_html_e( 'Image Compare Block', 'image-compare-block' ); ?></h1>
					<p class="icgb-admin__subtitle"><?php esc_html_e( 'A block to showcase before and after image comparisons.', 'image-compare-block' ); ?></p>
					<div class="icgb-admin__buttons">
						<?php
						$this->button( admin_url( 'post-new.php?post_type=page' ), __( 'Create a page', 'image-compare-block' ), '#7952B3', false );
						$this->button( 'https://wordpress.org/support/plugin/image-compare-block/reviews/#new-post', __( 'Rate plugin', 'image-compare-block' ), '#0174A2' );
						?>
					</div>
				</div>
			</div>
			<div class="icgb-admin__body">
				<div class="icgb-admin__main">
					<h2><?php esc_html_e( 'Getting started', 'image-compare-block' ); ?></h2>
					<ol>
						<li><?php esc_html_e( 'Open any post or page in the block editor.', 'image-compare-block' ); ?></li>
						<li><?php esc_html_e( 'Insert the "Image Compare" block from the Media category, or type /image compare.', 'image-compare-block' ); ?></li>
						<li><?php esc_html_e( 'Choose a before image and an after image.', 'image-compare-block' ); ?></li>
						<li><?php esc_html_e( 'Use the block settings to switch to vertical mode, follow the mouse on hover, set the starting position, add labels and change the handle color.', 'image-compare-block' ); ?></li>
					</ol>
					<p><?php esc_html_e( 'Visitors can drag or click the image, swipe on touch devices, or focus the handle and use the arrow keys.', 'image-compare-block' ); ?></p>
					<p>
						<a href="https://www.youtube.com/watch?v=OylHrkczwK4" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Watch the video tutorial', 'image-compare-block' ); ?></a>
					</p>
				</div>
				<div class="icgb-admin__sidebar">
					<div class="icgb-admin__card">
						<h2><?php esc_html_e( 'Get support', 'image-compare-block' ); ?></h2>
						<div class="icgb-admin__buttons">
							<?php
							$this->button( 'https://wordpress.org/support/plugin/image-compare-block/', __( 'Support forum', 'image-compare-block' ), '#002B42' );
							$this->button( 'https://makegutenblock.com/contact/', __( 'Contact', 'image-compare-block' ), '#EA4335' );
							?>
						</div>
					</div>
					<div class="icgb-admin__card">
						<h2><?php esc_html_e( 'Freelance work', 'image-compare-block' ); ?></h2>
						<div class="icgb-admin__buttons">
							<?php
							$this->button( 'https://www.fiverr.com/users/devs_zak/', __( 'Fiverr', 'image-compare-block' ), '#1DBF73' );
							$this->button( 'https://www.upwork.com/freelancers/~010af183b3205dc627', __( 'Upwork', 'image-compare-block' ), '#14A800' );
							?>
						</div>
					</div>
					<div class="icgb-admin__card">
						<div class="icgb-admin__buttons">
							<?php $this->button( 'https://makegutenblock.com/', __( 'See more blocks', 'image-compare-block' ), '#150050' ); ?>
						</div>
					</div>
				</div>
			</div>
		</div>
		<?php
	}
}

new ICGB_Admin_Page();
