import { useState } from 'react';
import { Search, Filter, Plus, CheckCircle, Clock, AlertCircle, User } from 'lucide-react';
import { TaskDetailsModal } from './TaskDetailsModal';

export interface Task {
  id: number;
  title: string;
  property: string;
  assignee: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  category: string;
  description: string;
}

export function TasksView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const tasks: Task[] = [
    {
      id: 1,
      title: 'Pre-Arrival Inspection',
      property: 'Sunset Villa #301',
      assignee: 'Sarah Johnson',
      status: 'pending',
      priority: 'high',
      dueDate: 'Today, 2:00 PM',
      category: 'Inspection',
      description: 'Complete pre-arrival inspection before guest check-in. Verify all amenities are working and the property is clean.',
    },
    {
      id: 2,
      title: 'Deep Cleaning',
      property: 'Ocean View Condo',
      assignee: 'Mike Chen',
      status: 'in-progress',
      priority: 'medium',
      dueDate: 'Today, 4:30 PM',
      category: 'Cleaning',
      description: 'Full deep cleaning of the unit including kitchen, bathrooms, and all living spaces.',
    },
    {
      id: 3,
      title: 'HVAC Filter Replacement',
      property: 'Mountain Lodge #12',
      assignee: 'Tom Davis',
      status: 'pending',
      priority: 'medium',
      dueDate: 'Tomorrow, 9:00 AM',
      category: 'Maintenance',
      description: 'Replace HVAC filters in all units. Check system operation after replacement.',
    },
    {
      id: 4,
      title: 'Pool Maintenance',
      property: 'Beach House A',
      assignee: 'Sarah Johnson',
      status: 'completed',
      priority: 'low',
      dueDate: 'Yesterday, 10:00 AM',
      category: 'Maintenance',
      description: 'Weekly pool cleaning and chemical balance check.',
    },
    {
      id: 5,
      title: 'Linen Inventory Check',
      property: 'Downtown Loft #5',
      assignee: 'Mike Chen',
      status: 'overdue',
      priority: 'high',
      dueDate: 'Yesterday, 3:00 PM',
      category: 'Inventory',
      description: 'Count and verify all linens. Order replacements if needed.',
    },
    {
      id: 6,
      title: 'Mid-Stay Cleaning',
      property: 'Garden Suite #8',
      assignee: 'Tom Davis',
      status: 'in-progress',
      priority: 'medium',
      dueDate: 'Today, 11:00 AM',
      category: 'Cleaning',
      description: 'Mid-stay refresh for extended guest. Change linens and restock supplies.',
    },
  ];

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.property.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: Task['status']) => {
    const styles = {
      pending: 'bg-gray-100 text-gray-700',
      'in-progress': 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      overdue: 'bg-red-100 text-red-700',
    }[status];

    return (
      <span className={`px-2 py-1 rounded text-xs ${styles}`}>
        {status.replace('-', ' ')}
      </span>
    );
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    const styles = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-red-100 text-red-700',
    }[priority];

    return (
      <span className={`px-2 py-1 rounded text-xs ${styles}`}>
        {priority}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Tasks & Work Orders</h1>
          <p className="text-gray-600">Manage and track all property tasks</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Task</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks or properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Task</th>
                <th className="px-6 py-3 text-left text-gray-700">Property</th>
                <th className="px-6 py-3 text-left text-gray-700">Assignee</th>
                <th className="px-6 py-3 text-left text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-gray-700">Priority</th>
                <th className="px-6 py-3 text-left text-gray-700">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <tr
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(task.status)}
                      <div>
                        <p className="text-gray-900">{task.title}</p>
                        <p className="text-gray-600">{task.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{task.property}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{task.assignee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(task.status)}</td>
                  <td className="px-6 py-4">{getPriorityBadge(task.priority)}</td>
                  <td className="px-6 py-4 text-gray-900">{task.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}
