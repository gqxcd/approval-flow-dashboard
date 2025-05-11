
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  FileText, 
  Settings, 
  Users, 
  Calendar, 
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from 'react';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
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
        {!collapsed && <h2 className="text-xl font-bold">Dashboard</h2>}
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
          {[
            { icon: Home, label: "Dashboard", active: true },
            { icon: FileText, label: "Approvals", active: false },
            { icon: Users, label: "Team", active: false },
            { icon: Calendar, label: "Calendar", active: false },
            { icon: Settings, label: "Settings", active: false },
          ].map((item, index) => (
            <li key={index}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start px-3 py-2 h-10",
                  collapsed ? "justify-center" : "",
                  item.active && "bg-slate-200 text-slate-900"
                )}
              >
                <item.icon size={20} className={collapsed ? "mx-auto" : "mr-2"} />
                {!collapsed && <span>{item.label}</span>}
              </Button>
            </li>
          ))}
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
