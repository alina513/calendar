import React from "react";

interface MonthSelectorProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  onMonthChange,
}) => {
  return (
    <div>
      <label htmlFor="month-select">Оберіть місяць:</label>
      <select
        id="month-select"
        value={selectedMonth}
        onChange={(e) => onMonthChange(Number(e.target.value))}
      >
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

