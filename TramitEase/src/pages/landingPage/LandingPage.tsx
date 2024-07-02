import React from 'react';
import WelcomePage from "../../features/Landing/WelcomePage.tsx";
import IntroducePage from "../../features/Landing/IntroducePage.tsx";

const LandingPage: React.FC = () => {
    return (
        <div>
            <main>
                <WelcomePage/>
                <IntroducePage/>
            </main>
            <footer>
            </footer>
        </div>
    );
};

export default LandingPage;
