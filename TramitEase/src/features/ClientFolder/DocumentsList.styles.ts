import styled from 'styled-components';

export const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    flex-wrap: wrap;
    @media (max-width: 768px) {
        padding: 10px;
        gap: 15px;
        flex-direction: column;
    }
`;
