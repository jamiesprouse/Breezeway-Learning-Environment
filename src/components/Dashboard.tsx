import { CheckCircle, AlertCircle, Clock, Home } from 'lucide-react';

export function Dashboard() {
  const stats = [
    { label: 'Active Tasks', value: 12, icon: Clock, color: 'blue' },
    { label: 'Completed Today', value: 8, icon: CheckCircle, color: 'green' },
    { label: 'Urgent Items', value: 3, icon: AlertCircle, color: 'red' },
    { label: 'Properties', value: 24, icon: Home, color: 'purple' },
  ];

  const recentActivity = [
    { id: 1, type: 'Task Completed', property: 'Sunset Villa #301', time: '10 mins ago', status: 'completed' },
    { id: 2, type: 'Inspection Started', property: 'Ocean View Condo', time: '25 mins ago', status: 'in-progress' },
    { id: 3, type: 'Work Order Created', property: 'Mountain Lodge #12', time: '1 hour ago', status: 'pending' },
    { id: 4, type: 'Task Assigned', property: 'Beach House A', time: '2 hours ago', status: 'assigned' },
  ];

  const upcomingTasks = [
    { id: 1, title: 'Pre-Arrival Inspection', property: 'Sunset Villa #301', due: 'Today, 2:00 PM', priority: 'high' },
    { id: 2, title: 'Deep Cleaning', property: 'Ocean View Condo', due: 'Today, 4:30 PM', priority: 'medium' },
    { id: 3, title: 'Maintenance Check', property: 'Mountain Lodge #12', due: 'Tomorrow, 9:00 AM', priority: 'low' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Welcome back, Training User!</h1>
        <p className="text-gray-600">Here's what's happening with your properties today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            red: 'bg-red-100 text-red-600',
            purple: 'bg-purple-100 text-purple-600',
          }[stat.color];

          return (
            <div key={stat.label} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">{stat.label}</p>
                  <p className="text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-gray-900">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-900">{activity.type}</p>
                    <p className="text-gray-600">{activity.property}</p>
                  </div>
                  <span className="text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-gray-900">Upcoming Tasks</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingTasks.map((task) => {
              const priorityColors = {
                high: 'bg-red-100 text-red-700',
                medium: 'bg-yellow-100 text-yellow-700',
                low: 'bg-gray-100 text-gray-700',
              }[task.priority];

              return (
                <div key={task.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-gray-900">{task.title}</p>
                      <p className="text-gray-600">{task.property}</p>
                      <p className="text-gray-500">{task.due}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${priorityColors}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
