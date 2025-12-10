import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';
import ChartUI from './components/ChartUI';
import TableUI from './components/TableUI';
import { useState } from 'react';

function App() {

  const [cityInput, setCityInput] = useState<string>("");
  
  const dataFetcherOutput = useFetchData(cityInput);

  const { data, loading, error } = dataFetcherOutput;

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={{ xs: 12 }}>
        <HeaderUI />
      </Grid>

      {/* Alertas */}
      <Grid size={{ xs: 12 }} container justifyContent="right" alignItems="center">
        <AlertUI description="No se preveen lluvias" />
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectorUI value={cityInput} onChange={setCityInput}/>
      </Grid>

      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }}>
        {loading && (
          <Grid size={12}>
            <IndicatorUI
              title='Cargando'
              description='Seleccione una ciudad'
            />
          </Grid>
        )}

        {error && !loading && (
          <Grid size={12}>
            <IndicatorUI
              title='Error al cargar datos'
              description={error}
            />
          </Grid>
        )}

        {data && !loading && !error && (
          <>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Temperatura (2m)'
                description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Sensación térmica'
                description={`${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Velocidad del viento (10m)'
                description={`${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Humedad relativa (2m)'
                description={`${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`} />
            </Grid>
          </>
        )}
      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: "none", md: "block" } }}>
        <ChartUI data={data} loading={loading} error={error} />
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: "none", md: "block" } }}>
        <TableUI data={data} loading={loading} error={error} />
      </Grid>

      {/* Información adicional */}
      <Grid size={12}>Elemento: Información adicional</Grid>

    </Grid>
  )
}

export default App
