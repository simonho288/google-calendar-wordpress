<?php

require_once 'vendor/autoload.php'; // install the composer libraries

define('CALENDAR_ID', '4u857il583mtrqednn7c7u8h1g@group.calendar.google.com');

function initGoogleCalendarApi() {
  $gapi = new Google_Client();
  $gapi->setAuthConfig(__DIR__ . '/service-account.json');
  $gapi->setApplicationName('Google Calendar Wordpress Theme');
  $gapi->addScope(Google_Service_Calendar::CALENDAR);
  $gcal = new Google_Service_Calendar($gapi);
  return $gcal;
}

function construct_js_data() {
  	// Pass the data to Javascript frontend code. Object properties are accessed as ajax_object.ajax_url
	wp_localize_script('main-js', 'php_data', array(
    'ajaxUrl' => admin_url('admin-ajax.php') // The URL of this PHP module
  ));
}
add_action('wp_enqueue_scripts', 'construct_js_data');

function get_events() {
  $dateStart = $_POST['dateStart'];
  $dateEnd = $_POST['dateEnd'];

  $gcal = initGoogleCalendarApi();

  // Query the Google Calendar. API doc:
  // https://developers.google.com/calendar/v3/reference/events/get
  $opts = array(
    'maxResults' => 2500, // max results allowed by Google Calendar
    // 'orderBy' => 'startTime',
    'singleEvents' => TRUE,
    'timeMin' => $dateStart,
    'timeMax' => $dateEnd
  );
  $events = $gcal->events->listEvents(CALENDAR_ID, $opts);

  $return = array( // The Ajax return value
    'result' => TRUE,
    'events' => array()
  );

  // Handling the pagination from the Google Calendar results
  while (true) {
    foreach ($events->getItems() as $event) {
      array_push($return['events'], array(
        '_id' => $event->getId(),
        'title' => $event->getSummary(),
        'start' => $event->getStart()->getDatetime(),
        'end' => $event->getEnd()->getDatetime()
      ));
    }

    // Handling pagination
    $pageToken = $events->getNextPageToken();
    if ($pageToken) {
      $opts = array('pageToken' => $pageToken);
      $events = $gcal->events->listEvents(CALENDAR_ID, $opts);
    } else {
      break;
    }
  }

  echo json_encode($return); // Return the result to frontend
  wp_die();
}
add_action('wp_ajax_get_events', 'get_events'); // Support within Wordpress admin, and
add_action('wp_ajax_nopriv_get_events', 'get_events'); // support without Wordpress admin

function put_event() {
  $jsEvent = $_POST['event']; // Event object from frontend
  $event = new Google_Service_Calendar_Event(array(
    'summary' => $jsEvent['title'],
    'description' => 'Created by Google Calendar Wordpress theme demo',
    'start' => array(
      'dateTime' => $jsEvent['start']
    ),
    'end' => array(
      'dateTime' => $jsEvent['end']
    )
  ));

  $gcal = initGoogleCalendarApi();

  // Save the event to Google Calendar. The doc:
  // https://developers.google.com/calendar/v3/reference/events/insert
  $result = $gcal->events->insert(CALENDAR_ID, $event);

  $return = array(
    'result' => TRUE,
    'event_id' => $result['id']
  );
  echo json_encode($return); // Return the result to frontend
  wp_die();
}
add_action('wp_ajax_put_event', 'put_event'); // Support within Wordpress admin, and
add_action('wp_ajax_nopriv_put_event', 'put_event'); // support without Wordpress admin

function del_event() {
  $event_id = $_POST['event_id']; // Event object from frontend

  $gcal = initGoogleCalendarApi();

  // Google Calendar delete event doc:
  // https://developers.google.com/calendar/v3/reference/events/delete
  $result = $gcal->events->delete(CALENDAR_ID, $event_id);

  $return = array(
    'result' => TRUE
  );
  echo json_encode($return); // Return the result to frontend
  wp_die();
}
add_action('wp_ajax_del_event', 'del_event'); // Support within Wordpress admin, and
add_action('wp_ajax_nopriv_del_event', 'del_event'); // support without Wordpress admin
