
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTpcTasks } from '@/data/mockTpcTasks';
import { Button } from "@/components/ui/button";
import { Grid, List } from 'lucide-react';
import TpcTasksTableView from './TpcTasksTableView';
import TpcTasksCardView from './TpcTasksCardView';

const TpcTasksWrapper = () => {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tpcTasks'],
    queryFn: fetchTpcTasks,
  });

  const handleSelectTask = (taskId: string, checked: boolean) => {
    setSelectedTasks(prev => 
      checked 
        ? [...prev, taskId]
        : prev.filter(id => id !== taskId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    const pendingTasks = tasks.filter(task => task.status === 'pending');
    setSelectedTasks(checked ? pendingTasks.map(task => task.id) : []);
  };

  if (isLoading) {
    return <div className="p-4">Loading TPC tasks...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error loading TPC tasks</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            <List size={16} className="mr-1" />
            Table
          </Button>
          <Button
            variant={viewMode === 'card' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('card')}
          >
            <Grid size={16} className="mr-1" />
            Cards
          </Button>
        </div>
        {selectedTasks.length > 0 && (
          <div className="text-sm text-slate-600">
            {selectedTasks.length} task(s) selected
          </div>
        )}
      </div>

      {viewMode === 'table' ? (
        <TpcTasksTableView 
          tasks={tasks}
          selectedTasks={selectedTasks}
          onSelectTask={handleSelectTask}
          onSelectAll={handleSelectAll}
        />
      ) : (
        <TpcTasksCardView 
          tasks={tasks}
          selectedTasks={selectedTasks}
          onSelectTask={handleSelectTask}
        />
      )}
    </div>
  );
};

export default TpcTasksWrapper;
