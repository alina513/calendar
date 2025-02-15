import React from "react";
import { Select } from "../CountrySelect/CountrySelect.styled";

interface YearSelectorProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

export const YearSelector: React.FC<YearSelectorProps> = ({
  selectedYear,
  onYearChange,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 26 }, (_, i) => currentYear - 20 + i);

  return (
    <Select
      id="year-select"
      value={selectedYear}
      onChange={(e) => onYearChange(Number(e.target.value))}
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </Select>
  );
};
