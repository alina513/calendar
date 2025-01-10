import React, { useState, useEffect } from "react";
import { CalendarGrid, FilterInput } from "./Calendar.styled";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DayCell from "../DayCell/DayCell";

interface CalendarProps {
  year: number;
  selectedMonth: number;
  holidays: Record<string, string>;
}
interface Task {
  id: string;
  task: string;
}

const Calendar: React.FC<CalendarProps> = ({
  year,
  selectedMonth,
  holidays,
}) => {
  const localStorageKey = `${year}-${selectedMonth + 1}-tasks`;
  const loadTasksFromLocalStorage = (): Record<string, Task[]> => {
    const storedTasks = localStorage.getItem(localStorageKey);
    return storedTasks ? JSON.parse(storedTasks) : {};
  };
  const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, selectedMonth, 1).getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const [tasks, setTasks] = useState<Record<string, Task[]>>(
    loadTasksFromLocalStorage()
  );
  const [filterText, setFilterText] = useState<string>("");

  
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(tasks));
  }, [tasks, localStorageKey]);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const sourceDate = active.data.current?.droppableId;
    const destinationDate = over.data.current?.droppableId;
    const sourceIndex = active.data.current?.index;
    if (!sourceDate || !over.id || sourceIndex === undefined) {
      return;
    }
    if (sourceDate === destinationDate) {
      const reorderedTasks = arrayMove(
        tasks[sourceDate],
        sourceIndex,
        over.data.current?.index || 0
      );
      setTasks({ ...tasks, [sourceDate]: reorderedTasks });
    } else {
      const sourceTasks = Array.from(tasks[sourceDate]);
      const destinationTasks = Array.from(tasks[over.id]);
      const [movedTask] = sourceTasks.splice(sourceIndex, 1);
      destinationTasks.splice(0, 0, movedTask);
      setTasks({
        ...tasks,
        [sourceDate]: sourceTasks,
        [over.id]: destinationTasks,
      });
    }
  };

  const generateDates = () => {
    const dates: Array<{ date: string | null; dayNumber: number | null }> = [];
    for (let i = 0; i < startOffset; i++) {
      dates.push({ date: null, dayNumber: null });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${(selectedMonth + 1)
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      if (!tasks[date]) tasks[date] = []; // Ініціалізуємо порожні дні
      dates.push({ date, dayNumber: day });
    }
    return dates;
  };

  return (
    <>
      <FilterInput
        type="text"
        value={filterText}
        placeholder="Пошук завдань..."
        onChange={(e) => setFilterText(e.target.value)}
      />
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <CalendarGrid>
          {generateDates().map(({ date, dayNumber }, index) => (
            <SortableContext
              key={index}
              items={tasks[date || ""] || []}
              strategy={verticalListSortingStrategy}
            >
              <DayCell
                date={date}
                dayNumber={dayNumber}
                holiday={date ? holidays[date] || "" : ""}
                tasks={tasks[date || ""] || []}
                filterText={filterText}
                setTasks={(newTasks) =>
                  date && setTasks({ ...tasks, [date]: newTasks })
                }
              />
            </SortableContext>
          ))}
        </CalendarGrid>
      </DndContext>
    </>
  );
};

export default Calendar;
