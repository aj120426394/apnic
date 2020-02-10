<?php
/**
 * @wordpress-plugin
 * Plugin Name: React n Wordpress
 */


defined('ABSPATH') or die('Direct script access disallowed');
define( 'RNW_INCLUDES', plugin_dir_path( __FILE__ ) . '/includes' );
define( 'RNW_ASSET_MANIFEST_PATH', plugin_dir_path( __FILE__ ) . '/asset-manifest' );
//define( 'RNW_ASSET_MANIFEST', RNW_ASSET_MANIFEST_PATH . '/asset-manifest.json' );

require_once( RNW_INCLUDES . '/shortcode.php' );
//require_once (RNW_INCLUDES . '/enqueue.php');

