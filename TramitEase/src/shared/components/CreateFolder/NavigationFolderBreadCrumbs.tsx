import React from 'react';
import { Box, Typography } from '@mui/material';
import LinkCustom from '../BreadCrumbs/LinkCustom.tsx';
import BreadCrumbsCustom from '../BreadCrumbs/BreadCrumbsCustom.tsx';
import TypographyCustom from '../BreadCrumbs/TypographyCustom.tsx';
import { useParams } from 'react-router-dom';

const NavigationFolderBreadCrumbs: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const ref = `/TramitEase/Tramitador/${id}/ClientsFolder`
    const clientRef = `/TramitEase/Tramitador/${id}/CreateClientFolder/CreateClient`

    const breadcrumbs = [
        <LinkCustom key="1" text={"Clients Folder"} linkRef={ref} />,
        <LinkCustom key="1" text={"Create Client"} linkRef={clientRef} />,
        <TypographyCustom key="2" text={"Create Folder"} />
    ];

    return (
        <Box sx={{ marginBottom: '20px', marginTop: '50px' }}>
            <BreadCrumbsCustom breadCrumbs={breadcrumbs} />
            <Typography
                variant="h4"
                component="h1"
                sx={{ color: 'black', padding: '12px 0' }}
            >
                Create Client Folder
            </Typography>
        </Box>
    );
};

export default NavigationFolderBreadCrumbs;
