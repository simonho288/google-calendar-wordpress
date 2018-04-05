'use strict';

var $ = undefined; // jQuery shorthand
var events = [];

jQuery(document).ready(function(jquery) {
  $ = jquery;
  initCalendar();
});

function initCalendar() {
  $('#calendar').fullCalendar({
    viewRender: onViewRender,
    defaultView: 'agendaWeek',
    dayClick: onDayClick,
    eventClick: onEventClick,
    events: events,
    editable: true
  });
}

function refreshCalendar(newEvent) {
  $('#calendar').fullCalendar('updateEvents', events);
  $('#calendar').fullCalendar('renderEvent', newEvent);
}

function onViewRender(view, elem) {
  // Get the date range will be displaying
  var timezone = -(new Date().getTimezoneOffset() / 60);
  var dateStart = view.intervalStart.format() + 'T00:00:00';
  var dateEnd = view.intervalEnd.format() + 'T00:00:00';
  console.log(dateStart + ' - ' + dateEnd);

  // Create a sample event
  events.push({
    title: 'event1',
    start: '2018-04-04T12:30:00',
    end: '2018-04-04T13:00:00'
  });
}

function onDayClick(date, jsEvent, view) {
  // When a time clicked, just create and add a sample event to the calendar.
  var title = 'Event' + (events.length + 1).toString();
  var newEvent = {
    title: title,
    start: date.format(),
    end: date.add(30, 'm').format()
  };
  events.push(newEvent);
  refreshCalendar(newEvent);
}

function onEventClick(event, element) {
  // When a event clicked, just remove it from calendar.
  $('#calendar').fullCalendar('removeEvents', event._id);
}
