import React, { useState } from "react";
import CountdownTimer from "./CountdownTimer.jsx";

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const addTask = () => {
        if (newTask.trim() !== "") {
            const newTaskObj = {
                id: Date.now(),
                name: newTask,
                timeLeft: 0,
                isRunning: false,
                completed: false
            };
            setTasks(prevTasks => [...prevTasks, newTaskObj]);
            setNewTask("");
        }
    };

    const deleteTask = (id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const toggleTimer = (id) => {
        setTasks(prevTasks =>
            prevTasks.map(task => {
                if (task.id === id) {
                    if (!task.isRunning) {
                        return {
                            ...task,
                            isRunning: true,
                            totalTime: task.timeLeft
                        };
                    } else {
                        return { ...task, isRunning: false };
                    }
                }
                return task;
            })
        );
    };

    const updateTaskTime = (id, newTime) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, timeLeft: newTime } : task
            )
        );
    };

    const formatTime = (milliseconds) => {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const completeTask = (id) => {
        const task = tasks.find(t => t.id === id);
        const actualDuration = (task.totalTime || task.timeLeft) - task.timeLeft;

        const isCompleted = window.confirm(
            `Task: "${task.name}"\nDuration: ${formatTime(actualDuration)}\n\nDo you want to save this task?`
        );

        if (isCompleted) {
            saveCompletedTask(task.name, actualDuration);
        }

        deleteTask(id);
    };

    const saveCompletedTask = (taskName, duration) => {
        try {
            const today = new Date().toDateString();
            const existingHistory = localStorage.getItem('taskHistory');
            const history = existingHistory ? JSON.parse(existingHistory) : {};

            if (!history[today]) {
                history[today] = [];
            }

            const completedTask = {
                name: taskName,
                duration: duration,
                completedAt: new Date().toLocaleTimeString(),
            };

            history[today].push(completedTask);
            localStorage.setItem('taskHistory', JSON.stringify(history));

            console.log('Task saved:', taskName, formatTime(duration));
        } catch (error) {
            console.error('Failed to save completed task:', error);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    };

    return (
        <div className="todo-list">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                To-Do List
            </h1>

            {/* Add task area */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Enter new task..."
                        value={newTask}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                    />
                    <button
                        onClick={addTask}
                        disabled={!newTask.trim()}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Task list */}
            <div className="space-y-4">
                {tasks.map(task => (
                    <div key={task.id} className="bg-white rounded-lg shadow p-6 w-full max-w-5xl mx-auto">
                        <div className="grid gap-6 items-stretch min-h-[140px]" style={{ gridTemplateColumns: '1fr 2fr auto' }}>
                            {/* Task Name Section */}
                            <div className="flex items-center justify-center bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                                <h3 className="text-2xl font-bold text-gray-900 tracking-wide text-center leading-relaxed">
                                    {task.name}
                                </h3>
                            </div>
                            
                            {/* Timer Section */}
                            <div className="flex items-center justify-center bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                                <div className="w-full">
                                    <CountdownTimer
                                        remainingTime={task.timeLeft}
                                        isRunning={task.isRunning}
                                        onTimeChange={(newTime) => updateTaskTime(task.id, newTime)}
                                        onComplete={() => completeTask(task.id)}
                                        onToggle={() => toggleTimer(task.id)}
                                        showTimeButtons={!task.isRunning}
                                        initialTime={task.totalTime || task.timeLeft}
                                    />
                                </div>
                            </div>

                            {/* Complete Button Section */}
                            <div className="flex items-center justify-center px-4">
                                <button
                                    onClick={() => completeTask(task.id)}
                                    className="px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium shadow-lg whitespace-nowrap"
                                >
                                    ✓ Complete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {tasks.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">No tasks yet, add one to get started!</p>
                </div>
            )}
        </div>
    );
};

export default TodoList;