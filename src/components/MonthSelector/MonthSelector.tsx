import React from "react";
import { months } from "../../constants/months";
import { Select } from "../CountrySelect/CountrySelect.styled";

interface MonthSelectorProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  onMonthChange,
}) => {
  return (
    <Select
      id="month-select"
      value={selectedMonth}
      onChange={(e) => onMonthChange(Number(e.target.value))}
    >
      {months.map((month, index) => (
        <option key={index} value={index}>
          {month}
        </option>
      ))}
    </Select>
  );
};
