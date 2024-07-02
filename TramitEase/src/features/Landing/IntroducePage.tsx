import React from 'react';
import theme from "../../shared/theme/theme.ts";
import styled from 'styled-components';

const ImageWithTextOverlay: React.FC = () => {
    const StyledContainer = styled.div`
        display: flex;
        justify-content: center; 
        align-items: center;
        padding: 20px;
        background: ${theme.colors.background.default};
    `;

    const StyledImageWrapper = styled.div`
        position: relative;
        max-width: 500px;
        max-height: 500px;
        overflow: hidden; /* Asegura que la imagen no desborde */
    `;

    const StyledImage = styled.img`
        width: 100%;
        height: auto;
        object-fit: cover;
    `;

    const StyledTextOverlay = styled.div`
        position: absolute;
        top: 1%;
        left: 90%; /* Centra horizontalmente */
        transform: translateX(-50%);
        color: white;
        text-align: center;
        padding: 10px;
        width: 200px; /* Ajusta el ancho según sea necesario */
    `;


    const StyledText = styled.p`
        color: ${theme.colors.secondary.default};
        font-size: 40px;
        font-weight: bold;
        margin: 0;
        white-space: nowrap; /* Evita que el texto se divida en varias líneas */
    `;


    const StyledContainerText = styled.div`
        max-width: 567px;
        margin-top: 155px;
        padding: 20px;
        text-align: left;
    `;

    const StyledTextApp = styled.p`
        font-size: 24px;
        font-weight: bold;
        color: ${theme.colors.shades.black};
        line-height: 1.5;
    `;

    return (
        <StyledContainer>
            <StyledImageWrapper>
                <StyledImage src='../../../src/shared/assets/image/womantramitbackground.jpeg' alt="Example"/>
                <StyledTextOverlay>
                    <StyledText>Tramit</StyledText>
                    <StyledText>Ease</StyledText>
                </StyledTextOverlay>
            </StyledImageWrapper>
            <StyledContainerText>
                <StyledTextApp>Aplicación Web para la Optimización en el control
                    y seguimiento de los procedimientos judiciales y
                    legislativos</StyledTextApp>
                <StyledTextApp>Esta aplicacion esta diseñada para mejorar la
                    eficiencia y la transparencia en el seguimiento de los
                    procedimientos judiciales y legislativos en Bolivia.
                    Esta aplicación proporciona una plataforma
                    centralizada para que los tramitadores gestionen y
                    supervisen todos los aspectos dentro de su trabajo.</StyledTextApp>
            </StyledContainerText>
        </StyledContainer>
    );
};

export default ImageWithTextOverlay;
