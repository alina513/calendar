import { useState, useEffect } from "react";
import { getAvailableCountries } from "../../api/api";
import { Select} from "./CountrySelect.styled";

interface Country {
  countryCode: string;
  name: string;
}

interface CountrySelectProps {
  onCountryChange: (countryCode: string) => void;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
  onCountryChange,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("US");

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await getAvailableCountries();
      setCountries(response);
    };
    fetchCountries();
  }, [onCountryChange]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = event.target.value;
    setSelectedCountry(selectedCode);
    onCountryChange(selectedCode);
  };

  return (
    <Select
      id="countryCode"
      value={selectedCountry}
      onChange={handleCountryChange}
    >
      {countries.map((country) => (
        <option key={country.countryCode} value={country.countryCode}>
          {country.name}
        </option>
      ))}
    </Select>
  );
};
