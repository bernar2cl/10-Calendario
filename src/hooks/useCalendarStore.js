import { calendarApi } from '@/api';
import { convertEventsToDateEvents } from '@/helpers';
import {
  onAddNewEvent,
  onClearActiveEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    const eventToSave = {
      ...calendarEvent,
      user: user.uid,
    };

    try {
      if (calendarEvent.id) {
        //Actualizando
        //console.log({ actulaizar: calendarEvent });
        await calendarApi.put(`/events/${calendarEvent.id}`, eventToSave);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      // Creando
      const { data } = await calendarApi.post('/events', eventToSave);
      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          id: data.evento.id,
          user, // usuario que se encuentra conectado
        }),
      );
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error al guardar',
        html: error.response.data?.msg || '--',
        icon: 'error',
      });
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error al eliminar',
        html: error.response.data?.msg || '--',
        icon: 'error',
      });
    }
  };

  const clearActiveEvent = () => {
    dispatch(onClearActiveEvent());
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error);
    }
  };

  return {
    //* Propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent && !!activeEvent.id,

    //* Métodos
    clearActiveEvent,
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
