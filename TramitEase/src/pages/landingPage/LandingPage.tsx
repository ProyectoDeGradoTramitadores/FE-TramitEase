import React, {useRef, useState} from 'react';
import WelcomePage from "../../features/Landing/WelcomePage.tsx";
import IntroducePage from "../../features/Landing/IntroducePage.tsx";
import LandingHeader from "../../features/Landing/LandingHeader.tsx";
import InfoAppPage from "../../features/Landing/InfoAppPage.tsx";

const LandingPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('welcome');
    const introduceRef = useRef<HTMLDivElement>(null);

    const handleAboutClick = () => {
        setCurrentPage('introduce');

        if (introduceRef.current) {
            introduceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        if (introduceRef.current) {
            introduceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleFeaturesClick = () => {
        setCurrentPage('info');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                <LandingHeader onAboutClick={handleAboutClick} onFeaturesClick={handleFeaturesClick}/>
            </div>
            <main style={mainStyle}>
                <WelcomePage/>
                <div ref={introduceRef}>
                    <IntroducePage/>
                </div>
                <InfoAppPage/>
            </main>
        </div>
    );
};

export default LandingPage;
