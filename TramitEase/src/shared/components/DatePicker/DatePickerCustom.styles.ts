import theme from '../../theme/theme.ts';
import styled from 'styled-components';
import { DatePicker } from '@mui/x-date-pickers';

export const CustomDatePicker = styled(DatePicker)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.colors.primary.default,
        },
        '&:hover fieldset': {
            borderColor: theme.colors.primary.default,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.colors.primary.action,
        },
    },
    '& .MuiFormLabel-root': {
        color: `${theme.colors.primary.default} !important`,
    },
    '& .MuiSvgIcon-root': {
        color: `${theme.colors.primary.default} !important`,
    },
});
