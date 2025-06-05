
import React, { useState, useEffect } from 'react';
import { fetchRecertificationTasks, RecertificationTask } from '@/data/mockRecertificationTasks';
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

const RecertificationTasksView = () => {
  const [tasks, setTasks] = useState<RecertificationTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<RecertificationTask | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        console.log('Loading re-certification tasks...');
        
        const data = await fetchRecertificationTasks();
        
        setTasks(data);
        console.log('Re-certification tasks loaded successfully:', data.length, 'tasks');
      } catch (error) {
        console.error('Error loading re-certification tasks:', error);
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
    setSelectedTasks(checked ? tasks.map(task => task.id) : []);
  };

  const handleApprove = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast('Group approved successfully');
  };

  const handleReject = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast('Group rejected');
  };

  const handleBulkApprove = () => {
    if (selectedTasks.length === 0) return;
    
    setTasks(prev => prev.filter(task => !selectedTasks.includes(task.id)));
    toast(`${selectedTasks.length} group(s) approved successfully`);
    setSelectedTasks([]);
  };

  const handleBulkReject = () => {
    if (selectedTasks.length === 0) return;
    
    setTasks(prev => prev.filter(task => !selectedTasks.includes(task.id)));
    toast(`${selectedTasks.length} group(s) rejected`);
    setSelectedTasks([]);
  };

  const handleViewDetails = (task: RecertificationTask) => {
    setSelectedTask(task);
    setSheetOpen(true);
  };

  const allSelected = tasks.length > 0 && tasks.every(task => selectedTasks.includes(task.id));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-slate-500">Loading re-certification tasks...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox 
              checked={allSelected} 
              onCheckedChange={handleSelectAll}
              disabled={tasks.length === 0}
            />
            <span className="text-sm text-slate-500">
              {tasks.length} group{tasks.length !== 1 ? 's' : ''} pending re-certification
            </span>
          </div>
        </div>
        
        {selectedTasks.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="text-sm text-slate-600">
              {selectedTasks.length} group(s) selected
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
        {tasks.map((task) => (
          <div key={task.id} className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-start gap-3">
                <Checkbox 
                  checked={selectedTasks.includes(task.id)} 
                  onCheckedChange={(checked) => handleSelectTask(task.id, !!checked)} 
                />
                <div>
                  <h3 className="font-semibold text-lg">{task.groupName}</h3>
                  <p className="text-slate-600 text-sm">{task.groupSummary}</p>
                  <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                    task.groupClassification === 'PROD' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.groupClassification}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.suggestion === 'approval' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  Suggested: {task.suggestion === 'approval' ? 'Approve' : 'Reject'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
              <div>
                <span className="text-slate-500">Primary Owner:</span>
                <div className="font-medium">{task.primaryOwner}</div>
              </div>
              <div>
                <span className="text-slate-500">Secondary Owner:</span>
                <div className="font-medium">{task.secondaryOwner}</div>
              </div>
              <div>
                <span className="text-slate-500">Site:</span>
                <div className="font-medium">{task.primaryOwnerSite}, {task.primaryOwnerCountry}</div>
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
            </div>
          </div>
        ))}
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        {selectedTask && (
          <SheetContent className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-xl">{selectedTask.groupName}</SheetTitle>
              <SheetDescription>
                Re-certification Review • Group ID: {selectedTask.id}
              </SheetDescription>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-medium text-lg mb-3">Group Information</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-2">
                    <span className="text-sm text-slate-500">Group Summary:</span>
                    <span className="text-sm font-medium">{selectedTask.groupSummary}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm text-slate-500">Classification:</span>
                    <span className="text-sm font-medium">{selectedTask.groupClassification}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <span className="text-sm text-slate-500">Primary Owner:</span>
                    <span className="text-sm font-medium">{selectedTask.primaryOwner}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm text-slate-500">Secondary Owner:</span>
                    <span className="text-sm font-medium">{selectedTask.secondaryOwner}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm text-slate-500">Supervisor:</span>
                    <span className="text-sm font-medium">{selectedTask.primaryOwnerSupervisor}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm text-slate-500">Cost Center:</span>
                    <span className="text-sm font-medium">{selectedTask.primaryOwnerCostCenter}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-medium text-lg mb-3">Location Details</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-2">
                    <span className="text-sm text-slate-500">Office Building:</span>
                    <span className="text-sm font-medium">{selectedTask.primaryOwnerOfficeBuilding}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm text-slate-500">Phone:</span>
                    <span className="text-sm font-medium">{selectedTask.primaryOwnerPhone}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm text-slate-500">Site:</span>
                    <span className="text-sm font-medium">{selectedTask.primaryOwnerSite}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm text-slate-500">Country:</span>
                    <span className="text-sm font-medium">{selectedTask.primaryOwnerCountry}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-medium text-lg mb-3">AI Recommendation</h3>
                <div className={`text-sm font-medium ${
                  selectedTask.suggestion === 'approval' ? 'text-green-600' : 'text-red-600'
                }`}>
                  Suggested Action: {selectedTask.suggestion === 'approval' ? 'Approve' : 'Reject'}
                </div>
              </div>
            </div>
            
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
          </SheetContent>
        )}
      </Sheet>
    </div>
  );
};

export default RecertificationTasksView;
