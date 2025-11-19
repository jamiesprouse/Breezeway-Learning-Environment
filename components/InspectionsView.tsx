import { useState } from 'react';
import { ClipboardCheck, Plus, ChevronRight } from 'lucide-react';
import { InspectionModal } from './InspectionModal';

interface Inspection {
  id: number;
  type: string;
  property: string;
  status: 'pending' | 'in-progress' | 'completed';
  date: string;
  inspector: string;
  completionPercentage: number;
}

export function InspectionsView() {
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);

  const inspections: Inspection[] = [
    {
      id: 1,
      type: 'Pre-Arrival Inspection',
      property: 'Sunset Villa #301',
      status: 'pending',
      date: 'Today, 2:00 PM',
      inspector: 'Not Assigned',
      completionPercentage: 0,
    },
    {
      id: 2,
      type: 'Mid-Stay Check',
      property: 'Ocean View Condo',
      status: 'in-progress',
      date: 'Today, 10:30 AM',
      inspector: 'Sarah Johnson',
      completionPercentage: 65,
    },
    {
      id: 3,
      type: 'Post-Departure Inspection',
      property: 'Mountain Lodge #12',
      status: 'completed',
      date: 'Yesterday, 4:00 PM',
      inspector: 'Mike Chen',
      completionPercentage: 100,
    },
    {
      id: 4,
      type: 'Maintenance Inspection',
      property: 'Beach House A',
      status: 'completed',
      date: 'Yesterday, 11:00 AM',
      inspector: 'Tom Davis',
      completionPercentage: 100,
    },
    {
      id: 5,
      type: 'Pre-Arrival Inspection',
      property: 'Downtown Loft #5',
      status: 'pending',
      date: 'Tomorrow, 9:00 AM',
      inspector: 'Not Assigned',
      completionPercentage: 0,
    },
  ];

  const getStatusBadge = (status: Inspection['status']) => {
    const styles = {
      pending: 'bg-gray-100 text-gray-700',
      'in-progress': 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
    }[status];

    return (
      <span className={`px-2 py-1 rounded text-xs ${styles}`}>
        {status.replace('-', ' ')}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Inspections</h1>
          <p className="text-gray-600">Conduct property inspections and checklists</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Inspection</span>
        </button>
      </div>

      {/* Inspections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {inspections.map((inspection) => (
          <div
            key={inspection.id}
            onClick={() => setSelectedInspection(inspection)}
            className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <ClipboardCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-gray-900">{inspection.type}</h3>
                  <p className="text-gray-600">{inspection.property}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status</span>
                {getStatusBadge(inspection.status)}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Inspector</span>
                <span className="text-gray-900">{inspection.inspector}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Scheduled</span>
                <span className="text-gray-900">{inspection.date}</span>
              </div>

              {/* Progress Bar */}
              {inspection.status !== 'pending' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-gray-900">{inspection.completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${inspection.completionPercentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Inspection Modal */}
      {selectedInspection && (
        <InspectionModal
          inspection={selectedInspection}
          onClose={() => setSelectedInspection(null)}
        />
      )}
    </div>
  );
}
