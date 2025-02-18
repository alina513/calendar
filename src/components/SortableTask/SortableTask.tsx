import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "./SortableTask.styled";

export const SortableTask: React.FC<{
  id: string;
  index: number;
  date: string | null;
  isHighlighted?: boolean;
  taskText: string;
  onDoubleClick?: () => void;
}> = ({ id, index, date, onDoubleClick, isHighlighted = false, taskText }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: {
        index,
        droppableId: date,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: isHighlighted ? "#ff9f80" : "#f7f3df",
    boxShadow: transform ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
    zIndex: transform ? 1000 : "auto",
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.detail > 1) {
      e.preventDefault();
    }
  };

  return (
    <Task
      ref={setNodeRef}
      style={style}
      onDoubleClick={onDoubleClick}
      onPointerDown={handlePointerDown}
      {...attributes}
      {...listeners}
    >
      {taskText}
    </Task>
  );
};
