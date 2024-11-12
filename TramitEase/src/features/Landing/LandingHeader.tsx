import React from 'react';
import styled from 'styled-components';
import theme from "../../shared/theme/theme.ts";
import LogoBlack from "../../shared/assets/logo/black/LogoBlack.tsx";
import CustomButton from "../../shared/components/buttons/CustomButton.tsx";

const HeaderContainer = styled.header`
    background-color: ${theme.colors.primary.default};
    padding: 25px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        gap: 100px;
        padding: 20px 50px;
    }

    @media (max-width: 480px) {
        gap: 50px;
        padding: 20px 20px;
        flex-direction: column;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 60px;
    flex-wrap: wrap;
    justify-content: center;
`;

const LandingHeader: React.FC<{
    onAboutClick: () => void;
    onFeaturesClick: () => void;
    onHomeClick: () => void;
}> = ({ onAboutClick, onFeaturesClick, onHomeClick }) => {
    return (
        <HeaderContainer>
            <LogoBlack size={'l'} color={'primary'} onClick={onHomeClick} />
            <ButtonContainer>
                <CustomButton size={'m'} color={'primary'} $text={"ACERCA DE"} $textStyle={'bold'} onClick={onAboutClick}/>
                <CustomButton size={'m'} color={'primary'} $text={"CARACTERISTICAS"} $textStyle={'bold'} onClick={onFeaturesClick}/>
                <CustomButton size={'m'} color={'ternary'} $text={"INICIAR SESION"} $textStyle={'bold'} />
            </ButtonContainer>
        </HeaderContainer>
    );
};

export default LandingHeader;
