<?php

function enqueue_style_func() {
	wp_enqueue_style('main-style', get_template_directory_uri() . '/assets/main.css', false);
}
add_action('wp_enqueue_scripts', 'enqueue_style_func');

function enqueue_script_func() {
	wp_enqueue_script('main-js', get_template_directory_uri() . '/assets/main.js', array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'enqueue_script_func');
