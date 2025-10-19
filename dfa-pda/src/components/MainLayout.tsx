import { Navigation } from "@/components/Navigation";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <Navigation />
        <Outlet />
      </div>
    </div>
  )
}
