
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ApprovalStats from '../components/dashboard/ApprovalStats';
import ApprovalList from '../components/approvals/ApprovalList';
import { ApprovalItem } from '../components/approvals/ApprovalCard';

const demoApprovals: ApprovalItem[] = [
  {
    id: '1',
    title: 'Marketing Budget Increase',
    status: 'pending',
    requestor: {
      name: 'Sarah Johnson',
      avatar: '',
    },
    department: 'Marketing',
    date: 'May 10, 2025',
    description: 'Request to increase Q2 marketing budget by 15% to support the new product launch campaign.',
    priority: 'high',
  },
  {
    id: '2',
    title: 'New Software Subscription',
    status: 'approved',
    requestor: {
      name: 'Michael Chen',
      avatar: '',
    },
    department: 'Engineering',
    date: 'May 9, 2025',
    description: 'Approval for new design software subscription for the product team - $1,200/year.',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Office Equipment Request',
    status: 'rejected',
    requestor: {
      name: 'Alex Rodriguez',
      avatar: '',
    },
    department: 'Operations',
    date: 'May 8, 2025',
    description: 'Request for 5 new ergonomic chairs for the customer support team.',
    priority: 'low',
  },
  {
    id: '4',
    title: 'Business Trip Approval',
    status: 'pending',
    requestor: {
      name: 'Taylor Wilson',
      avatar: '',
    },
    department: 'Sales',
    date: 'May 7, 2025',
    description: 'Approval needed for business trip to San Francisco for client meetings - $3,500 budget.',
    priority: 'medium',
  },
  {
    id: '5',
    title: 'Training Program Funding',
    status: 'approved',
    requestor: {
      name: 'Jordan Patel',
      avatar: '',
    },
    department: 'HR',
    date: 'May 6, 2025',
    description: 'Funding approval for team leadership training program - $8,000 total for 4 employees.',
    priority: 'medium',
  },
  {
    id: '6',
    title: 'New Hire Equipment',
    status: 'pending',
    requestor: {
      name: 'Riley Thompson',
      avatar: '',
    },
    department: 'IT',
    date: 'May 5, 2025',
    description: 'Equipment request for new developers starting next month - 2 laptops and peripherals.',
    priority: 'high',
  },
];

const Index = () => {
  return (
    <MainLayout>
      <DashboardHeader />
      <ApprovalStats />
      <ApprovalList approvals={demoApprovals} />
    </MainLayout>
  );
};

export default Index;
