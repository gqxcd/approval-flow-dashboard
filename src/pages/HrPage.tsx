
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { fetchHrTasks, HrTask } from '@/data/mockHrTasks';

const HrPage = () => {
  const [hrTasks, setHrTasks] = useState<HrTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        console.log('Loading HR tasks...');
        
        const hrData = await fetchHrTasks();
        
        setHrTasks(hrData);
        console.log('HR tasks loaded successfully:', hrData.length, 'tasks');
      } catch (error) {
        console.error('Error loading HR tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">HR Tasks</h1>
          <p className="text-slate-500">Manage human resources tasks and processes</p>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-slate-500">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">HR Tasks</h1>
        <p className="text-slate-500">Manage human resources tasks and processes</p>
      </div>
      
      <div className="space-y-6">
        <div className="text-sm text-slate-500">
          {hrTasks.length} task{hrTasks.length !== 1 ? 's' : ''} found
        </div>
        
        <div className="grid gap-4">
          {hrTasks.map((task) => (
            <div key={task.id} className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{task.title}</h3>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    {task.taskType}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                    task.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {task.status}
                  </span>
                </div>
              </div>
              <p className="text-slate-600 mb-4">{task.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">Requested by:</span>
                  <div className="font-medium">{task.requestedBy}</div>
                </div>
                <div>
                  <span className="text-slate-500">Assigned to:</span>
                  <div className="font-medium">{task.assignedTo}</div>
                </div>
                <div>
                  <span className="text-slate-500">Due date:</span>
                  <div className="font-medium">{task.dueDate}</div>
                </div>
                <div>
                  <span className="text-slate-500">Department:</span>
                  <div className="font-medium">{task.department}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default HrPage;
