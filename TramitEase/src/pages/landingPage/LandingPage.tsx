import React, { useRef, useState } from 'react';
import WelcomePage from "../../features/Landing/WelcomePage.tsx";
import IntroducePage from "../../features/Landing/IntroducePage.tsx";
import LandingHeader from "../../features/Landing/LandingHeader.tsx";
import InfoAppPage from "../../features/Landing/InfoAppPage.tsx";
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('welcome');
    const introduceRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const infoRef = useRef<HTMLDivElement>(null);
    const welcomeRef = useRef<HTMLDivElement>(null);

    const handleLoginClick = () => {
        navigate(`/TramitEase/login`);
    };

    const handleAboutClick = () => {
        setCurrentPage('introduce');

        if (introduceRef.current) {
            introduceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleFeaturesClick = () => {
        setCurrentPage('info');

        if (infoRef.current) {
            infoRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };

    const handleHomeClick = () => {
        setCurrentPage('welcome');

        if (welcomeRef.current) {
            welcomeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const headerStyle = {
        position: 'sticky' as const,
        top: 0,
        zIndex: 100,
        width: '100%'
    };

    const mainStyle = {
        flex: 1,
        overflowY: 'auto' as const
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        height: '100vh',
        overflow: 'hidden' as const
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <LandingHeader
                    onAboutClick={handleAboutClick}
                    onFeaturesClick={handleFeaturesClick}
                    onHomeClick={handleHomeClick}
                    onLogin={handleLoginClick}
                />
            </div>
            <main style={mainStyle}>
                <div ref={welcomeRef}>
                    <WelcomePage />
                </div>
                <div ref={introduceRef}>
                    <IntroducePage />
                </div>
                <div ref={infoRef}>
                    <InfoAppPage />
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
