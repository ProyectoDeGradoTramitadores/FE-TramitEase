import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from "../../shared/components/buttons/CustomButton.tsx";
import theme from "../../shared/theme/theme.ts";

const WelcomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate(`login`);
    };

    return (
        <div style={{ display: 'flex', height: '81vh', background: theme.colors.primary.default, gap: 30, padding: '0px 205px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
                alignItems: 'flex-start' }}>
                <h1 style={{ fontSize: 150, textAlign: 'left' }}>Bienvenido!</h1>
                <CustomButton
                    $text="Comenzar"
                    $textStyle="bold"
                    size="m"
                    color="secondary"
                    onClick={handleGetStartedClick}
                />
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img
                    src="../../../src/shared/assets/image/folders.png"
                    alt="Example"
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            </div>
        </div>
    );
}

export default WelcomePage;
