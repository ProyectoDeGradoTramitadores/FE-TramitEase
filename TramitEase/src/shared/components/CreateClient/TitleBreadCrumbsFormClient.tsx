import React from 'react';
import { Box, Typography } from '@mui/material';
import LinkCustom from '../BreadCrumbs/LinkCustom.tsx';
import BreadCrumbsCustom from '../BreadCrumbs/BreadCrumbsCustom.tsx';
import TypographyCustom from '../BreadCrumbs/TypographyCustom.tsx';
import { useParams } from 'react-router-dom';

const TItleBreadCrumbs: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const ref = `/TramitEase/Tramitador/${id}/clients`

    const breadcrumbs = [
        <LinkCustom key="1" text={"Clientes"} linkRef={ref} />,
        <TypographyCustom key="2" text={"Crear Cliente"} />
    ];

    return (
        <Box sx={{ marginBottom: '20px' }}>
            <BreadCrumbsCustom breadCrumbs={breadcrumbs} />
            <Typography
                variant="h4"
                component="h1"
                sx={{ color: 'black', padding: '12px 0' }}
            >
                Crear Cliente
            </Typography>
        </Box>
    );
};

export default TItleBreadCrumbs;
