import { useCalendarStore, useUiStore } from '@/hooks';
import { addHours } from 'date-fns';

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const { isDateModalOpen } = useUiStore();

  const handleDelete = () => {
    startDeletingEvent();
  };

  console.log({
    hasEventSelected: hasEventSelected,
    isDateModalOpen: isDateModalOpen,
  });

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      style={{
        display: hasEventSelected && !isDateModalOpen ? '' : 'none',
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
