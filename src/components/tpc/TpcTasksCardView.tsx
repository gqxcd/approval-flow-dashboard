
import React from 'react';
import { TpcTask } from '@/pages/InternalApproval';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

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

const TpcTasksCardView = ({ tasks, selectedTasks, onSelectTask }: TpcTasksCardViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => {
        const ActionIcon = actionConfig[task.action].icon;
        const { color, label } = statusConfig[task.status];
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
                <h3 className="text-lg font-semibold">{task.productName}</h3>
                <div className="flex items-center mt-1 text-sm">
                  <ActionIcon className={cn("mr-1", actionConfig[task.action].color)} size={16} />
                  <span className={actionConfig[task.action].color}>{task.action}</span>
                  <span className="mx-2">•</span>
                  <span>{task.quantity} units</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">
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
                    <X size={16} className="mr-1" /> Decline
                  </Button>
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Check size={16} className="mr-1" /> Approve
                  </Button>
                </div>
              ) : (
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default TpcTasksCardView;
