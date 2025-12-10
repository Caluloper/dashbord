import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface ChartUIProps {
   data: OpenMeteoResponse | null;
   loading: boolean;
   error: string | null;
}

export default function ChartUI({ data, loading, error }: ChartUIProps) {
   const [chartData, setChartData] = useState<{ times: string[]; temperatures: number[]; speeds: number[] }>({
      times: [],
      temperatures: [],
      speeds: []
   });

   useEffect(() => {
      if (data?.hourly) {
         // Tomar los primeros 24 datos horarios
         const sliceLength = Math.min(24, data.hourly.time.length);
         const times = data.hourly.time.slice(0, sliceLength).map(time => {
            const date = new Date(time);
            return date.getHours() + ':00';
         });

         setChartData({
            times,
            temperatures: data.hourly.temperature_2m.slice(0, sliceLength),
            speeds: data.hourly.wind_speed_10m.slice(0, sliceLength)
         });
      }
   }, [data]);

   if (loading) {
      return (
         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 350 }}>
            <CircularProgress />
         </Box>
      );
   }

   if (error) {
      return (
         <Box sx={{ p: 2 }}>
            <Typography color="error">Error al cargar gráfico: {error}</Typography>
         </Box>
      );
   }

   if (!data?.hourly || chartData.times.length === 0) {
      return (
         <Box sx={{ p: 2 }}>
            <Typography>Seleccione una ciudad para mostrar el gráfico</Typography>
         </Box>
      );
   }

   return (
      <>
         <Typography variant="h5" component="div" sx={{ mb: 2 }}>
            Temperatura y Velocidad del Viento (próximas 24 horas)
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: chartData.temperatures, label: `Temperatura (${data.hourly_units?.temperature_2m || '°C'})` },
               { data: chartData.speeds, label: `Velocidad del viento (${data.hourly_units?.wind_speed_10m || 'km/h'})` },
            ]}
            xAxis={[{ scaleType: 'point', data: chartData.times }]}
         />
      </>
   );
}