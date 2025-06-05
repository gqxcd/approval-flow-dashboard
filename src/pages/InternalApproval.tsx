
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TpcTasksTableView from '@/components/tpc/TpcTasksTableView';
import TpcTasksCardView from '@/components/tpc/TpcTasksCardView';
import RecertificationTasksView from '@/components/recertification/RecertificationTasksView';

const InternalApproval = () => {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Internal Approval</h1>
          <p className="text-slate-500">Review and approve internal requests</p>
        </div>

        <Tabs defaultValue="tpc" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tpc">TPC</TabsTrigger>
            <TabsTrigger value="recertification">Re-certification</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tpc" className="space-y-4">
            {viewMode === 'table' ? (
              <TpcTasksTableView onViewModeChange={setViewMode} />
            ) : (
              <TpcTasksCardView onViewModeChange={setViewMode} />
            )}
          </TabsContent>
          
          <TabsContent value="recertification" className="space-y-4">
            <RecertificationTasksView />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default InternalApproval;
