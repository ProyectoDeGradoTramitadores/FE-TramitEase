import styled from 'styled-components';
import theme from '../../theme/theme';

export const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 330px; 
    height: auto; 
    padding: 10px;
`;

export const MenuSection = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.primary.default};
    border-radius: 45px;
    padding: 20px;
    gap: 10px;
    width: 100%;
`;
