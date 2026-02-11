import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
  CalendarEvent,
  Navbar,
  CalendarModal,
  FabAddNew,
  FabDelete,
} from '../';
import { useEffect, useState } from 'react';
import { localizer } from '@/helpers/calendarLocalizer.js';
import { getMessagesES } from '@/helpers/getMessages.js';
import { useUiStore, useCalendarStore, useAuthStore } from '@/hooks';

const validViews = ['month', 'week', 'day', 'agenda'];

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents, clearActiveEvent } =
    useCalendarStore();

  const initialView = validViews.includes(localStorage.getItem('lastView'))
    ? localStorage.getItem('lastView')
    : 'month';

  const [lastView, setLastView] = useState(initialView);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const eventStyleGetter = (event, start, end, isSelected) => {
    isSelected = event.id === selectedEventId;

    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    // console.log({ onDoubleClick: event });
    openDateModal();
  };

  const onSelect = (event) => {
    //console.log({ onSelect: event });
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    // console.log({ onViewChanged: event });
    setLastView(event);
    localStorage.setItem('lastView', event);
  };

  const onSelectSlot = (event) => {
    clearActiveEvent();
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />
      <Calendar
        culture="es" // <--- Define el idioma del calendario
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        style={{ height: 'calc(100vh - 80px)' }}
        // style={{ height: 'calc( 100vh - 80px )' }} // Un tip: usa vh para que ocupe la pantalla
        messages={getMessagesES()} // <--- Aplica las traducciones
        view={lastView}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
        onSelectSlot={onSelectSlot}
        selectable={true}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
