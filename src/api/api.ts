import axios from "axios";

interface Country {
  countryCode: string;
  name: string;
}

interface PublicHoliday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

const API_BASE = "https://date.nager.at/api/v3";

export const getPublicHolidays = async (
  year: number,
  countryCode: string
): Promise<PublicHoliday[]> => {
  const response = await axios.get(
    `${API_BASE}/PublicHolidays/${year}/${countryCode}`
  );
  return response.data;
};

export const getAvailableCountries = async (): Promise<Country[]> => {
  const response = await axios.get(`${API_BASE}/AvailableCountries`);
  return response.data;
};
