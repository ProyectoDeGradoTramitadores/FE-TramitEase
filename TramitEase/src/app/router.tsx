import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import LandingPage from "../pages/landingPage/LandingPage.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/TramitEase">
            <Route index element={<LandingPage />} />
        </Route>,
    ),
);

export default router;