import { useState } from 'react';
import { X, CheckSquare, Square, Camera, AlertCircle } from 'lucide-react';

interface InspectionModalProps {
  inspection: {
    id: number;
    type: string;
    property: string;
    status: string;
    date: string;
    inspector: string;
  };
  onClose: () => void;
}

interface ChecklistItem {
  id: number;
  category: string;
  item: string;
  checked: boolean;
  requiresPhoto: boolean;
  hasIssue: boolean;
}

export function InspectionModal({ inspection, onClose }: InspectionModalProps) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: 1, category: 'Kitchen', item: 'Appliances clean and functioning', checked: true, requiresPhoto: false, hasIssue: false },
    { id: 2, category: 'Kitchen', item: 'Refrigerator stocked with welcome items', checked: true, requiresPhoto: false, hasIssue: false },
    { id: 3, category: 'Kitchen', item: 'All dishes and utensils present', checked: false, requiresPhoto: false, hasIssue: false },
    { id: 4, category: 'Living Room', item: 'Furniture in good condition', checked: false, requiresPhoto: false, hasIssue: false },
    { id: 5, category: 'Living Room', item: 'TV and remotes working', checked: false, requiresPhoto: true, hasIssue: false },
    { id: 6, category: 'Bedrooms', item: 'Beds made with fresh linens', checked: false, requiresPhoto: false, hasIssue: false },
    { id: 7, category: 'Bedrooms', item: 'Closets empty and clean', checked: false, requiresPhoto: false, hasIssue: false },
    { id: 8, category: 'Bathrooms', item: 'Toiletries stocked', checked: false, requiresPhoto: false, hasIssue: false },
    { id: 9, category: 'Bathrooms', item: 'No plumbing issues', checked: false, requiresPhoto: false, hasIssue: true },
    { id: 10, category: 'General', item: 'HVAC functioning properly', checked: false, requiresPhoto: false, hasIssue: false },
  ]);

  const toggleCheck = (id: number) => {
    setChecklist(checklist.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const categories = Array.from(new Set(checklist.map(item => item.category)));
  const completedCount = checklist.filter(item => item.checked).length;
  const completionPercentage = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-gray-900">{inspection.type}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-between text-gray-600">
            <span>{inspection.property}</span>
            <span>{inspection.date}</span>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700">Progress</span>
              <span className="text-gray-900">
                {completedCount} of {checklist.length} items ({completionPercentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-gray-900 mb-3">{category}</h3>
              <div className="space-y-2">
                {checklist
                  .filter(item => item.category === category)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <button
                        onClick={() => toggleCheck(item.id)}
                        className="mt-0.5 flex-shrink-0"
                      >
                        {item.checked ? (
                          <CheckSquare className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      
                      <div className="flex-1">
                        <p className={`text-gray-900 ${item.checked ? 'line-through' : ''}`}>
                          {item.item}
                        </p>
                        {item.hasIssue && (
                          <div className="flex items-center gap-2 mt-1 text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            <span>Issue reported</span>
                          </div>
                        )}
                      </div>

                      {item.requiresPhoto && (
                        <button className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                          <Camera className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-700">Photo</span>
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}

          {/* Notes Section */}
          <div>
            <h3 className="text-gray-900 mb-3">Notes</h3>
            <textarea
              placeholder="Add any additional notes about this inspection..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save & Continue
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Complete Inspection
          </button>
        </div>
      </div>
    </div>
  );
}
