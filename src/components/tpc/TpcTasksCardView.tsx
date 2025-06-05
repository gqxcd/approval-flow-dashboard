import React, { useState } from 'react';
import { TpcTask } from '@/types/tpc';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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

interface TpcTasksCardViewProps {
  tasks: TpcTask[];
  selectedTasks: string[];
  onSelectTask: (taskId: string, checked: boolean) => void;
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

const TpcTasksCardView = ({ tasks, selectedTasks, onSelectTask }: TpcTasksCardViewProps) => {
  const [selectedTask, setSelectedTask] = useState<TpcTask | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  
  const handleViewTask = (task: TpcTask) => {
    setSelectedTask(task);
    setSheetOpen(true);
  };
  
  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => {
          const ActionIcon = actionConfig[task.action].icon;
          const { color, label } = statusConfig[task.status];
          const suggestion = suggestionConfig[task.suggestion];
          const isPending = task.status === 'pending';
          
          return (
            <Card key={task.id} className="h-full overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {isPending && (
                      <Checkbox 
                        checked={selectedTasks.includes(task.id)} 
                        onCheckedChange={(checked) => onSelectTask(task.id, !!checked)} 
                      />
                    )}
                    <Badge className={cn("font-medium", color)}>
                      {label}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="font-medium">
                    {task.productType}
                  </Badge>
                </div>
                <div className="mt-2">
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-semibold text-lg justify-start text-left cursor-pointer"
                    onClick={() => handleViewTask(task)}
                  >
                    <span className="truncate max-w-full block">{task.productName}</span>
                  </Button>
                  <div className="flex items-center mt-1 text-sm">
                    <ActionIcon className={cn("mr-1", actionConfig[task.action].color)} size={16} />
                    <span className={actionConfig[task.action].color}>{task.action}</span>
                    <span className="mx-2">•</span>
                    <span>{task.quantity} units</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={cn("flex items-center gap-1 w-fit", suggestion.color, suggestion.bgHover, "rounded px-2 py-1 cursor-pointer text-sm")}>
                      {suggestion.label}
                      <Info size={14} className="ml-1" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p>{task.suggestionReason}</p>
                  </TooltipContent>
                </Tooltip>
                <p className="text-sm text-slate-500 mt-2">
                  Request submitted on {new Date(task.requestedSubmitted).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="border-t pt-4">
                {task.status === 'pending' ? (
                  <div className="flex gap-2 w-full">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <X size={16} className="mr-1" /> <span className="truncate">Decline</span>
                    </Button>
                    <Button 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Check size={16} className="mr-1" /> <span className="truncate">Approve</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewTask(task)}
                      className="md:hidden"
                    >
                      <MoreHorizontal size={16} />
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full cursor-pointer"
                    onClick={() => handleViewTask(task)}
                  >
                    <span className="truncate">View Details</span>
                    <MoreHorizontal size={16} className="ml-1 sm:hidden" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
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

export default TpcTasksCardView;
