import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

const StepGuide: React.FC<{ number: number; text: string; imageSrc: string }> = ({ number, text, imageSrc }) => (
    <Box display="flex" flexDirection="column" alignItems="left" gap={2}>
        <Box>

            <Box display="flex" gap={"23px"} alignItems="center">
                <Avatar sx={{ bgcolor: '#fa8a38', color: 'white', fontSize: '1rem', width: 32, height: 32 }}>
                    {number}
                </Avatar>
                <Typography variant="body1" style={{ color: 'white', fontWeight: 'bold' }}>
                    {text}
                </Typography>
            </Box>
        </Box>

        <img src={imageSrc} alt={`Paso ${number}`} style={{ maxWidth: '250px', marginTop: '10px' }} />
    </Box>
);

export default StepGuide;
