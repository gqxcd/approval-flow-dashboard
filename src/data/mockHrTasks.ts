export interface HrTask {
  id: string;
  taskType: 'Onboarding' | 'Performance Review' | 'Benefits Enrollment' | 'Policy Update' | 'Training' | 'Offboarding';
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  requestedBy: string;
  assignedTo: string;
  dateCreated: string;
  dueDate: string;
  department: string;
}

const mockHrTasksData: HrTask[] = [
  {
    id: 'HR-001',
    taskType: 'Onboarding',
    title: 'New Employee Onboarding - Sarah Johnson',
    description: 'Complete onboarding process for new Software Engineer starting Monday',
    priority: 'High',
    status: 'in-progress',
    requestedBy: 'Hiring Manager',
    assignedTo: 'HR Team',
    dateCreated: '2025-05-10',
    dueDate: '2025-05-15',
    department: 'Engineering'
  },
  {
    id: 'HR-002',
    taskType: 'Performance Review',
    title: 'Q2 Performance Reviews',
    description: 'Conduct quarterly performance reviews for Marketing team',
    priority: 'Medium',
    status: 'pending',
    requestedBy: 'Marketing Director',
    assignedTo: 'HR Manager',
    dateCreated: '2025-05-08',
    dueDate: '2025-05-25',
    department: 'Marketing'
  },
  {
    id: 'HR-003',
    taskType: 'Benefits Enrollment',
    title: 'Health Insurance Enrollment',
    description: 'Process health insurance enrollment for new employees',
    priority: 'Medium',
    status: 'completed',
    requestedBy: 'Benefits Team',
    assignedTo: 'HR Coordinator',
    dateCreated: '2025-05-05',
    dueDate: '2025-05-12',
    department: 'HR'
  },
  {
    id: 'HR-004',
    taskType: 'Policy Update',
    title: 'Remote Work Policy Revision',
    description: 'Update remote work policy based on recent company changes',
    priority: 'Low',
    status: 'pending',
    requestedBy: 'Executive Team',
    assignedTo: 'HR Director',
    dateCreated: '2025-05-07',
    dueDate: '2025-05-30',
    department: 'HR'
  },
  {
    id: 'HR-005',
    taskType: 'Training',
    title: 'Diversity & Inclusion Workshop',
    description: 'Organize mandatory D&I training for all staff members',
    priority: 'High',
    status: 'in-progress',
    requestedBy: 'CEO',
    assignedTo: 'Training Team',
    dateCreated: '2025-05-09',
    dueDate: '2025-05-20',
    department: 'All Departments'
  },
  {
    id: 'HR-006',
    taskType: 'Offboarding',
    title: 'Employee Exit Process - Mike Chen',
    description: 'Complete offboarding checklist for departing employee',
    priority: 'Medium',
    status: 'in-progress',
    requestedBy: 'Department Manager',
    assignedTo: 'HR Specialist',
    dateCreated: '2025-05-11',
    dueDate: '2025-05-18',
    department: 'Sales'
  }
];

// Simulate API call with async/await
export const fetchHrTasks = async (): Promise<HrTask[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  console.log('Fetching HR tasks from mock API...');
  return mockHrTasksData;
};

// Keep the original export for backward compatibility
export const mockHrTasks = mockHrTasksData;
