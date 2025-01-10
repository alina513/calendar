import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
    marginBottom: "5px",
    padding: "10px",
    background: isHighlighted ? "#ffffa5" : "#e3e3e3",
    borderRadius: "4px",
    cursor: "grab",
    boxShadow: transform ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none", 
    zIndex: transform ? 1000 : "auto", 
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.detail > 1) {
      e.preventDefault();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onDoubleClick={onDoubleClick}
      onPointerDown={handlePointerDown}
      {...attributes}
      {...listeners}
    >
      {taskText}
    </div>
  );
};
