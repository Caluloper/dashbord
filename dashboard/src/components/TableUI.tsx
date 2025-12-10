import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

interface TableUIProps {
   data: OpenMeteoResponse | null;
   loading: boolean;
   error: string | null;
}

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   {
      field: 'hora',
      headerName: 'Hora',
      width: 120,
   },
   {
      field: 'temperatura',
      headerName: 'Temperatura (°C)',
      width: 140,
      type: 'number',
   },
   {
      field: 'velocidad_viento',
      headerName: 'Velocidad del viento (km/h)',
      width: 150,
      type: 'number',
   },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 200,
      valueGetter: (_, row) => `${row.hora}: ${row.temperatura}°C, viento ${row.velocidad_viento} km/h`,
   },
];

export default function TableUI({ data, loading, error }: TableUIProps) {
   const [rows, setRows] = useState<Array<{
      id: number;
      hora: string;
      temperatura: number;
      velocidad_viento: number;
   }>>([]);

   useEffect(() => {
      if (data?.hourly) {
         // Tomar los primeros 5 datos horarios
         const sliceLength = Math.min(5, data.hourly.time.length);
         const newRows = data.hourly.time.slice(0, sliceLength).map((time, index) => {
            const date = new Date(time);
            const hora = date.toLocaleString('es-ES', {
               year: 'numeric',
               month: '2-digit',
               day: '2-digit',
               hour: '2-digit',
               minute: '2-digit',
            });

            return {
               id: index,
               hora,
               temperatura: Math.round(data.hourly.temperature_2m[index] * 10) / 10,
               velocidad_viento: Math.round(data.hourly.wind_speed_10m[index] * 10) / 10,
            };
         });
         setRows(newRows);
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
         <Box sx={{ p: 2, height: 350 }}>
            <Typography color="error">Error al cargar tabla: {error}</Typography>
         </Box>
      );
   }

   if (!data?.hourly || rows.length === 0) {
      return (
         <Box sx={{ p: 2, height: 350 }}>
            <Typography>Seleccione una ciudad para mostrar los datos horarios</Typography>
         </Box>
      );
   }

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}