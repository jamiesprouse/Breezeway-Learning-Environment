import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { TasksView } from './components/TasksView';
import { InspectionsView } from './components/InspectionsView';
import { PropertiesView } from './components/PropertiesView';
import { TrainingOverlay } from './components/TrainingOverlay';
import { Menu, X, BookOpen } from 'lucide-react';

type View = 'dashboard' | 'tasks' | 'inspections' | 'properties';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [showTraining, setShowTraining] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return <TasksView />;
      case 'inspections':
        return <InspectionsView />;
      case 'properties':
        return <PropertiesView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white">B</span>
              </div>
              <span className="text-gray-900">Breezeway Training</span>
            </div>
          </div>
          <button
            onClick={() => setShowTraining(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Training Mode</span>
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 mt-[57px] lg:mt-0`}
        >
          <nav className="p-4 space-y-2">
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setCurrentView('tasks');
                setMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentView === 'tasks'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Tasks & Work Orders
            </button>
            <button
              onClick={() => {
                setCurrentView('inspections');
                setMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentView === 'inspections'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Inspections
            </button>
            <button
              onClick={() => {
                setCurrentView('properties');
                setMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentView === 'properties'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Properties
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {renderView()}
        </main>
      </div>

      {/* Training Overlay */}
      {showTraining && (
        <TrainingOverlay
          currentView={currentView}
          onClose={() => setShowTraining(false)}
        />
      )}

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}
