import theme from '../../shared/theme/theme.ts';
import styled from 'styled-components';

export const Card = styled.div`
    background-color: ${theme.colors.primary.default};
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
    padding: 16px;
    max-width: 550px;
    margin: 0 auto;
    box-shadow: 6px 6px 6px rgb(98, 98, 98);

    @media (max-width: 768px) {
        max-width: 100%;
        padding: 12px;
    }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px 8px 0 0;
`;

export const Name = styled.div`
    color: white;
    font-size: 28px;
    font-weight: bold;
    margin-top: 12px;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`;
