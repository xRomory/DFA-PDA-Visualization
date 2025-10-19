import LandingPage from "@/pages/LandingPage";
import MainLayout from "@/components/MainLayout";
import PdaPage from "@/pages/PdaPage";
import NotFound from "@/pages/NotFound";

export const routes = [

  { 
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/pda", element: <PdaPage /> }
    ]
  },
  { path: "*", element: <NotFound /> }
]