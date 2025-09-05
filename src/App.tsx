import DigitalClock from "./DigitalClock.tsx";
import TodoList from "./TodoList.jsx";
import HistoryView from "./HistoryView.jsx";
import { useState } from "react";

function App() {
    const [currentView, setCurrentView] = useState('tasks');

    return (
        <div className="app">
            <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
                {/* Clock */}
                <div className="flex justify-center mb-6">
                    <DigitalClock />
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        onClick={() => setCurrentView('tasks')}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                            currentView === 'tasks'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Task List
                    </button>
                    <button
                        onClick={() => setCurrentView('history')}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                            currentView === 'history'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        History
                    </button>
                </div>

                {/* Content area */}
                {currentView === 'tasks' ? <TodoList /> : <HistoryView />}
            </div>
        </div>
    );
}

export default App;