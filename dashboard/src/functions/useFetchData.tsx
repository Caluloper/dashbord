import { useState, useEffect } from "react";
import { type OpenMeteoResponse, type UseFetchDataResult } from "../types/DashboardTypes";

export default function useFetchData(city: string): UseFetchDataResult {
  const CITY_CONFIG = {
    guayaquil: {
      latitude: -2.1962,
      longitude: -79.8862
    },
    quito: {
      latitude: -0.2298,
      longitude: -78.525
    },
    manta: {
      latitude: -0.9494,
      longitude: -80.7314
    },
    cuenca: {
      latitude: -2.9005,
      longitude: -79.0045
    },
  } as const;

  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) return;

    const config = CITY_CONFIG[city as keyof typeof CITY_CONFIG];
    if (!config) return;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${config.latitude}&longitude=${config.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=auto`;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const json: OpenMeteoResponse = await response.json();
        setData(json);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error desconocido";
        setError(message);
        setData(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [city]);

  return { data, loading, error };
}
