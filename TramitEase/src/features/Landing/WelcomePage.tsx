import React from 'react';
import CustomButton from "../../shared/components/buttons/CustomButton.tsx";
import theme from "../../shared/theme/theme.ts";

const WelcomePage: React.FC = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', background: theme.colors.primary.default, gap: 136, padding: '0px 86px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
                alignItems: 'flex-start' }}>
                <h1 style={{ fontSize: 120, textAlign: 'left' }}>Welcome!</h1>
                <CustomButton $text="Get Started" $textStyle="bold" size="m" color="secondary"
                              onClick={() => alert("Get Started")} />
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src="../../../src/shared/assets/image/folders.png" alt="Example"
                     style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
        </div>
    );
}

export default WelcomePage;
