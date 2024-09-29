// src/shared/common/components/ProcedureInfoCard.tsx

import React from 'react';
import { Box, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { ClientInfoCardProps } from '../../shared/types/ClientFolderProps.ts';
import { CardContainer, IconContainer, OrangeLine } from './ClientInfoCard.styles.ts';

const ProcedureInfoCard: React.FC<ClientInfoCardProps> = ({ procedureName, duration }) => {
    return (
        <Box position="relative">
            <CardContainer>
                <IconContainer>
                    <DescriptionIcon sx={{ color: '#1c1c1c', fontSize: 40 }} />
                </IconContainer>
                <Box>
                    <Typography variant="body1">
                        Nombre del trámite: {procedureName}
                    </Typography>
                    <Typography variant="body1">
                        Días de duración del trámite: {duration} días
                    </Typography>
                </Box>
                <OrangeLine />
            </CardContainer>
        </Box>
    );
};

export default ProcedureInfoCard;
