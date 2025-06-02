
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  FileText, 
  Users, 
  Calendar, 
  ChevronLeft,
  ChevronRight,
  Bot
} from "lucide-react";
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>("allrequests");
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleSubmenu = (menu: string) => {
    if (activeSubmenu === menu) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(menu);
    }
  };

  return (
    <div
      className={cn(
        "h-screen bg-slate-50 border-r border-slate-200 transition-all duration-300 flex flex-col",
        collapsed ? "w-[70px]" : "w-[240px]",
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        {!collapsed && <h2 className="text-xl font-bold">All Requests</h2>}
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("ml-auto", collapsed && "mx-auto")}
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          <li>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start px-3 py-2 h-10",
                collapsed ? "justify-center" : "",
                activeSubmenu === "allrequests" && "bg-slate-200 text-slate-900"
              )}
              onClick={() => toggleSubmenu("allrequests")}
              asChild={!activeSubmenu}
            >
              {activeSubmenu !== "allrequests" ? (
                <Link to="/">
                  <FileText size={20} className={collapsed ? "mx-auto" : "mr-2"} />
                  {!collapsed && <span>All Requests</span>}
                </Link>
              ) : (
                <>
                  <FileText size={20} className={collapsed ? "mx-auto" : "mr-2"} />
                  {!collapsed && <span>All Requests</span>}
                </>
              )}
            </Button>
            
            {!collapsed && activeSubmenu === "allrequests" && (
              <ul className="pl-8 mt-1 space-y-1">
                {[
                  { name: "HR", path: "/hr" },
                  { name: "MyIT", path: "/myit" },
                  { name: "Workday", path: "/workday" },
                  { name: "Internal Approval", path: "/internal-approval" }
                ].map((item, idx) => (
                  <li key={idx}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "w-full justify-start h-8 px-3 text-sm",
                        location.pathname === item.path && "bg-slate-200 text-slate-900"
                      )}
                      asChild
                    >
                      <Link to={item.path}>{item.name}</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start px-3 py-2 h-10",
                collapsed ? "justify-center" : "",
                location.pathname === "/policy-bot" && "bg-slate-200 text-slate-900"
              )}
              asChild
            >
              <Link to="/policy-bot">
                <Bot size={20} className={collapsed ? "mx-auto" : "mr-2"} />
                {!collapsed && <span>PolicyBot</span>}
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start px-3 py-2 h-10",
                collapsed ? "justify-center" : ""
              )}
              asChild
            >
              <Link to="/">
                <Users size={20} className={collapsed ? "mx-auto" : "mr-2"} />
                {!collapsed && <span>Team</span>}
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start px-3 py-2 h-10",
                collapsed ? "justify-center" : ""
              )}
              asChild
            >
              <Link to="/">
                <Calendar size={20} className={collapsed ? "mx-auto" : "mr-2"} />
                {!collapsed && <span>Calendar</span>}
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-200">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              JD
            </div>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-slate-500">Admin</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 rounded-full bg-blue-500 mx-auto flex items-center justify-center text-white font-medium">
            JD
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
