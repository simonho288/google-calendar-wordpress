<?php /* Template Name: FullCalendar */?>

<?php
require_once 'vendor/autoload.php'; // install the composer libraries

$gapi = new Google_Client();
$gapi->setAuthConfig(__DIR__ . '/service-account.json');
$gapi->setApplicationName('Google Calendar Wordpress Theme');
$gapi->addScope(Google_Service_Calendar::CALENDAR);
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <title><?php wp_title(); ?></title>
    <meta http-equiv="pragma" content="no-cache" />
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
    <?php if ( is_singular() && get_option( 'thread_comments' ) ) wp_enqueue_script( 'comment-reply' ); ?>
    <?php wp_head(); ?>
  </head>
  <body>
    <h1>Google Calendar WordPress Theme Demo</h1>
    <div id="calendar"></div>
    <?php wp_footer(); ?>
  </body>
 </html>
