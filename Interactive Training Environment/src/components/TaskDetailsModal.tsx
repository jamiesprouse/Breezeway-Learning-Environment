import { useState } from 'react';
import { X, Clock, User, MapPin, Tag, CheckCircle, MessageSquare } from 'lucide-react';
import { Task } from './TasksView';

interface TaskDetailsModalProps {
  task: Task;
  onClose: () => void;
}

export function TaskDetailsModal({ task, onClose }: TaskDetailsModalProps) {
  const [status, setStatus] = useState(task.status);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'Sarah Johnson', text: 'Starting this task now', time: '10 mins ago' },
  ]);

  const handleStatusChange = (newStatus: Task['status']) => {
    setStatus(newStatus);
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, user: 'Training User', text: comment, time: 'Just now' },
      ]);
      setComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-gray-900">Task Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title and Description */}
          <div>
            <h3 className="text-gray-900 mb-2">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-gray-500">Property</p>
                <p className="text-gray-900">{task.property}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-gray-500">Assignee</p>
                <p className="text-gray-900">{task.assignee}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-gray-500">Due Date</p>
                <p className="text-gray-900">{task.dueDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Tag className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-gray-500">Category</p>
                <p className="text-gray-900">{task.category}</p>
              </div>
            </div>
          </div>

          {/* Status Selector */}
          <div>
            <label className="block text-gray-700 mb-2">Update Status</label>
            <div className="flex flex-wrap gap-2">
              {(['pending', 'in-progress', 'completed', 'overdue'] as Task['status'][]).map((statusOption) => (
                <button
                  key={statusOption}
                  onClick={() => handleStatusChange(statusOption)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    status === statusOption
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {statusOption.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-gray-400" />
              <h4 className="text-gray-900">Comments</h4>
            </div>
            
            <div className="space-y-3 mb-4">
              {comments.map((c) => (
                <div key={c.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-900">{c.user}</span>
                    <span className="text-gray-500">{c.time}</span>
                  </div>
                  <p className="text-gray-700">{c.text}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
