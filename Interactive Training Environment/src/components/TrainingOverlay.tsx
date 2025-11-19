import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, CheckCircle } from 'lucide-react';

interface TrainingOverlayProps {
  currentView: string;
  onClose: () => void;
}

interface TrainingStep {
  title: string;
  description: string;
  action?: string;
}

export function TrainingOverlay({ currentView, onClose }: TrainingOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const trainingContent: Record<string, TrainingStep[]> = {
    dashboard: [
      {
        title: 'Welcome to Breezeway Training!',
        description: 'This interactive training environment will help you learn how to manage properties, tasks, and inspections efficiently. Let\'s start with an overview of the Dashboard.',
      },
      {
        title: 'Dashboard Overview',
        description: 'The Dashboard provides a quick snapshot of your operations. You can see active tasks, completed items, urgent issues, and total properties at a glance.',
      },
      {
        title: 'Recent Activity',
        description: 'The Recent Activity section shows real-time updates on task completions, inspections, and work orders across all properties.',
      },
      {
        title: 'Upcoming Tasks',
        description: 'Keep track of what needs to be done next. Tasks are color-coded by priority: red for high, yellow for medium, and gray for low priority.',
        action: 'Try clicking on the "Tasks & Work Orders" menu to continue learning.',
      },
    ],
    tasks: [
      {
        title: 'Tasks & Work Orders',
        description: 'This is your command center for managing all property-related tasks. You can view, assign, and track the progress of every work order.',
      },
      {
        title: 'Search and Filter',
        description: 'Use the search bar to quickly find specific tasks or properties. Filter by status (Pending, In Progress, Completed, Overdue) to focus on what matters most.',
        action: 'Try searching for a property name or filtering by status.',
      },
      {
        title: 'Task Details',
        description: 'Click any task row to view detailed information including description, assignee, due date, and category.',
        action: 'Click on any task to open the detailed view.',
      },
      {
        title: 'Managing Tasks',
        description: 'In the task details modal, you can update the status, add comments for team communication, and track progress. This keeps everyone on the same page.',
      },
      {
        title: 'Status Updates',
        description: 'Change task status from Pending → In Progress → Completed. This creates a clear workflow and helps track team productivity.',
        action: 'Try the Inspections view to learn about property checks.',
      },
    ],
    inspections: [
      {
        title: 'Property Inspections',
        description: 'Inspections are crucial for maintaining property quality. Breezeway helps you conduct thorough, consistent inspections with customizable checklists.',
      },
      {
        title: 'Inspection Types',
        description: 'Common inspection types include Pre-Arrival (before guest check-in), Mid-Stay (during longer stays), Post-Departure (after checkout), and Maintenance (routine checks).',
      },
      {
        title: 'Interactive Checklists',
        description: 'Click on any inspection card to open the detailed checklist. You can check off items, add photos for documentation, and report issues.',
        action: 'Click on an inspection to see the full checklist.',
      },
      {
        title: 'Progress Tracking',
        description: 'The progress bar shows completion percentage. Items requiring photos are marked, and you can flag issues that need attention.',
      },
      {
        title: 'Completing Inspections',
        description: 'Add notes, document issues with photos, and complete the checklist. All data is saved for quality control and future reference.',
        action: 'Explore the Properties view to see your portfolio.',
      },
    ],
    properties: [
      {
        title: 'Property Management',
        description: 'The Properties view gives you an overview of your entire portfolio. Each card displays key information and current status.',
      },
      {
        title: 'Property Details',
        description: 'Each property shows its name, location, type, number of bedrooms, and guest capacity. Status badges indicate if it\'s available, occupied, or under maintenance.',
      },
      {
        title: 'Quick Search',
        description: 'Use the search bar to quickly find properties by name or address. This is especially useful when managing a large portfolio.',
        action: 'Try searching for a specific property.',
      },
      {
        title: 'Property Status',
        description: 'Green means Available, Blue means Occupied, and Yellow means Under Maintenance. This helps you quickly assess property availability.',
      },
      {
        title: 'Training Complete!',
        description: 'You now know the basics of Breezeway! Practice by exploring each section, creating tasks, completing inspections, and managing properties. The more you use it, the more efficient you\'ll become.',
        action: 'Close this training and start practicing!',
      },
    ],
  };

  const steps = trainingContent[currentView] || trainingContent.dashboard;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-gray-900">Training Mode</h2>
              <p className="text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-8 min-h-[300px]">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              {currentStep === steps.length - 1 ? (
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  {currentStep + 1}
                </div>
              )}
              <div>
                <h3 className="text-gray-900 mb-2">{steps[currentStep].title}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {steps[currentStep].description}
                </p>
              </div>
            </div>

            {steps[currentStep].action && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-900">
                  <strong>Try it:</strong> {steps[currentStep].action}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Start Practicing
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
