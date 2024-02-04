<?php
/**
 * Insights Notice File
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'dci_popup_notice' ) ) {
	function dci_popup_notice() {
		?>
		<div class="dci-notice">
			<div class="dci-notice-wrapper">
				<div class="dci-header">
					<h2 class="dci-title">
						<?php esc_html_e( 'Never miss an important update.', 'image-comparision-block' ); ?>
					</h2>
					<p class="dci-desc">
						<?php esc_html_e( 'Get notified when there are new updates available for your plugins and themes. In the current version of this message it is clear that you are being sent a confirmation email to confirm your opt-in.', 'image-comparision-block' ); ?>
					</p>
				</div>
				<div class="dci-actions">
					<form method="get">
						<input type="hidden" name="page" value="<?php //echo esc_attr( $_GET['page'] ); ?>">
						<button id="dci_allow_yes" name="dci_allow_status" value="yes" type="button"
							class="dci-button-allow button button-primary">
							<?php esc_html_e( 'Allow & Continue', 'image-comparision-block' ); ?>
						</button>
						<button id="dci_allow_skip" name="dci_allow_status" value="skip" type="button"
							class="dci-button-skip button button-secondary">
							<?php esc_html_e( 'Skip', 'image-comparision-block' ); ?>
						</button>
					</form>
				</div>
				<div class="dci-permission">
					<p>
						<?php esc_html_e( 'Which permission are being granted?', 'image-comparision-block' ); ?>
					</p>
				</div>
				<div class="dci-data-list">
					<ul>
						<li>
							<div class="dci-permission-item">
								<div class="dci-icon">
									<span class="dashicons dashicons-admin-users"></span>
								</div>
								<div class="dci-desc">
									<h3>
										<?php esc_html_e( 'View Basic Profile Info.', 'image-comparision-block' ); ?>
									</h3>
									<p>
										<?php esc_html_e( 'Your WordPress user\'s first & last name, and email address.', 'image-comparision-block' ); ?>
									</p>
								</div>
							</div>
						</li>
						<li>
							<div class="dci-permission-item">
								<div class="dci-icon">
									<span class="dashicons dashicons-admin-links"></span>
								</div>
								<div class="dci-desc">
									<h3>
										<?php esc_html_e( 'View Basic Website Info.', 'image-comparision-block' ); ?>
									</h3>
									<p>
										<?php esc_html_e( 'Homepage URL & title, WP & PHP versions, and site language.', 'image-comparision-block' ); ?>
									</p>
								</div>
							</div>
						</li>
						<li>
							<div class="dci-permission-item">
								<div class="dci-icon">
									<span class="dashicons dashicons-admin-plugins"></span>
								</div>
								<div class="dci-desc">
									<h3>
										<?php esc_html_e( 'View Basic Plugin Info.', 'image-comparision-block' ); ?>
									</h3>
									<p>
										<?php esc_html_e( 'Current Plugin & SDK versions, and if active or uninstalled.', 'image-comparision-block' ); ?>
									</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<?php
	}

	add_action( 'in_admin_header', 'dci_popup_notice', 99999 );
}
