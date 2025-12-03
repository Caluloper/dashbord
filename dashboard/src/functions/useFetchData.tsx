import { useState, useEffect } from "react";
import { type OpenMeteoResponse } from "../types/DashboardTypes";

export default function useFetchData(): OpenMeteoResponse | null {

  const URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago';

  const [data, setData] = useState<OpenMeteoResponse | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(URL);
      const json: OpenMeteoResponse = await response.json();
      setData(json);
    })();
  }, []);

  return data;

}