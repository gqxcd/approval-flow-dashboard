export interface MyItTask {
  id: string;
  taskType: 'Software Request' | 'Hardware Request' | 'Access Request' | 'System Issue' | 'Training Request';
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  requestedBy: string;
  assignedTo: string;
  dateCreated: string;
  dueDate: string;
  estimatedHours: number;
}

const mockMyItTasksData: MyItTask[] = [
  {
    id: 'IT-001',
    taskType: 'Software Request',
    title: 'Install Adobe Creative Suite',
    description: 'Need Adobe Creative Suite for design work on marketing materials',
    priority: 'Medium',
    status: 'pending',
    requestedBy: 'John Smith',
    assignedTo: 'IT Support Team',
    dateCreated: '2025-05-10',
    dueDate: '2025-05-15',
    estimatedHours: 2
  },
  {
    id: 'IT-002',
    taskType: 'Hardware Request',
    title: 'Replace Laptop Battery',
    description: 'Laptop battery not holding charge, needs replacement',
    priority: 'High',
    status: 'in-progress',
    requestedBy: 'Sarah Wilson',
    assignedTo: 'Hardware Team',
    dateCreated: '2025-05-09',
    dueDate: '2025-05-12',
    estimatedHours: 1
  },
  {
    id: 'IT-003',
    taskType: 'Access Request',
    title: 'VPN Access for Remote Work',
    description: 'Employee needs VPN access to work from home',
    priority: 'Medium',
    status: 'completed',
    requestedBy: 'Mike Johnson',
    assignedTo: 'Network Team',
    dateCreated: '2025-05-08',
    dueDate: '2025-05-10',
    estimatedHours: 0.5
  },
  {
    id: 'IT-004',
    taskType: 'System Issue',
    title: 'Email Server Downtime',
    description: 'Email server experiencing intermittent outages',
    priority: 'Critical',
    status: 'in-progress',
    requestedBy: 'IT Operations',
    assignedTo: 'Server Team',
    dateCreated: '2025-05-11',
    dueDate: '2025-05-11',
    estimatedHours: 4
  },
  {
    id: 'IT-005',
    taskType: 'Training Request',
    title: 'Cybersecurity Training Session',
    description: 'Schedule mandatory cybersecurity training for all employees',
    priority: 'Medium',
    status: 'pending',
    requestedBy: 'HR Department',
    assignedTo: 'Training Team',
    dateCreated: '2025-05-07',
    dueDate: '2025-05-20',
    estimatedHours: 8
  },
  {
    id: 'IT-006',
    taskType: 'Software Request',
    title: 'Microsoft Office License',
    description: 'Need additional Microsoft Office license for new employee',
    priority: 'Low',
    status: 'pending',
    requestedBy: 'Emma Davis',
    assignedTo: 'Software Team',
    dateCreated: '2025-05-06',
    dueDate: '2025-05-13',
    estimatedHours: 1
  }
];

// Simulate API call with async/await
export const fetchMyItTasks = async (): Promise<MyItTask[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  console.log('Fetching myIT tasks from mock API...');
  return mockMyItTasksData;
};

// Keep the original export for backward compatibility
export const mockMyItTasks = mockMyItTasksData;
