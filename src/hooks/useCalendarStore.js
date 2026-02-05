import {
  onAddNewEvent,
  onClearActiveEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from '@/store';
import { useSelector, useDispatch } from 'react-redux';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO: llegar al back

    // Todo bien
    if (calendarEvent._id) {
      //Actualizando
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // Creando
      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          _id: new Date().getTime(),
        }),
      );
    }
  };

  const startDeletingEvent = () => {
    // Todo: Llegar al backend
    dispatch(onDeleteEvent());
  };

  const clearActiveEvent = () => {
    dispatch(onClearActiveEvent());
  };

  return {
    //* Propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent && !!activeEvent._id,

    //* Métodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    clearActiveEvent,
  };
};
