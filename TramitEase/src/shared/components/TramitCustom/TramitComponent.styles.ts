import { styled } from '@mui/system';
import { Box } from '@mui/material';
import theme from '../../theme/theme';

export const Image = styled('img')({
    borderRadius: '5px',
    width: '100%',
    maxWidth: '100px',
    height: 'auto',
    boxSizing: 'border-box'
});

export const TextContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
`;

export const StyledBox = styled(Box)`
    display: flex;
    align-items: center;
    flex-direction: column; 
    padding: 16px;
    gap: 16px;
    background-color: ${theme.colors.secondary.default};
    border-radius: 25px;
    width: 100%;
    max-width: 400px;
    transition: background-color 0.3s ease;

    @media (min-width: 600px) { 
        flex-direction: row;
    }

    &:hover {
        background-color:${theme.colors.secondary.hower};
    }

    &:active {
        background-color: ${theme.colors.secondary.action};
    }
`;