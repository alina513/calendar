import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Wrapper, Holiday, DayNumber } from "./DayCell.styled";
import { TaskItem } from "../TaskItem/TaskItem";
import { TaskInput } from "../TaskInput/TaskInput";
import { nanoid } from "nanoid";

interface Task {
  id: string;
  task: string;
}
interface DayCellProps {
  date: string | null;
  dayNumber: number | null;
  holiday: string;
  tasks: Task[];
  filterText: string;
  setTasks: (tasks: Task[]) => void;
}

export const DayCell: React.FC<DayCellProps> = ({
  date,
  dayNumber,
  holiday,
  tasks,
  filterText,
  setTasks,
}) => {
  const [newTask, setNewTask] = React.useState<string>("");
  const { setNodeRef } = useDroppable({ id: date || "" });

  const addTask = () => {
    if (newTask.trim() && date) {
      const newTaskWithId = { id: nanoid(), task: newTask.trim() };
      setTasks([...tasks, newTaskWithId]);
      setNewTask("");
    }
  };

  const updateTask = (index: number, newText: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], task: newText };
    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
  };

  return (
    <Wrapper ref={setNodeRef}>
      {dayNumber !== null && <DayNumber>{dayNumber}</DayNumber>}
      {holiday && <Holiday>{holiday}</Holiday>}
      {tasks.map((task, index) => {
        const isHighlighted =
          !!filterText &&
          task.task.toLowerCase().includes(filterText.toLowerCase());

        return (
          <TaskItem
            key={task.id}
            id={task.id}
            index={index}
            date={date}
            task={task.task}
            isHighlighted={isHighlighted}
            onEdit={(newText) => updateTask(index, newText)}
            onDelete={() => deleteTask(index)}
          />
        );
      })}
      {date && (
        <TaskInput value={newTask} onChange={setNewTask} onAdd={addTask} />
      )}
    </Wrapper>
  );
};
