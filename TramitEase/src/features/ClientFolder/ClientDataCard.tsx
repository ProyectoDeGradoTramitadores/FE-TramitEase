
import React from 'react';
import { Box, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { ClientDataCardProps } from '../../shared/types/ClientFolderProps.ts';
import { CardContainer, IconContainer, OrangeLine } from './ClientDataCard.styles.ts';

const ProcedureDataCard: React.FC<ClientDataCardProps> = ({ CI, name, birth, celnumber, email }) => {
    return (
        <Box position="relative">
            <CardContainer>
                <IconContainer>
                    <DescriptionIcon sx={{ color: '#a0a0a0', fontSize: 40 }} />
                </IconContainer>
                <Box>
                    <Typography variant="body1">
                        C.I: {CI}
                    </Typography>
                    <Typography variant="body1">
                        Nombre: {name}
                    </Typography>
                    <Typography variant="body1">
                        Fecha de Nacimiento: {birth}
                    </Typography>
                    <Typography variant="body1">
                        Número de Celular: {celnumber}
                    </Typography>
                    <Typography variant="body1">
                        Email: {email}
                    </Typography>
                </Box>
                <OrangeLine />
            </CardContainer>
        </Box>
    );
};

export default ProcedureDataCard;
