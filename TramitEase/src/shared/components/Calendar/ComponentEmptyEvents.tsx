import imageSrc from "../../assets/image/iconPaperSad.png";
import React from 'react';
import { Box, Typography } from '@mui/material';

const ComponentEmptyEvents: React.FC = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                width: '1800px',
                height: '740px',
            }}
        >
            <Box
                component="img"
                src={imageSrc}
                alt="No Events"
                sx={{
                    width: 700,
                    height: 700,
                    opacity: 0.5,
                }}
            />
            <div
                style={{
                display: 'flex',
                flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
            }}>
                <Typography
                    variant="h6"
                    color="#6e6e6e"
                    sx={{ fontWeight: 'bold', marginBottom: 1 }}
                >
                    OPPS, AÚN NO TIENES EVENTOS DISPONIBLES
                </Typography>
                <Typography
                    variant="body1"
                    color="textSecondary"
                >
                    Empieza por crear carpetas de cliente  e iniciarlas para poder obtener la vista del calendario.
                </Typography>
            </div>

        </div>
    );
};

export default ComponentEmptyEvents;
