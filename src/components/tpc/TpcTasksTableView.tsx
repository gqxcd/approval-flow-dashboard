
import React from 'react';
import { TpcTask } from '@/pages/InternalApproval';
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
import { Check, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TpcTasksTableViewProps {
  tasks: TpcTask[];
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

const TpcTasksTableView = ({ tasks }: TpcTasksTableViewProps) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Type</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Requested Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Suggestion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => {
            const ActionIcon = actionConfig[task.action].icon;
            const { color, label } = statusConfig[task.status];
            
            return (
              <TableRow key={task.id}>
                <TableCell>{task.productType}</TableCell>
                <TableCell className="font-medium">{task.productName}</TableCell>
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
                  {task.status === 'pending' ? (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <X size={16} /> <span className="sr-only">Decline</span>
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check size={16} /> <span className="sr-only">Approve</span>
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TpcTasksTableView;
