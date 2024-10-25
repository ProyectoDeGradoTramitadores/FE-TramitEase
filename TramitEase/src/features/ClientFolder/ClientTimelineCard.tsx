import React from 'react';
import { Box, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { ClientTimelineCardProps } from '../../shared/types/ClientFolderProps.ts';
import { CardContainer, IconContainer, RedLine } from './ClientTimelineCard.styles.ts';

const ClientTimelineCard: React.FC<ClientTimelineCardProps> = ({ startDate, endDate }) => {
    return (
        <Box position="relative">
            <CardContainer>
                <IconContainer>
                    <AccessTimeIcon sx={{ color: '#e10f0f', fontSize: 40 }} />
                </IconContainer>
                <Box>
                    <Typography variant="body1">
                        Día de iniciación: {startDate}
                    </Typography>
                    <Typography variant="body1">
                        Día de finalización: {endDate ? endDate : "En progreso"}
                    </Typography>
                </Box>
                <RedLine />
            </CardContainer>
        </Box>
    );
};

export default ClientTimelineCard;
