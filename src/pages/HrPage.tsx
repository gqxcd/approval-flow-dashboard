import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { fetchHrTasks, HrTask } from '@/data/mockHrTasks';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, X, Eye } from 'lucide-react';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const HrPage = () => {
  const [hrTasks, setHrTasks] = useState<HrTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<HrTask | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        console.log('Loading HR tasks...');
        
        const hrData = await fetchHrTasks();
        
        setHrTasks(hrData);
        console.log('HR tasks loaded successfully:', hrData.length, 'tasks');
      } catch (error) {
        console.error('Error loading HR tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleSelectTask = (taskId: string, checked: boolean) => {
    setSelectedTasks(prev => 
      checked 
        ? [...prev, taskId]
        : prev.filter(id => id !== taskId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    const approvableRejectableTasks = hrTasks.filter(task => 
      task.status === 'pending' || task.status === 'in-progress'
    );
    setSelectedTasks(checked ? approvableRejectableTasks.map(task => task.id) : []);
  };

  const handleApprove = (taskId: string) => {
    setHrTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'completed' as const } : task
    ));
    toast('Task approved successfully');
  };

  const handleReject = (taskId: string) => {
    setHrTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'rejected' as const } : task
    ));
    toast('Task rejected');
  };

  const handleBulkApprove = () => {
    if (selectedTasks.length === 0) return;
    
    setHrTasks(prev => prev.map(task => 
      selectedTasks.includes(task.id) ? { ...task, status: 'completed' as const } : task
    ));
    toast(`${selectedTasks.length} task(s) approved successfully`);
    setSelectedTasks([]);
  };

  const handleBulkReject = () => {
    if (selectedTasks.length === 0) return;
    
    setHrTasks(prev => prev.map(task => 
      selectedTasks.includes(task.id) ? { ...task, status: 'rejected' as const } : task
    ));
    toast(`${selectedTasks.length} task(s) rejected`);
    setSelectedTasks([]);
  };

  const handleViewDetails = (task: HrTask) => {
    setSelectedTask(task);
    setSheetOpen(true);
  };

  const approvableRejectableTasks = hrTasks.filter(task => 
    task.status === 'pending' || task.status === 'in-progress'
  );
  const allSelected = approvableRejectableTasks.length > 0 && 
    approvableRejectableTasks.every(task => selectedTasks.includes(task.id));

  if (isLoading) {
    return (
      <MainLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">HR Tasks</h1>
          <p className="text-slate-500">Manage human resources tasks and processes</p>
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
        <h1 className="text-2xl font-bold">HR Tasks</h1>
        <p className="text-slate-500">Manage human resources tasks and processes</p>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox 
                checked={allSelected} 
                onCheckedChange={handleSelectAll}
                disabled={approvableRejectableTasks.length === 0}
              />
              <span className="text-sm text-slate-500">
                {hrTasks.length} task{hrTasks.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
          
          {selectedTasks.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="text-sm text-slate-600">
                {selectedTasks.length} task(s) selected
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={handleBulkReject}
              >
                <X size={16} className="mr-1" />
                Reject Selected
              </Button>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={handleBulkApprove}
              >
                <Check size={16} className="mr-1" />
                Approve Selected
              </Button>
            </div>
          )}
        </div>
        
        <div className="grid gap-4">
          {hrTasks.map((task) => {
            const canApproveReject = task.status === 'pending' || task.status === 'in-progress';
            
            return (
              <div key={task.id} className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      checked={selectedTasks.includes(task.id)} 
                      onCheckedChange={(checked) => handleSelectTask(task.id, !!checked)}
                      disabled={!canApproveReject}
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{task.title}</h3>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                        {task.taskType}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                      task.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                      task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      task.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">{task.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-slate-500">Requested by:</span>
                    <div className="font-medium">{task.requestedBy}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Assigned to:</span>
                    <div className="font-medium">{task.assignedTo}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Due date:</span>
                    <div className="font-medium">{task.dueDate}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Department:</span>
                    <div className="font-medium">{task.department}</div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(task)}
                  >
                    <Eye size={16} className="mr-1" /> Details
                  </Button>
                  {canApproveReject && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => handleReject(task.id)}
                      >
                        <X size={16} className="mr-1" /> Reject
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(task.id)}
                      >
                        <Check size={16} className="mr-1" /> Approve
                      </Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        {selectedTask && (
          <SheetContent className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-xl">{selectedTask.title}</SheetTitle>
              <SheetDescription>
                {selectedTask.taskType} • Task ID: {selectedTask.id}
              </SheetDescription>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-medium text-lg mb-3">Task Details</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm text-slate-500">Task Type:</span>
                    <span className="text-sm font-medium">{selectedTask.taskType}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm text-slate-500">Priority:</span>
                    <span className={`text-sm font-medium ${
                      selectedTask.priority === 'Critical' ? 'text-red-600' :
                      selectedTask.priority === 'High' ? 'text-orange-600' :
                      selectedTask.priority === 'Medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {selectedTask.priority}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm text-slate-500">Status:</span>
                    <span className="text-sm font-medium">{selectedTask.status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm text-slate-500">Requested by:</span>
                    <span className="text-sm font-medium">{selectedTask.requestedBy}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm text-slate-500">Assigned to:</span>
                    <span className="text-sm font-medium">{selectedTask.assignedTo}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm text-slate-500">Due date:</span>
                    <span className="text-sm font-medium">{selectedTask.dueDate}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm text-slate-500">Department:</span>
                    <span className="text-sm font-medium">{selectedTask.department}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-medium text-lg mb-3">Description</h3>
                <p className="text-sm text-slate-600">{selectedTask.description}</p>
              </div>
            </div>
            
            {(selectedTask.status === 'pending' || selectedTask.status === 'in-progress') && (
              <div className="flex justify-between gap-3 mt-4 border-t pt-4">
                <Button 
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 flex-1"
                  onClick={() => {
                    handleReject(selectedTask.id);
                    setSheetOpen(false);
                  }}
                >
                  <X size={16} className="mr-2" /> Reject
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700 flex-1"
                  onClick={() => {
                    handleApprove(selectedTask.id);
                    setSheetOpen(false);
                  }}
                >
                  <Check size={16} className="mr-2" /> Approve
                </Button>
              </div>
            )}
          </SheetContent>
        )}
      </Sheet>
    </MainLayout>
  );
};

export default HrPage;
