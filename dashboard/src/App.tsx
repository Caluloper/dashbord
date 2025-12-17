import './App.css'
import { Grid, Card, CardContent, Typography, Stack, Divider, Button, Link } from '@mui/material';
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
      <Grid size={12}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Información adicional
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {!data && !loading && !error && (
              <Typography variant="body2" color="text.secondary">
                Seleccione una ciudad para ver detalles del lugar y la fuente de datos.
              </Typography>
            )}
            {loading && (
              <Typography variant="body2" color="text.secondary">
                Cargando metadatos…
              </Typography>
            )}
            {error && !loading && (
              <Typography variant="body2" color="error">
                No se pudo cargar la información adicional.
              </Typography>
            )}
            {data && !loading && !error && (
              <Stack spacing={1.2}>
                <Typography variant="body2">
                  <strong>Ciudad:</strong> {cityInput || '—'}
                </Typography>
                <Typography variant="body2">
                  <strong>Última actualización:</strong>{' '}
                  {data.current?.time ? new Date(data.current.time).toLocaleString() : '—'}
                </Typography>
                <Typography variant="body2">
                  <strong>Coordenadas:</strong> {data.latitude.toFixed(4)}, {data.longitude.toFixed(4)}
                </Typography>
                <Typography variant="body2">
                  <strong>Zona horaria:</strong> {data.timezone} ({data.timezone_abbreviation})
                </Typography>
                {typeof data.elevation === 'number' && (
                  <Typography variant="body2">
                    <strong>Elevación:</strong> {data.elevation} m
                  </Typography>
                )}
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    component={Link}
                    href={`https://www.openstreetmap.org/?mlat=${data.latitude}&mlon=${data.longitude}#map=10/${data.latitude}/${data.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver en mapa
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    component={Link}
                    href="https://open-meteo.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fuente: Open‑Meteo
                  </Button>
                </Stack>
              </Stack>
            )}
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
}

export default App
