import { Alert } from "@mui/material";

interface AlertConfig {
    description: string;
}

export default function AlertUI( config: AlertConfig ) {
    return (
        <Alert severity="success" variant="outlined" sx={{ bgcolor: 'rgba(46, 125, 50, 0.06)' }}>
            { config.description }
        </Alert>
    )
}