import React from 'react';
import theme from "../../shared/theme/theme.ts";
import styled from 'styled-components';

const IntroducePage: React.FC = () => {
    const StyledMainContainer = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        background: ${theme.colors.background.default};
    `;

    const StyledContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const StyledImageWrapper = styled.div`
        position: relative;
        max-width: 600px;
        max-height: 600px;
    `;

    const StyledImage = styled.img`
        width: 80%;
        height: auto;
        object-fit: cover;
    `;

    const StyledTextOverlay = styled.div`
        position: absolute;
        top: 20%;
        left: 95%;
        transform: translate(-50%, -50%);
        color: white;
        text-align: left;
        line-height: 1;
        padding: 10px;
    `;

    const StyledText = styled.p`
        color: ${theme.colors.secondary.default};
        font-size: 100px;
        font-weight: 500;
        margin: 0 0;
        white-space: nowrap;
    `;

    const StyledContainerText = styled.div`
        max-width: 556px;
        margin-top: 200px;
        margin-left: -110px;
        padding: 20px;
        text-align: left;
    `;

    const StyledTextApp = styled.p`
        font-size: 20px;
        font-weight: bold;
        color: ${theme.colors.shades.black};
        line-height: 1.5;
    `;

    const StyledTextDescriptionApp = styled.p`
        font-size: 19px;
        font-weight: lighter;
        color: ${theme.colors.shades.black};
        line-height: 1.5;
    `;

    const numberColors = {
        1: 'rgba(104, 109, 118, 0.4)',
        2: 'rgba(55, 58, 64, 0.4)',
        3: 'rgba(220, 95, 0, 0.4)',
    };

    const StyledOfferContainer = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: -32px;
    `;

    const StyledOfferItemsContainer = styled.div`
        display: flex;
        gap: 340px;
        align-items: center;
        margin-left: -265px;
    `;

    const StyledOfferItem = styled.div`
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    `;

    const StyledOfferNumber = styled.div<{ color: string }>`
        margin-top: -34px;
        font-size: 150px;
        font-weight: bold;
        color: ${props => props.color};
        position: relative;
        z-index: 1; 
    `;

    const StyledOfferText = styled.div`
        color: #1a1a1a;
        font-size: 20px;
        width: 320px;
        position: absolute;
        font-weight: bold;
        text-align: left;
        top: 43%;
        left: 156%; 
        transform: translate(-50%, -50%);
        z-index: 2;
    `;

    const StyledOfferHeader = styled.h1`
        color: #1a1a1a;
        font-size: 30px;
        font-weight: bold;
    `;

    return (
        <StyledMainContainer>
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
                    <StyledTextDescriptionApp>Esta aplicacion esta diseñada para mejorar la
                        eficiencia y la transparencia en el seguimiento de los
                        procedimientos judiciales y legislativos en Bolivia.
                        Esta aplicación proporciona una plataforma
                        centralizada para que los tramitadores gestionen y
                        supervisen todos los aspectos dentro de su trabajo.</StyledTextDescriptionApp>
                </StyledContainerText>
            </StyledContainer>
            <StyledOfferContainer>
                <StyledOfferHeader>La aplicacion ofrece:</StyledOfferHeader>
                <StyledOfferItemsContainer>
                    <StyledOfferItem>
                        <StyledOfferNumber color={numberColors[1]}>01</StyledOfferNumber>
                        <StyledOfferText>Personalizacion de Documentos, Formularios y procedimientos</StyledOfferText>
                    </StyledOfferItem>
                    <StyledOfferItem>
                        <StyledOfferNumber color={numberColors[2]}>02</StyledOfferNumber>
                        <StyledOfferText>Gestion de las carpetas de los clientes</StyledOfferText>
                    </StyledOfferItem>
                    <StyledOfferItem>
                        <StyledOfferNumber color={numberColors[3]}>03</StyledOfferNumber>
                        <StyledOfferText>Llenado de casillas en blanco de formularios escaneados</StyledOfferText>
                    </StyledOfferItem>
                </StyledOfferItemsContainer>
            </StyledOfferContainer>
        </StyledMainContainer>
    );
};

export default IntroducePage;
