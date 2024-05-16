import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage";
import IntroPage from "../pages/introPage";
import DailyPage from "../pages/dailyPage";
import OrganizePage from "../pages/organizePage";
import SchedulePage from "../pages/schedulePage";
import PlacesPage from "../pages/placesPage";
import TravelPage from "../pages/travelPage";
import Layout from "../components/Layout";

export default function RouterProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="create" element={<TravelPage />} />
        <Route path=":id/edit" element={<TravelPage />} />
        <Route element={<Layout />}>
          <Route path=":id/schedule" element={<SchedulePage />} />
          <Route path=":id/places" element={<PlacesPage />} />
          <Route path=":id/organize" element={<OrganizePage />} />
          <Route path=":id/day" element={<DailyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
