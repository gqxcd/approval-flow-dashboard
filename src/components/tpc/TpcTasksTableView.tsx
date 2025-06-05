import React, { useState } from 'react';
import { TpcTask } from '@/types/tpc';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, X, ArrowRight, ArrowLeft, Info, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface TpcTasksTableViewProps {
  tasks: TpcTask[];
  selectedTasks: string[];
  onSelectTask: (taskId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
}

const actionConfig = {
  Buy: { icon: ArrowRight, color: 'text-green-600' },
  Sell: { icon: ArrowLeft, color: 'text-red-600' }
};

const statusConfig = {
  pending: { color: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Pending' },
  approved: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Approved' },
  rejected: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Rejected' },
};

const suggestionConfig = {
  approval: { 
    icon: Check, 
    color: 'text-green-600',
    label: '✅ Suggesting Approval',
    bgHover: 'hover:bg-green-50'
  },
  decline: { 
    icon: X, 
    color: 'text-red-600',
    label: '❌ Suggesting Decline',
    bgHover: 'hover:bg-red-50'
  }
};

const TpcTasksTableView = ({ tasks, selectedTasks, onSelectTask, onSelectAll }: TpcTasksTableViewProps) => {
  const [selectedTask, setSelectedTask] = useState<TpcTask | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const allPendingSelected = pendingTasks.length > 0 && pendingTasks.every(task => selectedTasks.includes(task.id));
  
  const handleViewTask = (task: TpcTask) => {
    setSelectedTask(task);
    setSheetOpen(true);
  };
  
  return (
    <TooltipProvider>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={allPendingSelected && pendingTasks.length > 0} 
                  onCheckedChange={onSelectAll}
                  disabled={pendingTasks.length === 0}
                />
              </TableHead>
              <TableHead>Product Type</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Requested Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Suggestion</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => {
              const ActionIcon = actionConfig[task.action].icon;
              const { color, label } = statusConfig[task.status];
              const suggestion = suggestionConfig[task.suggestion];
              const isPending = task.status === 'pending';
              
              return (
                <TableRow key={task.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedTasks.includes(task.id)} 
                      onCheckedChange={(checked) => onSelectTask(task.id, !!checked)}
                      disabled={!isPending}
                    />
                  </TableCell>
                  <TableCell>{task.productType}</TableCell>
                  <TableCell className="font-medium">
                    <Button 
                      variant="link" 
                      className="p-0 h-auto font-medium text-left justify-start cursor-pointer"
                      onClick={() => handleViewTask(task)}
                    >
                      <span className="truncate max-w-[150px] block">{task.productName}</span>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <ActionIcon className={actionConfig[task.action].color} size={16} />
                      <span className={cn("ml-1", actionConfig[task.action].color)}>
                        {task.action}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{task.quantity}</TableCell>
                  <TableCell>{new Date(task.requestedSubmitted).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={cn("font-medium", color)}>
                      {label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className={cn("flex items-center gap-1", suggestion.color, suggestion.bgHover, "rounded px-2 py-1 cursor-pointer")}>
                          {suggestion.label}
                          <Info size={14} className="ml-1" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p>{task.suggestionReason}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    {task.status === 'pending' ? (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <X size={16} /> <span className="hidden sm:inline">Decline</span>
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check size={16} /> <span className="hidden sm:inline">Approve</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewTask(task)}
                          className="sm:hidden"
                        >
                          <MoreHorizontal size={16} />
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewTask(task)}
                        className="cursor-pointer"
                      >
                        <span className="hidden sm:inline">View</span>
                        <MoreHorizontal size={16} className="sm:hidden" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        {selectedTask && (
          <SheetContent className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-xl">{selectedTask.productName}</SheetTitle>
              <SheetDescription>
                {selectedTask.productType} • Task ID: {selectedTask.id}
              </SheetDescription>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-medium text-lg mb-3 flex items-center">
                  <Badge className={cn("mr-2", statusConfig[selectedTask.status].color)}>
                    {statusConfig[selectedTask.status].label}
                  </Badge>
                  Request Details
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm text-slate-500">Product Type:</span>
                    <span className="text-sm font-medium">{selectedTask.productType}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm text-slate-500">Action:</span>
                    <div className="flex items-center">
                      {actionConfig[selectedTask.action].icon && (
                        selectedTask.action === 'Buy' ? (
                          <ArrowRight 
                            className={actionConfig[selectedTask.action].color} 
                            size={16} 
                          />
                        ) : (
                          <ArrowLeft 
                            className={actionConfig[selectedTask.action].color} 
                            size={16} 
                          />
                        )
                      )}
                      <span className={cn("ml-1 text-sm", actionConfig[selectedTask.action].color)}>
                        {selectedTask.action}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm text-slate-500">Quantity:</span>
                    <span className="text-sm font-medium">{selectedTask.quantity}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm text-slate-500">Date Submitted:</span>
                    <span className="text-sm font-medium">
                      {new Date(selectedTask.requestedSubmitted).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-medium text-lg mb-3">AI Suggestion</h3>
                <div className={cn("p-3 rounded-md border", selectedTask.suggestion === 'approval' ? "border-green-100 bg-green-50" : "border-red-100 bg-red-50")}>
                  <div className={cn("text-sm mb-2 font-medium", suggestionConfig[selectedTask.suggestion].color)}>
                    {suggestionConfig[selectedTask.suggestion].label}
                  </div>
                  <p className="text-sm text-slate-600">{selectedTask.suggestionReason}</p>
                </div>
              </div>
            </div>
            
            {selectedTask.status === 'pending' && (
              <div className="flex justify-between gap-3 mt-4 border-t pt-4">
                <Button 
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 flex-1"
                >
                  <X size={16} className="mr-2" /> Decline
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 flex-1">
                  <Check size={16} className="mr-2" /> Approve
                </Button>
              </div>
            )}
          </SheetContent>
        )}
      </Sheet>
    </TooltipProvider>
  );
};

export default TpcTasksTableView;
