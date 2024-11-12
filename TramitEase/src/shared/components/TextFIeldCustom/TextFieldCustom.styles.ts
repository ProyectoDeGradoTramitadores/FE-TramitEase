import { TextField } from '@mui/material';
import styled from 'styled-components';
import theme from '../../theme/theme.ts';

export const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.colors.primary.default,
        },
        '&:hover fieldset': {
            borderColor: theme.colors.primary.hower,
        },
        '&.Mui-focused fieldset': {
            borderColor:  theme.colors.primary.action,
        },
    },

    '& .MuiInputLabel-root': {
        color: `${theme.colors.primary.default} !important`,
    },
});