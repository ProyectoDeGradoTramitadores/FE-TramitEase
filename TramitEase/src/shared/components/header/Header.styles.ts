import styled from 'styled-components';
import theme from '../../theme/theme.ts';

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    height: auto;
    padding: 30px 60px;
    background-color: ${theme.colors.primary.default};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    gap: 1402px;
    z-index: 1000;
`;

export const LogoContainer = styled.div`
    display: flex;
`;

export const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
`;

export const DropdownMenu = styled.div`
    position: absolute;
    top: 90%;
    right: 60px;
    padding: 20px;
    z-index: 1001;
`;
