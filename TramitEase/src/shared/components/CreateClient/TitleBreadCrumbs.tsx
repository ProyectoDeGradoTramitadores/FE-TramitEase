import React from 'react';
import { Box, Typography } from '@mui/material';
import LinkCustom from '../BreadCrumbs/LinkCustom.tsx';
import BreadCrumbsCustom from '../BreadCrumbs/BreadCrumbsCustom.tsx';
import TypographyCustom from '../BreadCrumbs/TypographyCustom.tsx';
import { useParams } from 'react-router-dom';

const TItleBreadCrumbs: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const ref = `/TramitEase/Tramitador/${id}/ClientsFolder`

    const breadcrumbs = [
        <LinkCustom key="1" text={"Clients Folder"} linkRef={ref} />,
        <TypographyCustom key="2" text={"Create Client"} />
    ];

    return (
        <Box sx={{ marginBottom: '20px' }}>
            <BreadCrumbsCustom breadCrumbs={breadcrumbs} />
            <Typography
                variant="h4"
                component="h1"
                sx={{ color: 'black', padding: '12px 0' }}
            >
                Create Client
            </Typography>
        </Box>
    );
};

export default TItleBreadCrumbs;
