import React from 'react';
import * as Icons from '../../constants/icons';
import ActivityFeed from './ActivityFeed';





const RecordDetail= ({ 
  title, 
  subtitle, 
  onClose, 
  onSave, 
  steps, 
  status,
  children,
  rightSidebar,
  recordId,
  activities = [],
  tasks = [],
  onAddTask,
  onUpdateTask
}) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full md:w-2/3 lg:w-1/2 xl:w-5/12 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center space-x-3 overflow-hidden">
             <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                <Icons.PropertiesIcon className="w-6 h-6" />
             </div>
             <div className="min-w-0">
                <h2 className="text-lg font-bold text-gray-900 truncate">{title}</h2>
                {subtitle && <p className="text-sm text-gray-500 truncate">{subtitle}</p>}
             </div>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
             {status && (
                 <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                     {status}
                 </span>
             )}
             <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                <Icons.XIcon className="w-6 h-6" />
             </button>
          </div>
        </div>

        {/* Timeline / Steps (Optional) */}
        {steps && steps.length > 0 && (
          <div className="px-4 py-6 border-b bg-gray-50 overflow-x-auto">
             <div className="flex items-center justify-between min-w-max px-2">
                 {steps.map((step, index) => (
                     <div key={index} className="flex flex-col items-center relative group mx-4 first:ml-0 last:mr-0">
                         {index !== 0 && (
                             <div className={`absolute top-3 -left-full w-full h-0.5 -z-10 ${step.status === 'completed' ? 'bg-blue-500' : 'bg-gray-200'} origin-left transform scale-x-150`} style={{ left: '-50%'}}></div>
                         )}
                         <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 z-10 transition-colors
                             ${step.status === 'completed' ? 'bg-blue-500 border-blue-500 text-white' : ''}
                             ${step.status === 'current' ? 'bg-white border-blue-500 text-blue-500 ring-2 ring-blue-200' : ''}
                             ${step.status === 'upcoming' ? 'bg-white border-gray-300 text-gray-300' : ''}
                         `}>
                             {step.status === 'completed' && <Icons.CheckCircleIcon className="w-4 h-4" />}
                             {step.status !== 'completed' && (index + 1)}
                         </div>
                         <span className={`text-[10px] mt-2 font-medium uppercase tracking-wider ${step.status === 'current' ? 'text-blue-600' : 'text-gray-500'}`}>
                             {step.label}
                         </span>
                     </div>
                 ))}
             </div>
          </div>
        )}

        {/* Content - Scrollable */}
        <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4 pb-20">
               {children}
               
               {/* Activity Feed Section */}
               {recordId && onAddTask && onUpdateTask && (
                   <ActivityFeed 
                        recordId={recordId}
                        activities={activities}
                        tasks={tasks}
                        onAddTask={onAddTask}
                        onUpdateTask={onUpdateTask}
                   />
               )}
            </div>
            {rightSidebar && (
                <div className="w-16 bg-white border-l border-gray-200 py-4 hidden md:flex flex-col items-center z-10">
                    {rightSidebar}
                </div>
            )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t bg-white flex justify-end space-x-3 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <button 
                onClick={onClose} 
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium hover:bg-gray-50 focus:outline-none"
            >
                Cancel
            </button>
            <button 
                onClick={onSave} 
                className="px-4 py-2 text-white bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none"
            >
                Save Changes
            </button>
        </div>

      </div>
    </>
  );
};

export default RecordDetail;


