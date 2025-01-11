import { Wrapper } from "./Header.styled";
import React from "react";
import { CountrySelect } from "../CountrySelect/CountrySelelect";
import { MonthSelector } from "../MonthSelector/MonthSelector";
import { YearSelector } from "../YearSelector/YearSelector";

interface HeaderProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  selectedMonth: number;
  onMonthChange: (month: number) => void;
  onCountryChange: (countryCode: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedYear,
  onYearChange,
  selectedMonth,
  onMonthChange,
  onCountryChange,
}) => {
  return <Wrapper>
    <CountrySelect onCountryChange={onCountryChange} />
      <YearSelector selectedYear={selectedYear} onYearChange={onYearChange} />
      <MonthSelector
        selectedMonth={selectedMonth}
        onMonthChange={onMonthChange}
      />
  </Wrapper>;
};
