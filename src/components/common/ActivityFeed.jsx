import React, { useState } from 'react';
import * as Icons from '../../constants/icons';



const ActivityFeed= ({ recordId, activities, tasks, onAddTask, onUpdateTask }) => {
    const [activeTab, setActiveTab] = useState('Activity');
    const [newTaskDesc, setNewTaskDesc] = useState('');

    const filteredActivities = activities
        .filter(a => a.recordId === recordId)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const filteredTasks = tasks
        .filter(t => t.recordId === recordId)
        .sort((a, b) => (a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1));

    const handleAddTask = () => {
        if (!newTaskDesc.trim()) return;
        const task: Task = {
            id: Math.random().toString(36).substr(2, 9),
            recordId,
            description: newTaskDesc,
            isCompleted: false,
            createdAt: new Date().toISOString()
        };
        onAddTask(task);
        setNewTaskDesc('');
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mt-6">
            <div className="flex border-b border-gray-200">
                <button 
                    onClick={() => setActiveTab('Activity')}
                    className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${activeTab === 'Activity' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                >
                    Activity History
                </button>
                <button 
                    onClick={() => setActiveTab('Tasks')}
                    className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${activeTab === 'Tasks' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                >
                    Tasks
                </button>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
                {activeTab === 'Activity' ? (
                    <div className="space-y-4">
                        {filteredActivities.length === 0 ? (
                            <p className="text-center text-gray-400 text-sm py-4">No activity recorded yet.</p>
                        ) = (
                                    <li key={log.id} className="ml-6 relative">
                                        <span className="absolute -left-[31px] flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-4 ring-white">
                                            <Icons.ClockIcon className="w-3 h-3 text-blue-600" />
                                        </span>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{log.details}</p>
                                                <p className="text-xs text-gray-500">by {log.userName}</p>
                                            </div>
                                            <span className="text-xs text-gray-400 whitespace-nowrap mt-1 sm:mt-0">{formatDate(log.timestamp)}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ) = setNewTaskDesc(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                                placeholder="Add a new task..." 
                                className="flex-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button onClick={handleAddTask} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">Add</button>
                        </div>
                        <ul className="space-y-2">
                            {filteredTasks.map(task => (
                                <li key={task.id} className="flex items-center p-2 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200 transition-all">
                                    <input 
                                        type="checkbox" 
                                        checked={task.isCompleted}
                                        onChange={(e) => onUpdateTask({ ...task, isCompleted: e.target.checked })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                                    />
                                    <span className={`ml-3 text-sm flex-1 ${task.isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                                        {task.description}
                                    </span>
                                    {task.dueDate && <span className="text-xs text-gray-400 ml-2">{task.dueDate}</span>}
                                </li>
                            ))}
                            {filteredTasks.length === 0 && (
                                <p className="text-center text-gray-400 text-sm py-4">No tasks for this record.</p>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityFeed;


