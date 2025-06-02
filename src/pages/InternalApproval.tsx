import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import TpcTasksCardView from '@/components/tpc/TpcTasksCardView';
import TpcTasksTableView from '@/components/tpc/TpcTasksTableView';
import { Check, FileText, LayoutGrid, X } from 'lucide-react';
import { toast } from 'sonner';
import { fetchTpcTasks } from '@/data/mockTpcTasks';

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
  const [tpcTasks, setTpcTasks] = useState<TpcTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data using async/await
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        console.log('Loading TPC tasks...');
        const tasks = await fetchTpcTasks();
        setTpcTasks(tasks);
        console.log('TPC tasks loaded successfully:', tasks.length, 'tasks');
      } catch (error) {
        console.error('Error loading TPC tasks:', error);
        toast('Failed to load tasks');
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

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

  if (isLoading) {
    return (
      <MainLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Internal Approval</h1>
          <p className="text-slate-500">Manage TPC task approvals</p>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-slate-500">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Internal Approval</h1>
        <p className="text-slate-500">Manage TPC task approvals</p>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
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
      </div>
    </MainLayout>
  );
};

export default InternalApproval;
