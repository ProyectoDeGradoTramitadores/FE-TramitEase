import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts';

interface ClientFolderStatusProps {
    valuePercent: number;
    name: string;
}

const ClientFolderStatusCard: React.FC<ClientFolderStatusProps> = ({ valuePercent, name }) => {

    const getGaugeColor = (value: number) => {
        if (value < 30) {
            return '#f6a1a1';
        } else if (value >= 30 && value < 70) {
            return '#fdfda6';
        } else {
            return '#91e891';
        }
    };

    return (
        <Card sx={{ boxShadow: 1, width: '100%',
            backgroundColor: '#ffffff', color: '#000000', borderRadius:6 }}>
            <CardContent>
                <Typography variant="h5" align="center">
                    {name}
                </Typography>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="150px"
                >
                    <Gauge
                        width={150}
                        height={150}
                        value={valuePercent}
                        sx={(theme) => ({
                            [`& .${gaugeClasses.valueText}`]: {
                                fontSize: 40,
                            },
                            [`& .${gaugeClasses.valueArc}`]: {
                                fill: getGaugeColor(valuePercent),
                            },
                            [`& .${gaugeClasses.referenceArc}`]: {
                                fill: theme.palette.text.disabled,
                            },
                        })}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default ClientFolderStatusCard;
