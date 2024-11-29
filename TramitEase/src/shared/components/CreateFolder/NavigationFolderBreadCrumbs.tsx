import React from 'react';
import { Box, Typography } from '@mui/material';
import LinkCustom from '../BreadCrumbs/LinkCustom.tsx';
import BreadCrumbsCustom from '../BreadCrumbs/BreadCrumbsCustom.tsx';
import TypographyCustom from '../BreadCrumbs/TypographyCustom.tsx';
import { useParams } from 'react-router-dom';

const NavigationFolderBreadCrumbs: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const ref = `/Tramitador/${id}/ClientsFolder`
    const clientRef = `/Tramitador/${id}/CreateClientFolder/CreateClient`

    const breadcrumbs = [
        <LinkCustom key="1" text={"Carpetas del client"} linkRef={ref} />,
        <LinkCustom key="1" text={"Crear un cliente"} linkRef={clientRef} />,
        <TypographyCustom key="2" text={"Crear una carpeta"} />
    ];

    return (
        <Box sx={{ marginBottom: '20px', marginTop: '50px' }}>
            <BreadCrumbsCustom breadCrumbs={breadcrumbs} />
            <Typography
                variant="h4"
                component="h1"
                sx={{ color: 'black', padding: '12px 0' }}
            >
                Creacion de una carpeta del cliente
            </Typography>
        </Box>
    );
};

export default NavigationFolderBreadCrumbs;
