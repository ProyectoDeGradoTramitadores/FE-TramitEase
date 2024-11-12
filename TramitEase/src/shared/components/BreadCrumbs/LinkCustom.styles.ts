import theme from '../../theme/theme.ts';
import styled from 'styled-components';
import { Link } from '@mui/material';

export const CustomLink = styled(Link)({
    '&:hover': {
        color: theme.colors.primary.hower,
    },
});