
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import RecertificationTasksView from '@/components/recertification/RecertificationTasksView';

const RecertificationPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Re-certification</h1>
          <p className="text-slate-500">Review and approve group re-certification requests</p>
        </div>

        <RecertificationTasksView />
      </div>
    </MainLayout>
  );
};

export default RecertificationPage;
