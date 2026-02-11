import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

// const tempEvent = {
//   _id: new Date().getTime(),
//   title: 'Cumpleaños del jefe',
//   notes: 'Hay que comprar el pastel',
//   // start: new Date(2026, 1, 5, 9, 30), // 3 de febrero 2026, 09:30 hrs
//   // end: new Date(2026, 1, 5, 23, 0), // 3 de febrero 2026, 11:00 hrs
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: '#fafafa',
//   user: {
//     _id: '123',
//     name: 'Bernardo',
//   },
// };

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoadingEvents: true,
    events: [
      // tempEvent
    ],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, action) => {
      const { payload } = action;

      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }

        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id,
        );
        state.activeEvent = null;
      }
    },
    onClearActiveEvent: (state) => {
      state.activeEvent = null;
    },
    onLoadEvents: (state, { payload }) => {
      state.isLoadingEvents = false;
      // state.events = payload;
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

export const {
  onAddNewEvent,
  onClearActiveEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} = calendarSlice.actions;
