import React from 'react';
import WelcomePage from "../../features/Landing/WelcomePage.tsx";
import IntroducePage from "../../features/Landing/IntroducePage.tsx";
import LandingHeader from "../../features/Landing/LandingHeader.tsx";
import InfoAppPage from "../../features/Landing/InfoAppPage.tsx";

const LandingPage: React.FC = () => {
    const headerStyle = {
        position: 'sticky' as 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%'
    };

    const mainStyle = {
        flex: 1,
        overflowY: 'auto' as 'auto'
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        height: '100vh',
        overflow: 'hidden' as 'hidden'
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <LandingHeader/>
            </div>
            <main style={mainStyle}>
                <WelcomePage/>
                <IntroducePage/>
                <InfoAppPage/>
            </main>
        </div>
    );
};

export default LandingPage;
