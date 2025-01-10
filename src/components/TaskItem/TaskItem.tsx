import React from "react";
import { SortableTask } from "../SortableTask/SortableTask";
import { HiArchiveBoxXMark } from "react-icons/hi2";

interface TaskItemProps {
  task: string;
  id: string;
  index: number;
  date: string | null;
  isHighlighted: boolean;
  onEdit: (newText: string) => void;
  onDelete: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  id,
  index,
  date,
  isHighlighted,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(task);

  const handleBlur = () => {
    if (editText.trim()) {
      onEdit(editText.trim());
    }
    setIsEditing(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleBlur();
          }}
          autoFocus
        />
      ) : (
        <SortableTask
          id={id}
          index={index}
          date={date}
          taskText={task}
          isHighlighted={isHighlighted}
          onDoubleClick={() => setIsEditing(true)}
        />
      )}
      <button onClick={onDelete} style={{ marginLeft: "10px" }}>
        <HiArchiveBoxXMark width={15}/>
      </button>
    </div>
  );
};
