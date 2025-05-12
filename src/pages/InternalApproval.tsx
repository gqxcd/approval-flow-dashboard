
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import TpcTasksCardView from '@/components/tpc/TpcTasksCardView';
import TpcTasksTableView from '@/components/tpc/TpcTasksTableView';
import { FileText, LayoutGrid } from 'lucide-react';

export interface TpcTask {
  id: string;
  productType: string;
  productName: string;
  action: 'Sell' | 'Buy';
  quantity: number;
  requestedSubmitted: string;
  status: 'pending' | 'approved' | 'rejected';
}

const InternalApproval = () => {
  const [viewType, setViewType] = useState<'card' | 'table'>('card');
  
  // Sample data for TPC tasks
  const tpcTasks: TpcTask[] = [
    {
      id: '1',
      productType: 'Equity',
      productName: 'AAPL',
      action: 'Buy',
      quantity: 100,
      requestedSubmitted: '2025-05-10',
      status: 'pending'
    },
    {
      id: '2',
      productType: 'Bond',
      productName: 'US Treasury 10Y',
      action: 'Sell',
      quantity: 50,
      requestedSubmitted: '2025-05-09',
      status: 'pending'
    },
    {
      id: '3',
      productType: 'ETF',
      productName: 'SPY',
      action: 'Buy',
      quantity: 25,
      requestedSubmitted: '2025-05-08',
      status: 'approved'
    },
    {
      id: '4',
      productType: 'Option',
      productName: 'TSLA Call $900',
      action: 'Sell',
      quantity: 10,
      requestedSubmitted: '2025-05-07',
      status: 'rejected'
    },
    {
      id: '5',
      productType: 'Future',
      productName: 'E-mini S&P 500',
      action: 'Buy',
      quantity: 5,
      requestedSubmitted: '2025-05-06',
      status: 'pending'
    },
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Internal Approval</h1>
        <p className="text-slate-500">Manage TPC task approvals</p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-slate-500">
          {tpcTasks.length} task{tpcTasks.length !== 1 ? 's' : ''} found
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={viewType === 'card' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewType('card')}
          >
            <LayoutGrid size={16} className="mr-2" />
            Card View
          </Button>
          <Button 
            variant={viewType === 'table' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewType('table')}
          >
            <FileText size={16} className="mr-2" />
            Table View
          </Button>
        </div>
      </div>
      
      {viewType === 'card' ? (
        <TpcTasksCardView tasks={tpcTasks} />
      ) : (
        <TpcTasksTableView tasks={tpcTasks} />
      )}
    </MainLayout>
  );
};

export default InternalApproval;
