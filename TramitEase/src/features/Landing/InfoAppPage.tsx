import React from 'react';
import theme from "../../shared/theme/theme.ts";
import styled from 'styled-components';

const StyledDiv = styled.div`
    height: 77vh;
    background: linear-gradient(to right, ${theme.colors.secondary.default} 50%, ${theme.colors.primary.default} 50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`;

const StyledContainer = styled.div`
    width: 48%; 
    display: flex;
    align-items: center;
`;

const StyledThirdItemContainer = styled.div`
    width: 48%; 
    display: flex;
    align-items: center;
`;

const StyledNumber = styled.div`
    font-size: 200px;
    font-weight: bold;
    color: white;
`;

const StyledText = styled.div`
    font-size: 24px;
    color: white;
`;

const InfoAppPage: React.FC = () => {
    return (
        <StyledDiv>
            <div >
                <StyledContainer>
                    <StyledNumber>01</StyledNumber>
                    <StyledText>
                        creación de formularios, documentos o procedimientos
                        y estos son reutilizables.
                        Los formularios y/o documentos pueden pertenecer a una
                        etapa dentro de un procedimiento.
                    </StyledText>
                </StyledContainer>
                <StyledContainer>
                    <StyledNumber>02</StyledNumber>
                    <StyledText>
                        Creacion de carpetas de clientes con su respectivo
                        procedimiento Y documentacion respectiva.
                        Seguimiento y notificacion del vencimiento de cada
                        etapa dentro de un procedimiento.
                    </StyledText>
                </StyledContainer>
            </div>
            <StyledThirdItemContainer>
                <StyledNumber>03</StyledNumber>
                <StyledText>
                    Escaneo y guardado de documentacion dentro de
                    una carpeta de un cliente.
                    Llenado de formularios/documentos en blanco.
                </StyledText>
            </StyledThirdItemContainer>
        </StyledDiv>
    );
}

export default InfoAppPage;
