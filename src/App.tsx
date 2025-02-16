import { useState, useEffect } from "react";
import { Calendar } from "./components/Calendar/Calendar";
import { getPublicHolidays } from "./api/api";
import { AppWrapper } from "./components/AppWrapper.styled";
import { Header } from "./components/Header/Header";
import { months } from "./constants/months";
import ScrollVelocity from "./TextAnimations/ScrollVelocity/ScrollVelocity";

interface Holiday {
  [key: string]: string;
}

const App = () => {
  const currentYear = new Date().getFullYear();
  const [holidays, setHolidays] = useState<Holiday>({});
  const [countryCode, setCountryCode] = useState<string>("US");
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [year, setYear] = useState<number>(currentYear);

  useEffect(() => {
    const fetchHolidays = async () => {
      const data = await getPublicHolidays(year, countryCode);
      const holidaysMap: Holiday = {};
      data.forEach((holiday: { date: string; localName: string }) => {
        holidaysMap[holiday.date] = holiday.localName;
      });
      setHolidays(holidaysMap);
    };
    fetchHolidays();
  }, [countryCode, year]);

  const handleCountryChange = (countryCode: string) => {
    setCountryCode(countryCode);
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (year: number) => {
    setYear(year);
  };

  return (
    <>
      <Header
        selectedYear={year}
        onYearChange={handleYearChange}
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
        onCountryChange={handleCountryChange}
      />
      <AppWrapper>
        <ScrollVelocity
  texts={[`${months[selectedMonth]} ${year}`, `${months[selectedMonth]} ${year}`]}   
 className="custom-scroll-text"
/>
        <Calendar
          year={year}
          holidays={holidays}
          selectedMonth={selectedMonth}
        />
      </AppWrapper>
    </>
  );
};

export default App;
