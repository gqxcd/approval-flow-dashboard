
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">Approvals Dashboard</h1>
        <p className="text-slate-500">Manage and track approval requests</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" className="text-slate-700">
          Filter <ChevronDown size={16} className="ml-1" />
        </Button>
        <Button>
          <Plus size={16} className="mr-1" /> New Request
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
