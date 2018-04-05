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
    viewRender: onViewRender,
    // eventAfterAllRender: onViewRender,
    defaultView: 'agendaWeek',
    dayClick: onDayClick,
    eventClick: onEventClick,
    events: events,
    editable: true
  });
}

/**
 * Invoke admin-ajax.php via Ajax
 */
function ajaxGetEvents() {
  var postData = {
    arg1: 'hello',
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
  // Get the date range will be displaying
  var timezone = -(new Date().getTimezoneOffset() / 60);
  var dateStart = view.intervalStart.format() + 'T00:00:00';
  var dateEnd = view.intervalEnd.format() + 'T00:00:00';
  console.log(dateStart + ' - ' + dateEnd);
  events = []; // Reset the global events array. It will be re-generated after ajax call.

  ajaxGetEvents().done(function(response) {
    debugger;
    // Create a sample event
    events.push({
      _id: Math.floor(Math.random() * 10000000).toString(),
      title: 'event1',
      start: '2018-04-05T12:30:00',
      end: '2018-04-05T13:00:00'
    });
    refreshCalendar();
  });
}

/**
 * When a time slot clicked, just create and add a demo event to the calendar.
 */
function onDayClick(date, jsEvent, view) {
  var title = 'Demo event ' + (Math.floor(Math.random() * 999999) + 1).toString();
  var newEvent = {
    _id: Math.floor(Math.random() * 10000000).toString(),
    title: title,
    start: date.format(),
    end: date.add(30, 'm').format()
  };
  events.push(newEvent);
  console.log('"' + title + '" created.');
  refreshCalendar();
}

/**
 * When a event clicked, just remove it from global events array.
 */
function onEventClick(event, element) {
  // Findout the event from global events. Remove the event which the user clicked.
  var i = events.length;
  while (i--) {
    if (events[i]._id == event._id) {
      events.splice(i, 1);
    }
  }
  refreshCalendar();
}
