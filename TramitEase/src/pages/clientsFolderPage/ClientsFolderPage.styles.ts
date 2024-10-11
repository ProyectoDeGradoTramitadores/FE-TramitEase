import styled from 'styled-components';
import { Box, Typography } from '@mui/material';

export const PageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    padding: 35px 287px;
    gap: 50px;
`;

export const ButtonContainer = styled(Box)({
    marginBottom: '20px',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
});

export const TitleTypography = styled(Typography)({
    marginTop: '300px',
    color: '#575656',
});

export const PageContainerClientFolder = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: '205px 120px',
    backgroundColor: 'white',
    width: '1598px',
    height: '540px',
    gap: '20px',
});

export const Image = styled.img`
    margin-top: 160px;
    width: 700px; 
    height: auto;
    opacity: 0.5;
`;

export const TextAndButtonContainer = styled.div`
    display: flex;
    margin-top: 200px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 44px;
`;

export const Text = styled.div`
    font-size: 24px; 
    color: #333;
`;