import React from 'react';
import { BreadcrumbProps } from '../../types/BreadcrumbsProps.ts';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import theme from '../../theme/theme.ts';
import { Breadcrumbs } from '@mui/material';

const BreadCrumbsCustom: React.FC <BreadcrumbProps> =
    ({ breadCrumbs })=> {
        return(
        <Breadcrumbs
            separator={
                <NavigateNextIcon sx={{ color: theme.colors.primary.default, fontSize: 'medium' }} />}
            aria-label="breadcrumb"
        >
            {breadCrumbs}
        </Breadcrumbs>
        );
    };

export  default BreadCrumbsCustom;