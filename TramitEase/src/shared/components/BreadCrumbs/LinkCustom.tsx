import React from 'react';
import { CustomLink } from './LinkCustom.styles.ts';
import { BreadcrumbsProps } from '../../types/BreadcrumbsProps.ts';
import theme from '../../theme/theme.ts';
const LinkCustom: React.FC <BreadcrumbsProps> =
    ({ linkRef, text })=> {

    return(
        <CustomLink sx={{ color: theme.colors.primary.default }} underline="hover"
                    key="1" href={linkRef}>
            {text}
        </CustomLink>
    );
};

export  default LinkCustom;