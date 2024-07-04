import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import LandingPage from "../pages/landingPage/LandingPage.tsx";
import ClientsFolderPage from "../pages/clientsFolderPage/ClientsFolderPage.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/TramitEase">
            <Route index element={<LandingPage />} />
            <Route path="ClientsFolder">
                <Route index element={<ClientsFolderPage />} />
            </Route>
        </Route>
    ),
);

export default router;
 router;