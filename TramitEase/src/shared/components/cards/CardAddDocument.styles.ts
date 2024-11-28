import styled from 'styled-components';

export const CardContainer = styled.div`
    width: 150px;
    height: 200px;
    background-color: white;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 4px 4px 6px 3px rgb(174, 172, 172);
    font-size: 48px;
    color: #827b7b;
    text-align: center;
`;

export const PlusSign = styled.span`
    font-weight: bold;
    color: #a8a0a0;
`;

export const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    text-align: center;
    border-radius: 8px;
    width: 300px;
`;

export const ProgressBar = styled.div<{ progress: number }>`
    height: 10px;
    background-color: #4caf50;
    margin: 10px 0;
    transition: width 0.2s;
    width: ${({ progress }) => progress}%;
`;