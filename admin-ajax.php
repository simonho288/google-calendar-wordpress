<?php

function construct_js_data() {
  	// Pass the data to Javascript frontend code. Object properties are accessed as ajax_object.ajax_url
	wp_localize_script('main-js', 'php_data', array(
    'ajaxUrl' => admin_url('admin-ajax.php') // The URL of this PHP module
  ));
}
add_action('wp_enqueue_scripts', 'construct_js_data');

function get_events() {
  $arg1 = $_POST['arg1'];
  $result = array(
    'result' => TRUE
  );
  echo json_encode($result); // Return the result to frontend
  wp_die();
}
add_action('wp_ajax_get_events', 'get_events'); // Support within Wordpress admin, and
add_action('wp_ajax_nopriv_get_events', 'get_events'); // support without Wordpress admin
