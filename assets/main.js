'use strict';

var $ = undefined; // jQuery shorthand
var events = [];

jQuery(document).ready(function(jquery) {
  $ = jquery;
  initCalendar();
});

/**
 * Initialise the FullCalendar by adding the global events array.
 */
function initCalendar() {
  $('#calendar').fullCalendar({
    viewRender: onViewRender, // when week changed...
    defaultView: 'agendaWeek',
    dayClick: onDayClick, // when a time slot clicked...
    eventClick: onEventClick, // when an event clicked...
    events: events, // Event objects array to be displayed
    editable: true
  });
}

/**
 * Invoke admin-ajax.php via Ajax to get events from Google Calendar
 */
function ajaxGetEvents(dateStart, dateEnd) {
  var postData = {
    dateStart: dateStart,
    dateEnd: dateEnd,
    action: 'get_events'
  };
  return $.ajax({
    type: 'POST',
    dataType: 'json',
    url: php_data.ajaxUrl,
    data: postData
  });
}

/**
 * Invoke admin-ajax.php via Ajax to save an event to Google Calendar
 */
function ajaxPutAnEvent(event) {
  var postData = {
    event: event,
    action: 'put_event'
  };
  return $.ajax({
    type: 'POST',
    dataType: 'json',
    url: php_data.ajaxUrl,
    data: postData
  });
}

/**
 * Invoke admin-ajax.php via Ajax to remove an event from Google Calendar
 */
function ajaxDelEvent(eventId) {
  var postData = {
    event_id: eventId,
    action: 'del_event'
  };
  return $.ajax({
    type: 'POST',
    dataType: 'json',
    url: php_data.ajaxUrl,
    data: postData
  });
}

/**
 * Totally re-render the calendar.
 */
function refreshCalendar() {
  $('#calendar').fullCalendar('removeEvents');
  $('#calendar').fullCalendar('renderEvents', events);
}

/**
 * FullCalendar event handler when a week is going to display
 */
function onViewRender(view, elem) {
  // Reset the global events array. It will be re-generated in ajax return.
  events = [];

  // Get the date range will be displaying
  var dateStart = view.intervalStart.format('YYYY-MM-DD') + 'T00:00:00' + moment().format('Z');
  var dateEnd = view.intervalEnd.format('YYYY-MM-DD') + 'T00:00:00' + moment().format('Z');

  ajaxGetEvents(dateStart, dateEnd).done(function(response) {
    if (response.result) {
      // Convert the event objects from PHP to FullCalendar format.
      for (var i = 0; i < response.events.length; ++i) {
        var event = response.events[i];
        events.push({
          _id: event._id,
          title: event.title,
          start: event.start,
          end: event.end
        });
      }
      refreshCalendar();
    }
  });
}

/**
 * When a time slot clicked, just create and add a demo event to the calendar.
 */
function onDayClick(date, jsEvent, view) {
  var title = 'Demo event ' + (Math.floor(Math.random() * 999999) + 1).toString();
  var newEvent = {
    title: title,
    start: date.format() + moment().format('Z'),
    end: date.add(30, 'm').format() + moment().format('Z')
  };
  ajaxPutAnEvent(newEvent).done(function(response) {
    if (response.result) {
      // Update the frontend if server process successfully.
      newEvent._id = response.event_id;
      events.push(newEvent);
      console.log('"' + title + '" created.');
      refreshCalendar();
    }
  })
}

/**
 * When a event clicked, just remove it from global events array.
 */
function onEventClick(event, element) {
  ajaxDelEvent(event._id).done(function(response) {
    // Findout the event from global events array. Remove the event which the user clicked.
    if (response.result) {
      var i = events.length;
      while (i--) {
        if (events[i]._id == event._id) {
          events.splice(i, 1);
        }
      }
      refreshCalendar();
    }
  })
}
