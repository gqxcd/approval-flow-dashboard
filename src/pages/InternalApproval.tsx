
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import TpcTasksWrapper from '@/components/tpc/TpcTasksWrapper';

const InternalApproval = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Internal Approval</h1>
          <p className="text-slate-500">Review and approve TPC requests</p>
        </div>

        <TpcTasksWrapper />
      </div>
    </MainLayout>
  );
};

export default InternalApproval;
