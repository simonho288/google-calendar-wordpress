<?php

function enqueue_style_func() {
	wp_enqueue_style('fullcalendar-style', get_template_directory_uri() . '/assets/fullcalendar.min.css', false);
	wp_enqueue_style('main-style', get_template_directory_uri() . '/assets/main.css', false);
}
add_action('wp_enqueue_scripts', 'enqueue_style_func');

function enqueue_script_func() {
	wp_enqueue_script('moment-js', get_template_directory_uri() . '/assets/moment.min.js', array('jquery'), '1.0', true);
	wp_enqueue_script('fullcalendar-js', get_template_directory_uri() . '/assets/fullcalendar.min.js', array('moment-js'), '1.0', true);
	wp_enqueue_script('main-js', get_template_directory_uri() . '/assets/main.js', array('fullcalendar-js'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'enqueue_script_func');
