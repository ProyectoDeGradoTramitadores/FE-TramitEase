import { BrowserRouter, Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom';
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
import ReportsClientFolderPage from '../../pages/ReportsClientFOlder/ReportsClientFolderPage.tsx';
import RegisterPage from '../../pages/AuthentificationPage/RegisterPage.tsx';
import { AuthProvider } from '../../shared/context/AuthContext.tsx';
import ProtectedRoute from '../../shared/components/auth/ProtectedRoute.tsx';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../shared/services/firebase/firebaseService.ts';
import { useTramitadores } from '../../shared/hooks/useTramitadores.ts';

const Layout: React.FC = () => (
    <>
        <Header />
        <main>
            <Outlet />
        </main>
    </>
);

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { id } = useParams<{ id: string }>();
    const [userId, setUserId] = useState<string | null>(null);
    const {tramitadores} = useTramitadores();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            const tramitador = tramitadores.find(t => t.email === user?.email);
            setUserId(tramitador?.idTramitador ? String(tramitador?.idTramitador) : null);
        });
        return () => unsubscribe();
    }, []);

    if (userId && id !== userId) {
        return <Navigate to="/TramitEase/login" replace />;
    }

    return children;
};

const AppRoutes = () => (
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/TramitEase">
                    <Route index element={<LandingPage />} />
                    <Route path="login" element={ <LoginPage />} />
                    <Route path="Register" element={ <RegisterPage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="Tramitador" element={<Layout />}>
                            <Route path=":id" element={<PrivateRoute>
                                <Outlet />
                            </PrivateRoute>}>
                                <Route path={"perfil"} element={<UserProfile/>} />
                                <Route path={"reports"} element={<ReportsClientFolderPage/>} />
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
                </Route>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);

export default AppRoutes;
