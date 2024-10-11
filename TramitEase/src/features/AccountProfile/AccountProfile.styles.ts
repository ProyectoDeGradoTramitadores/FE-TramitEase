import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    min-width: 1666px;
    gap: 160px;
    background-color: #fafafa;
    padding: 86px;
`;

export const ImageContainer = styled.div`
    margin-top: 134px;
    margin-left: 245px;
    gap: 34px;
    margin-right: 16px;
    display: flex;
    flex-direction: column;
`;

export const Image = styled.img`
    border-radius: 50%;
    width: 400px;
    height: 400px;
`;

export const InfoContainer = styled.div`
    display: flex;
    margin-top: 34px;
    flex-direction: column;
`;

export const NameContainer = styled.div`
    background-color: #6e6e6e;
    color: white;
    padding: 8px;
    border-radius: 17px;
    margin-bottom: 8px;
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
`;

export const EditButton = styled.button`
    background-color: transparent;
    border: none;
    color: #919293;
    cursor: pointer;
    margin-bottom: 8px;
`;

export const DeleteButton = styled.button`
    background-color: transparent;
    border: none;
    color: #9a9696;
    cursor: pointer;
`;

export const DetailsContainer = styled.div`
    color: #1a1a1a;
`;

export const Title = styled.h2`
    margin-bottom: 8px;
    font-size: 3.5em;
`;

export const ParagraphCustom = styled.p`
    font-size: 1.2em;
    color: #333;
`;
