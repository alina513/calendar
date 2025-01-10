import React from "react";

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
    <input
      ref={inputRef}
      type="text"
      value={value}
      placeholder="Додати завдання"
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};
