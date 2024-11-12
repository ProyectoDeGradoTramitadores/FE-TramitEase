import styled from 'styled-components';
import { Box } from '@mui/material';
import theme from '../../shared/theme/theme.ts';

export const CardContainer = styled(Box)({
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '16px',
    position: 'relative',
    boxShadow: '2px 2px 5px 2px rgba(0, 0, 0, 0.2)',
    maxWidth: '600px',
    margin: '0 auto',
    gap: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    textAlign: 'left',
});

export const OrangeLine = styled(Box)({
    content: '""',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '0.3cm',
    backgroundColor: theme.colors.primary.default,
});

export const IconContainer = styled(Box)({
    display: 'flex',
    marginRight: '16px',
});