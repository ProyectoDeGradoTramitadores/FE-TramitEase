import theme from '../../theme/theme';
import styled from 'styled-components';

export const MenuItemContainer = styled.div`
    padding: 10px 0px;
    border-radius: 45px;
    text-align: center;
    cursor: pointer;
    font-size: 18px;
    font-weight: ${theme.fonts.headers.header3.bold.fontWeight};
    line-height: ${theme.fonts.headers.header3.bold.lineHeight};
    
    &:hover {
        background-color: ${theme.colors.primary.hower};
    }
    &:active {
        background-color: ${theme.colors.secondary.action};
    }
`;
