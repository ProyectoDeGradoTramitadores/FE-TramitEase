import styled from 'styled-components';
import { Box } from '@mui/material';
import theme from '../../shared/theme/theme.ts';

export const CardContainer = styled(Box)({
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    padding: '16px',
    gap: '20px',
    position: 'relative',
    boxShadow: '1px 2px 5px 1px rgba(0, 0, 0, 0.30)',
    maxWidth: '700px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
});


export const RedLine = styled(Box)({
    content: '""',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '0.2cm',
    backgroundColor: theme.colors.ternary.action,
});

export const IconContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '16px',
});