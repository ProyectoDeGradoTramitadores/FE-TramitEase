import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import LandingPage from '../../pages/landingPage/LandingPage.tsx';
import ClientsFolderPage from '../../pages/clientsFolderPage/ClientsFolderPage.tsx';
import Header from '../../shared/components/header/Header.tsx';
import FormularyCreateClientFolderPage
    from '../../pages/formularyCreateClientFolderPage/FormularyCreateClientFolderPage.tsx';
import FormularyCreateFolderPage from '../../pages/formularyCreateClientFolderPage/FormularyCreateFolderPage.tsx';
import CalendarPage from '../../pages/calendarPage/CalendarPage.tsx';
import TramitsCustomPage from '../../pages/tramitsCustomPage/TramitsCustomPage.tsx';
import TramitViewPage from '../../pages/TramitPage/TramitViewPage.tsx';
import ProcedureViewPage from '../../pages/ProcedureViewPage/ProcedureViewPage.tsx';
import FormularyTramitCreatePage from '../../pages/formularyCreateTramitPage/FormularyTramitCreatePage.tsx';
import FormularyProcedureCreatePage from '../../pages/formularyCreateProcedurePage/FormularyProcedureCreatePage.tsx';
import ClientFolderPage from '../../pages/clientFolderPage/ClientFolderPage.tsx';
import UserProfile from '../../pages/UserProfile/UserProfile.tsx';
import LoginPage from '../../pages/AuthentificationPage/LoginPage.tsx';

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
            <Route path="/TramitEase">
                <Route index element={<LandingPage />} />
                <Route path="login" element={ <LoginPage />} />
                <Route path="Tramitador" element={<Layout />}>
                    <Route path=":id">
                        <Route path={"perfil"} element={<UserProfile/>} />
                        <Route path="ClientsFolder" element={<ClientsFolderPage />} />
                        <Route path="ClientsFolder/ClientFolder/:idClientFolder" element={<ClientFolderPage />} />
                        <Route path="Calendar" element={<CalendarPage />} />
                        <Route path={"Custom"}>
                            <Route path={"TramitsCustom"} element={<TramitsCustomPage />}/>
                            <Route path={"TramitsCustom/TramitViewPage/:idTramit"} element={<TramitViewPage />}/>
                            <Route path={"TramitsCustom/ProcedureViewPage/:idProcedure"} element={<ProcedureViewPage />}/>
                            <Route path={"TramitsCustom/TramitCreateNew"} element={<FormularyTramitCreatePage/> }/>
                            <Route path={"TramitsCustom/ProcedureCreateNew"} element={<FormularyProcedureCreatePage/> }/>
                            <Route path={"TramitsCustom/TramitEditPage/:idTramit"} element={<FormularyTramitCreatePage/> }/>
                            <Route path={"TramitsCustom/ProcedureEditPage/:idProcedure"} element={<FormularyProcedureCreatePage/> }/>
                        </Route>
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
