
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { cn } from '@/lib/utils';

export interface ApprovalItem {
  id: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected';
  requestor: {
    name: string;
    avatar: string;
  };
  department: string;
  date: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

interface ApprovalCardProps {
  approval: ApprovalItem;
}

const statusConfig = {
  pending: { color: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Pending' },
  approved: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Approved' },
  rejected: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Rejected' },
};

const priorityConfig = {
  low: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Low' },
  medium: { color: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Medium' },
  high: { color: 'bg-red-100 text-red-800 border-red-200', label: 'High' },
};

const ApprovalCard = ({ approval }: ApprovalCardProps) => {
  const { color, label } = statusConfig[approval.status];
  const priorityStyle = priorityConfig[approval.priority];
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-3 flex flex-row items-start justify-between">
        <div>
          <div className="flex items-center gap-4 mb-1">
            <Badge className={cn("font-medium", color)}>
              {label}
            </Badge>
            <Badge className={cn("font-medium", priorityStyle.color)}>
              {priorityStyle.label}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold">{approval.title}</h3>
          <p className="text-sm text-slate-500">
            {approval.department} · {approval.date}
          </p>
        </div>
        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
          {approval.requestor.avatar ? (
            <img src={approval.requestor.avatar} alt={approval.requestor.name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-slate-500 font-medium">{approval.requestor.name.charAt(0)}</span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-700">{approval.description}</p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <p className="text-sm font-medium">Requested by: {approval.requestor.name}</p>
        <div className="flex gap-2">
          {approval.status === 'pending' && (
            <>
              <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                <X size={16} className="mr-1" /> Reject
              </Button>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Check size={16} className="mr-1" /> Approve
              </Button>
            </>
          )}
          {(approval.status === 'approved' || approval.status === 'rejected') && (
            <Button size="sm" variant="outline">
              View Details
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ApprovalCard;
