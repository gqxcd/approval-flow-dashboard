
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Layers, CheckCircle, XCircle, Clock } from "lucide-react";

const statCards = [
  {
    title: 'Total Requests',
    value: '42',
    change: '+12% from last month',
    icon: Layers,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Approved',
    value: '28',
    change: '65% approval rate',
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Rejected',
    value: '8',
    change: '19% rejection rate',
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    title: 'Pending',
    value: '6',
    change: 'Average wait: 2 days',
    icon: Clock,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
];

const ApprovalStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ApprovalStats;
