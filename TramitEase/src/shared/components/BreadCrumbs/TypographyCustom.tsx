import React from 'react';
import { BreadcrumbsProps } from '../../types/BreadcrumbsProps.ts';
import { CustomTypography } from './TypographyCustom.styles.ts';

const TypographyCustom: React.FC <BreadcrumbsProps> =
    ({ text })=> {
        return(
            <CustomTypography
                        key="1">
                {text}
            </CustomTypography>
        );
    };

export  default TypographyCustom;