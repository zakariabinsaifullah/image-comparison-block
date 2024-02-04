<?php
/**
 * Insights SDK File
 * SDK Version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


if ( ! class_exists( 'Insights_SDK' ) ) {

	/**
	 * Insights SDK Class
	 */
	class Insights_SDK {

		public $version = '1.0.0';

		public $dci_name;
		public $dci_allow_name;
		public $dci_date_name;
		public $dci_count_name;
		public $nonce;
		public $params;

		/**
		 * Insights SDK Version
		 * param array $params
		 * @return void
		 */
		public function __construct( $params ) {
			$this->params = $params;

			add_action( 'admin_enqueue_scripts', array( $this, 'dci_enqueue_scripts' ) );
			add_action( 'wp_ajax_dci_sdk_insights', array( $this, 'dci_sdk_insights' ) );
			add_action( 'wp_ajax_dci_sdk_dismiss_notice', array( $this, 'dci_sdk_dismiss_notice' ) );

			$security_key         = md5( $params['public_key'] . $params['menu_slug'] );
			$this->dci_name       = str_replace( '-', '_', sanitize_title( $params['plugin_title'] ) . $security_key );
			$this->dci_allow_name = 'dci_allow_status_' . $security_key;
			$this->dci_date_name  = 'dci_status_date_' . $security_key;
			$dci_count_name       = 'dci_attempt_count_' . $security_key;
			$dci_status_db        = get_option( $this->dci_allow_name, false );

			// if ( $params['current_page'] !== $params['menu_slug'] ) {
			// 	return;
			// }

			$this->nonce = wp_create_nonce( $this->dci_allow_name );

			/**
			 * Modal Trigger if not init
			 * Show Notice Modal
			 */
			if ( ! $dci_status_db ) {
				// echo '111111111111';
				$this->notice_modal( $params );
				return;
			}

			/**
			 * Skip & Date Not Expired
			 * Show Notice Modal
			 */
			if ( 'skip' == $dci_status_db && true == $this->check_date() ) {
				// echo '222222222222';
				$this->notice_modal( $params );
				return;
			}

			// echo 'yyyyyyyyyyyyyyy-';

			// var_dump( $this->check_date() );

			/**
			 * Allowed & Date not Expired
			 * No need send data to server
			 * Else Send Data to Server
			 */
			if ( ! $this->check_date() ) {
				return;
			}
			// echo 'zzzzzzzzzzzzzzz-';

			/**
			 * Count attempt every time
			 */
			$dci_attempt = get_option( $dci_count_name, 0 );

			if ( ! $dci_attempt ) {
				update_option( $dci_count_name, 1 );
			}
			update_option( $dci_count_name, $dci_attempt + 1 );

			/**
			 * Next schedule date for attempt
			 */
			update_option( $this->dci_date_name, gmdate( 'Y-m-d', strtotime( "+1 month" ) ) );

			/**
			 * Prepare data
			 */
			$this->data_prepare( $params );

		}

		/**
		 * Notice Modal
		 *
		 * @return void
		 */
		public function notice_modal( $params ) {
			if ( $params['current_page'] !== $params['menu_slug'] ) {
				if ( ! get_transient( 'dismissed_notice_' . $this->dci_name ) ) {
					add_action( 'admin_notices', array( $this, 'display_global_notice' ) );
				}
				return;
			}
			require_once dirname( __FILE__ ) . '/notice.php';
		}

		/**
		 * If date is expired immidiate action
		 *
		 * @return boolean
		 */
		public function check_date() {
			$current_date    = strtotime( gmdate( 'Y-m-d' ) );
			$dci_status_date = strtotime( get_option( $this->dci_date_name, false ) );

			if ( ! $dci_status_date ) {
				return true;
			}

			if ( $dci_status_date && $current_date >= $dci_status_date ) {
				return true;
			}
			return false;
		}

		/**
		 * Modal Trigger
		 *
		 * @return boolean
		 */
		public function modal_trigger() {

			if ( ! wp_verify_nonce( $this->dci_allow_name, $this->nonce ) ) {
				echo 'Nonce Verification Failed';
				return false;
			}

			$sanitized_status = sanitize_text_field( $_GET['dci_allow_status'] );

			if ( $sanitized_status == 'skip' ) {
				update_option( $this->dci_allow_name, 'skip' );
				/**
				 * Next schedule date for attempt
				 */
				update_option( $this->dci_date_name, gmdate( 'Y-m-d', strtotime( "+1 month" ) ) );
				return false;
			} elseif ( $sanitized_status == 'yes' ) {
				update_option( $this->dci_allow_name, 'yes' );
				return true;
			}

			return false;

		}

		/**
		 * Reset Options Settings
		 * @return void
		 */
		public function reset_settings() {
			delete_option( $this->dci_allow_name );
			delete_option( $this->dci_date_name );
		}

		/**
		 * Data prepare for send server
		 *
		 * @param array $server_url
		 * @return void
		 */
		public function data_prepare( $params ) {
			$server_url  = isset( $params['api_endpoint'] ) ? $params['api_endpoint'] : false;
			$public_key  = isset( $params['public_key'] ) ? $params['public_key'] : false;
			$custom_data = isset( $params['custom_data'] ) ? $params['custom_data'] : false;
			$product_id  = isset( $params['product_id'] ) ? $params['product_id'] : false;

			if ( ! $server_url || ! $public_key ) {
				return;
			}

			$data                = array();
			$data['public_key']  = $public_key;
			$data['product_id']  = $product_id;
			$data['custom_data'] = $custom_data;

			$non_sensitive_data = $this->dci_non_sensitve_data();
			$data               = array_merge( $data, $non_sensitive_data );

			$this->dci_send_data_to_server( $server_url, $data );
		}

		/**
		 * Non sensitive data
		 *
		 * @return array
		 */
		public function dci_non_sensitve_data() {
			$current_user = wp_get_current_user();

			$first_name = $current_user->first_name;
			$last_name  = $current_user->last_name;

			if ( empty( $first_name ) && empty( $last_name ) ) {
				$first_name = null;
				$last_name  = $current_user->display_name;
			}

			$data = array(
				'first_name'   => $first_name,
				'last_name'    => $last_name,
				'email'        => $current_user->user_email,
				'user_role'    => $current_user->roles[0],
				'website_url'  => $current_user->user_url,
				'website_data' => array(
					'website_name' => get_bloginfo( 'name' ),
					'wp_version'   => get_bloginfo( 'version' ),
					'php_version'  => phpversion(),
					'locale'       => get_locale(),
					'sdk_version'  => $this->version,
				),
			);

			return $data;
		}

		/**
		 * Send data to server
		 *
		 * @param [string] $server_url
		 * @param [array] $data
		 * @return void
		 */
		public function dci_send_data_to_server( $server_url, $data = null ) {

			$args = array(
				'method'  => 'POST',
				'timeout' => 60,
				'headers' => array(
					'Content-Type' => 'application/json',
					'X-API-KEY'    => $data['public_key'],
				),
				'body'    => json_encode( $data ),
			);

			$response = wp_remote_request( $server_url, $args );

			if ( is_wp_error( $response ) ) {
				// echo 'Error: ' . $response->get_error_message();
				$this->reset_settings();
			} else {
				$response_data = wp_remote_retrieve_body( $response );
				$response_data = json_decode( $response_data, true );
				// print_r( $response_data );
				if ( isset( $response_data['data']['status'] ) && 401 == $response_data['data']['status'] ) {
					update_option( $this->dci_date_name, gmdate( 'Y-m-d', strtotime( "+3 days" ) ) );
				}
			}
		}

		/**
		 * Ajax callback
		 */
		public function dci_sdk_insights() {
			$sanitized_status = isset( $_POST['button_val'] ) ? sanitize_text_field( $_POST['button_val'] ) : '';
			$nonce            = isset( $_POST['nonce'] ) ? sanitize_text_field( $_POST['nonce'] ) : '';

			if ( ! wp_verify_nonce( $nonce, 'dci_sdk' ) ) {
				wp_send_json( array(
					'status'  => 'error',
					'title'   => 'Error',
					'message' => 'Nonce verification failed',
				) );
				wp_die();
			}

			if ( $sanitized_status == 'skip' ) {
				update_option( $this->dci_allow_name, 'skip' );
				/**
				 * Next schedule date for attempt
				 */
				update_option( $this->dci_date_name, gmdate( 'Y-m-d', strtotime( "+1 month" ) ) );
			} elseif ( $sanitized_status == 'yes' ) {
				update_option( $this->dci_allow_name, 'yes' );
			}

			wp_send_json( array(
				'status'  => 'success',
				'title'   => 'Success',
				'message' => 'Success.',
			) );
			wp_die();
		}

		/**
		 * Enqueue scripts and styles.
		 *
		 * @since 1.0.0
		 */
		public function dci_enqueue_scripts() {
			wp_enqueue_style( 'dci-sdk', plugins_url( 'assets/css/dci.css', __FILE__ ), array(), '1.0.0' );
			wp_enqueue_script( 'dci-sdk', plugins_url( 'assets/js/dci.js', __FILE__ ), array( 'jquery' ), '1.0.0', true );
			wp_localize_script( 'dci-sdk', 'DCI_SDK',
				array(
					'ajax_url' => admin_url( 'admin-ajax.php' ),
					'nonce'    => wp_create_nonce( 'dci_sdk' )
				)
			);
		}

		/**
		 * Display Global Notice
		 *
		 * @return void
		 */
		public function display_global_notice() {
			$admin_url = add_query_arg( array(
				'page' => 'dci-app',
			), admin_url( 'admin.php' ) );

			?>
			<div class="dci-global-notice notice notice-success is-dismissible">
				<h3>
					<?php echo esc_html( $this->params['plugin_title'] ); ?>
				</h3>
				<Your>This is a notice about non-sensitive data collection and product updates. We kindly request your consent to collect
					and use non-sensitive data for the purpose of keeping your product up to date. </p>
					<p>If you have any concerns or questions about our data collection
					practices, please <a target="_blank" rel="nofollow noreferrer" href="https://gutenbergkits.com/contact">contact us</a>. What we <a target="_blank" rel="nofollow noreferrer" href="https://gutenbergkits.com/privacy-policy">collect</a>
				</p>
				<p>
				<a href="https://beaf.gutenbergkits.com" target="_blank" rel="nofollow noreferrer" 
						style="display: inline-block; padding: 6px 20px; background: #23670e;
    color: #fff; text-decoration: none; border-radius: 3px;">
						Get Beaf Pro
					</a>
					<button name="dci_allow_status" value="yes" class="button button-primary dci-button-allow">Allow</button>
					<button name="dci_allow_status" value="skip" class="button dci-button-skip button-secondary">Skip</button>
				</p>
			</div>
			<?php
		}

		/**
		 * Dismiss Notice
		 *
		 * @return void
		 */
		public function dci_sdk_dismiss_notice() {
			$nonce = isset( $_POST['nonce'] ) ? sanitize_text_field( $_POST['nonce'] ) : '';

			if ( ! wp_verify_nonce( $nonce, 'dci_sdk' ) ) {
				wp_send_json( array(
					'status'  => 'error',
					'title'   => 'Error',
					'message' => 'Nonce verification failed',
				) );
				wp_die();
			}

			set_transient( 'dismissed_notice_' . $this->dci_name, true, 30 * DAY_IN_SECONDS );

			wp_send_json( array(
				'status'  => 'success',
				'title'   => 'Success',
				'message' => 'Success.',
			) );
			wp_die();
		}
	}
}

/**
 * Main Insights Function
 */
if ( ! function_exists( 'dci_sdk_insights' ) ) {
	function dci_sdk_insights( $params ) {
		if ( class_exists( 'Insights_SDK' ) ) {
			$Insights_SDK = new Insights_SDK( $params );
		}
	}
}
