
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import TpcTasksCardView from '@/components/tpc/TpcTasksCardView';
import TpcTasksTableView from '@/components/tpc/TpcTasksTableView';
import { Check, FileText, LayoutGrid, X } from 'lucide-react';
import { toast } from 'sonner';

export interface TpcTask {
  id: string;
  productType: string;
  productName: string;
  action: 'Sell' | 'Buy';
  quantity: number;
  requestedSubmitted: string;
  status: 'pending' | 'approved' | 'rejected';
  suggestion: 'approval' | 'decline';
  suggestionReason: string;
}

const InternalApproval = () => {
  const [viewType, setViewType] = useState<'card' | 'table'>('card');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  
  // Sample data for TPC tasks
  const tpcTasks: TpcTask[] = [
    {
      id: '1',
      productType: 'Equity',
      productName: 'AAPL',
      action: 'Buy',
      quantity: 100,
      requestedSubmitted: '2025-05-10',
      status: 'pending',
      suggestion: 'approval',
      suggestionReason: 'Strong technical indicators and positive market sentiment for Apple.'
    },
    {
      id: '2',
      productType: 'Bond',
      productName: 'US Treasury 10Y',
      action: 'Sell',
      quantity: 50,
      requestedSubmitted: '2025-05-09',
      status: 'pending',
      suggestion: 'decline',
      suggestionReason: 'Rising interest rate environment suggests holding bonds longer would be more advantageous.'
    },
    {
      id: '3',
      productType: 'ETF',
      productName: 'SPY',
      action: 'Buy',
      quantity: 25,
      requestedSubmitted: '2025-05-08',
      status: 'approved',
      suggestion: 'approval',
      suggestionReason: 'Aligns with current portfolio diversification strategy and market outlook.'
    },
    {
      id: '4',
      productType: 'Option',
      productName: 'TSLA Call $900',
      action: 'Sell',
      quantity: 10,
      requestedSubmitted: '2025-05-07',
      status: 'rejected',
      suggestion: 'decline',
      suggestionReason: 'High volatility and recent price action suggest increased risk for this position.'
    },
    {
      id: '5',
      productType: 'Future',
      productName: 'E-mini S&P 500',
      action: 'Buy',
      quantity: 5,
      requestedSubmitted: '2025-05-06',
      status: 'pending',
      suggestion: 'approval',
      suggestionReason: 'Matches current market momentum and aligns with strategic asset allocation targets.'
    },
    {
      id: '6',
      productType: 'Forex',
      productName: 'EUR/USD Currency Pair',
      action: 'Sell',
      quantity: 75,
      requestedSubmitted: '2025-05-05',
      status: 'pending',
      suggestion: 'approval',
      suggestionReason: 'Expected divergence in monetary policy between ECB and Federal Reserve suggests potential for USD strength.'
    },
  ];

  const handleToggleSelectAll = (checked: boolean) => {
    if (checked) {
      // Only select pending tasks
      const pendingTaskIds = tpcTasks
        .filter(task => task.status === 'pending')
        .map(task => task.id);
      setSelectedTasks(pendingTaskIds);
    } else {
      setSelectedTasks([]);
    }
  };

  const handleToggleSelectTask = (taskId: string, checked: boolean) => {
    if (checked) {
      setSelectedTasks(prev => [...prev, taskId]);
    } else {
      setSelectedTasks(prev => prev.filter(id => id !== taskId));
    }
  };

  const handleBulkAction = (action: 'approve' | 'reject') => {
    if (selectedTasks.length === 0) {
      toast(`No tasks selected for ${action}`);
      return;
    }

    // In a real app, this would call an API to update the tasks
    toast(`${selectedTasks.length} tasks ${action === 'approve' ? 'approved' : 'rejected'}`);
    
    // Clear selections after action
    setSelectedTasks([]);
  };

  const isPendingSelected = selectedTasks.length > 0;

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Internal Approval</h1>
        <p className="text-slate-500">Manage TPC task approvals</p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-500">
            {tpcTasks.length} task{tpcTasks.length !== 1 ? 's' : ''} found
          </div>
          {isPendingSelected && (
            <div className="flex gap-2">
              <Button 
                size="sm"
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => handleBulkAction('reject')}
              >
                <X size={16} className="mr-1" /> <span className="hidden xs:inline">Reject</span> {selectedTasks.length}
              </Button>
              <Button 
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleBulkAction('approve')}
              >
                <Check size={16} className="mr-1" /> <span className="hidden xs:inline">Approve</span> {selectedTasks.length}
              </Button>
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={viewType === 'card' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewType('card')}
          >
            <LayoutGrid size={16} className="mr-2" />
            <span className="hidden sm:inline">Card View</span>
          </Button>
          <Button 
            variant={viewType === 'table' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewType('table')}
          >
            <FileText size={16} className="mr-2" />
            <span className="hidden sm:inline">Table View</span>
          </Button>
        </div>
      </div>
      
      {viewType === 'card' ? (
        <TpcTasksCardView 
          tasks={tpcTasks} 
          selectedTasks={selectedTasks}
          onSelectTask={handleToggleSelectTask}
        />
      ) : (
        <TpcTasksTableView 
          tasks={tpcTasks} 
          selectedTasks={selectedTasks}
          onSelectTask={handleToggleSelectTask}
          onSelectAll={handleToggleSelectAll}
        />
      )}
    </MainLayout>
  );
};

export default InternalApproval;
