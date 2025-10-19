import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { navItems } from "@/types";

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <Card className="p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <h3 className="font-semibold text-gray-700 mb-2 sm:mb-0 sm:mr-4 flex items-center">
          Automata Theory:
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
          >
            <Button
              variant={location.pathname === item.path ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              {item.label}
            </Button>
          </Link>
        ))}
      </div>
    </Card>
  )
}
