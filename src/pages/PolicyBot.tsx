
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PolicyBot from '@/components/policy/PolicyBot';

const PolicyBotPage = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">PolicyBot</h1>
        <p className="text-slate-500">AI assistant for trading rules and compliance guidance</p>
      </div>
      
      <PolicyBot />
    </MainLayout>
  );
};

export default PolicyBotPage;
