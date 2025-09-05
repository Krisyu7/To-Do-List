import React, { useState, useEffect } from "react";

const HistoryView = () => {
    const [history, setHistory] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = () => {
        try {
            setIsLoading(true);
            const historyString = localStorage.getItem('taskHistory');
            const loadedHistory = historyString ? JSON.parse(historyString) : {};
            setHistory(loadedHistory);
        } catch (error) {
            console.error('Failed to load task history:', error);
            setHistory({});
        } finally {
            setIsLoading(false);
        }
    };

    const deleteTaskRecord = (date, taskIndex) => {
        try {
            const updatedHistory = { ...history };
            updatedHistory[date].splice(taskIndex, 1);

            if (updatedHistory[date].length === 0) {
                delete updatedHistory[date];
            }

            localStorage.setItem('taskHistory', JSON.stringify(updatedHistory));
            setHistory(updatedHistory);
        } catch (error) {
            console.error('Failed to delete task record:', error);
        }
    };

    const clearAllHistory = () => {
        const confirmed = window.confirm(
            'Are you sure you want to delete all history records? This operation cannot be undone!'
        );
        
        if (confirmed) {
            try {
                localStorage.removeItem('taskHistory');
                setHistory({});
            } catch (error) {
                console.error('Failed to clear history:', error);
            }
        }
    };

    const exportHistory = () => {
        try {
            const dataStr = JSON.stringify(history, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `task_history_${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            
            // Clean up
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Failed to export history:', error);
        }
    };

    const formatTime = (milliseconds) => {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        } else {
            return `${seconds}s`;
        }
    };

    const calculateDayStats = (tasks) => {
        const totalDuration = tasks.reduce((total, task) => total + task.duration, 0);
        const averageDuration = tasks.length > 0 ? totalDuration / tasks.length : 0;
        
        return {
            totalTasks: tasks.length,
            totalDuration,
            averageDuration,
        };
    };

    const dates = Object.keys(history).sort().reverse();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="history-view">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Task History
            </h1>

            {/* Management buttons */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={clearAllHistory}
                    disabled={dates.length === 0}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Clear History
                </button>
                <button
                    onClick={exportHistory}
                    disabled={dates.length === 0}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Export Data
                </button>
            </div>

            {/* History content */}
            {dates.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No completed tasks yet</p>
                    <p className="text-gray-400 text-sm mt-2">Complete some tasks to see your productivity history</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {dates.map((date) => {
                        const dayTasks = history[date];
                        const stats = calculateDayStats(dayTasks);
                        
                        return (
                            <div key={date} className="bg-white rounded-lg shadow p-6">
                                {/* Date header */}
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {new Date(date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </h2>
                                </div>

                                {/* Date statistics */}
                                <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-blue-50 rounded-lg">
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-blue-600">
                                            {stats.totalTasks}
                                        </div>
                                        <div className="text-sm text-blue-700">
                                            Tasks Completed
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-blue-600">
                                            {formatTime(stats.totalDuration)}
                                        </div>
                                        <div className="text-sm text-blue-700">
                                            Total Time
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-blue-600">
                                            {formatTime(stats.averageDuration)}
                                        </div>
                                        <div className="text-sm text-blue-700">
                                            Average Time
                                        </div>
                                    </div>
                                </div>

                                {/* Task list */}
                                <div className="space-y-2">
                                    {dayTasks.map((task, index) => (
                                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 group">
                                            <div className="flex-1">
                                                <span className="font-medium text-gray-800">
                                                    {task.name}
                                                </span>
                                            </div>
                                            
                                            <div className="flex items-center gap-3">
                                                <div className="text-right">
                                                    <div className="text-sm font-medium text-gray-600">
                                                        ⏱️ {formatTime(task.duration)}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        🏁 {task.completedAt}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => deleteTaskRecord(date, index)}
                                                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Delete record"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default HistoryView;