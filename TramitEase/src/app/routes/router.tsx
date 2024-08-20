import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import LandingPage from '../../pages/landingPage/LandingPage.tsx';
import ClientsFolderPage from '../../pages/clientsFolderPage/ClientsFolderPage.tsx';
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react/ui';
import * as reactRouterDom from 'react-router-dom';
import { ThirdPartyPreBuiltUI } from 'supertokens-auth-react/recipe/thirdparty/prebuiltui';
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui';
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import Header from '../../shared/components/header/Header.tsx';
import FormularyCreateClientFolderPage
    from '../../pages/formularyCreateClientFolderPage/FormularyCreateClientFolderPage.tsx';
import FormularyCreateFolderPage from '../../pages/formularyCreateClientFolderPage/FormularyCreateFolderPage.tsx';
import CalendarPage from '../../pages/calendarPage/CalendarPage.tsx';

const Layout: React.FC = () => (
    <>
        <Header />
        <main>
            <Outlet />
        </main>
    </>
);

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [ThirdPartyPreBuiltUI, EmailPasswordPreBuiltUI])}
            <Route path="/TramitEase">
                <Route index element={<LandingPage />} />
                <Route path="Tramitador" element={<Layout />}>
                    <Route path=":id">
                        <Route path="ClientsFolder" element={<ClientsFolderPage />} />
                        <Route path="Calendar" element={<CalendarPage />} />
                        <Route path="CreateClientFolder">
                            <Route path={"CreateClient"} element={<FormularyCreateClientFolderPage/>}/>
                            <Route path={":idClient/CreateFolder"} element={<FormularyCreateFolderPage/>}/>
                        </Route>
                    </Route>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
);

export default AppRoutes;
