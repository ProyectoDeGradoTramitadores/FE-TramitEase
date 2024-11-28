import React from 'react';
import { Box, Typography } from '@mui/material';
import LinkCustom from '../../shared/components/BreadCrumbs/LinkCustom.tsx';
import BreadCrumbsCustom from '../../shared/components/BreadCrumbs/BreadCrumbsCustom.tsx';
import TypographyCustom from '../../shared/components/BreadCrumbs/TypographyCustom.tsx';
import { IDS, ROUTES } from '../../shared/constants/routes.ts';

const TitleBreadCrumbsTramitCreate: React.FC = () => {
    const id = IDS().TRAMITADOR_ID;

    const breadcrumbs = [
        <LinkCustom key="1" text={"Procedimientos"} linkRef={ROUTES.TRAMITS_CUSTOM(id)} />,
        <TypographyCustom key="2" text={"Creacion de Procedimiento"} />
    ];

    return (
        <Box sx={{ marginBottom: '20px' }}>
            <BreadCrumbsCustom breadCrumbs={breadcrumbs} />
            <Typography
                variant="h4"
                component="h1"
                sx={{ color: 'black', padding: '12px 0' }}
            >
                Procedimiento
            </Typography>
        </Box>
    );
};

export default TitleBreadCrumbsTramitCreate;
