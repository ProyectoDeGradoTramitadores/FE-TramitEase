import theme from '../../theme/theme.ts';
import styled from 'styled-components';
import { Typography as MuiTypography } from '@mui/material';

export const CustomTypography = styled(MuiTypography)({
    color: theme.colors.primary.action,
});