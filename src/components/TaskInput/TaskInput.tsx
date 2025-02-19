import React from "react";
import { AddTask } from "./TaskInput.styled";

interface TaskInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}


export const TaskInput: React.FC<TaskInputProps> = ({
  value,
  onChange,
  onAdd,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onAdd();
      inputRef.current?.focus();
    }
  };

  return (
    <AddTask
      ref={inputRef}
      type="text"
      value={value}
      placeholder="Add task and push Enter"
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};
