import React, { useState } from 'react';
import * as Icons from '../../constants/icons';
import ActivityFeed from './ActivityFeed';

const RecordDetail = ({ 
  title, 
  subtitle, 
  onClose, 
  onSave, 
  steps, 
  onStepClick,
  status,
  children,
  rightSidebar,
  headerIcon,
  headerBadge,
  highlights = [],
  recordId,
  activities = [],
  tasks = [],
  onAddTask,
  onUpdateTask
}) => {
  const [isHighlightsExpanded, setIsHighlightsExpanded] = useState(true);

  const renderHighlightValue = (field) => {
    if (field.value === null || field.value === undefined || field.value === '') return '—';
    
    if (field.type === 'user') {
      return (
        <div className="flex items-center space-x-1.5">
          <Icons.UserIcon className="w-4 h-4 text-gray-400" />
          <span>{field.value}</span>
        </div>
      );
    }
    return field.value;
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity" onClick={onClose} />
      <div className="fixed inset-0 w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col">
        
        {/* Header - Styled to match screenshot */}
        <div className="flex items-center justify-between p-5 bg-white border-b border-gray-100">
          <div className="flex items-center space-x-4 overflow-hidden">
             <div className="p-2.5 bg-[#ff6b00] rounded-lg text-white shadow-sm flex-shrink-0">
                {headerIcon || <Icons.PropertiesIcon className="w-6 h-6" />}
             </div>
             <div className="min-w-0">
                <h2 className="text-2xl font-semibold text-[#0d2438] tracking-tight truncate">{title}</h2>
             </div>
          </div>
          
          <div className="flex items-center space-x-3 flex-shrink-0">
             {headerBadge && (
                <button className="flex items-center space-x-2 px-4 py-2 border border-blue-200 rounded-lg text-blue-700 bg-blue-50/50 hover:bg-blue-50 transition-colors text-sm font-semibold">
                    {headerBadge.icon || <Icons.ClockIcon className="w-4 h-4" />}
                    <span>{headerBadge.text}</span>
                </button>
             )}
             
             {highlights.length > 0 && (
               <button 
                onClick={() => setIsHighlightsExpanded(!isHighlightsExpanded)}
                className={`p-1.5 rounded-full border transition-all active:scale-95 ${isHighlightsExpanded ? 'text-blue-600 bg-blue-50 border-blue-200' : 'text-gray-400 border-gray-200 hover:bg-gray-50'}`}
               >
                 <Icons.ChevronRightIcon className={`w-6 h-6 transform transition-transform duration-300 ${isHighlightsExpanded ? '-rotate-90' : 'rotate-90'}`} />
               </button>
             )}

             <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 border border-gray-100 transition-all">
                <Icons.XIcon className="w-7 h-7" />
             </button>
          </div>
        </div>

        {/* Expandable Highlights Grid */}
        {highlights.length > 0 && (
            <div className={`border-b border-gray-100 bg-white transition-all duration-300 overflow-hidden ${isHighlightsExpanded ? 'max-h-96 opacity-100 py-6' : 'max-h-0 opacity-0 py-0'}`}>
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8">
                        {highlights.map((field, idx) => (
                            <div key={idx} className="space-y-1">
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{field.label}</p>
                                <div className="text-sm font-semibold text-[#344767]">
                                    {renderHighlightValue(field)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* Timeline / Steps (Optional) */}
        {steps && steps.length > 0 && (
          <div className="px-6 py-6 border-b bg-gray-50/50 overflow-x-auto">
             <div className="flex items-center justify-between min-w-max px-4 max-w-7xl mx-auto w-full">
                 {steps.map((step, index) => (
                     <div 
                        key={index} 
                        className={`flex flex-col items-center relative group mx-4 first:ml-0 last:mr-0 ${onStepClick ? 'cursor-pointer' : 'cursor-default'}`}
                        onClick={() => onStepClick?.(step.label)}
                    >
                         {/* Line Connector logic: Blue if THIS step is current or completed */}
                         {index !== 0 && (
                             <div className={`absolute top-3 -left-full w-full h-0.5 -z-10 ${step.status === 'completed' || step.status === 'current' ? 'bg-blue-500' : 'bg-gray-200'} origin-left transform scale-x-150`} style={{ left: '-50%'}}></div>
                         )}
                         <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 z-10 transition-all duration-200
                             ${step.status === 'completed' ? 'bg-blue-500 border-blue-500 text-white' : ''}
                             ${step.status === 'current' ? 'bg-white border-blue-500 text-blue-500 ring-2 ring-blue-100 scale-110' : ''}
                             ${step.status === 'upcoming' ? 'bg-white border-gray-300 text-gray-300' : ''}
                             ${onStepClick && step.status === 'upcoming' ? 'group-hover:border-blue-400 group-hover:text-blue-400' : ''}
                         `}>
                             {step.status === 'completed' && <Icons.CheckCircleIcon className="w-4 h-4" />}
                             {step.status !== 'completed' && (index + 1)}
                         </div>
                         <span className={`text-[10px] mt-2 font-black uppercase tracking-tighter transition-colors ${step.status === 'current' ? 'text-blue-600' : 'text-gray-400'} ${onStepClick && 'group-hover:text-gray-800'}`}>
                             <span className="hidden sm:inline">{step.label}</span>
                             <span className="inline sm:hidden">{step.shortLabel || step.label}</span>
                         </span>
                     </div>
                 ))}
             </div>
          </div>
        )}

        {/* Content - Scrollable */}
        <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 overflow-y-auto bg-gray-50 p-6 space-y-6 pb-24">
               <div className="max-w-7xl mx-auto w-full">
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
            </div>
            {rightSidebar && (
                <div className="w-20 bg-white border-l border-gray-100 py-6 hidden md:flex flex-col items-center z-10 space-y-8 shadow-inner">
                    {rightSidebar}
                </div>
            )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t bg-white flex justify-end space-x-4 z-20 shadow-[0_-4px_15px_-1px_rgba(0,0,0,0.05)] px-8">
            <button 
                onClick={onClose} 
                className="px-8 py-3 text-gray-500 bg-white border border-gray-200 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-gray-50 hover:text-gray-900 transition-all"
            >
                Close View
            </button>
            <button 
                onClick={onSave} 
                className="px-10 py-3 text-white bg-blue-600 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
                Save Changes
            </button>
        </div>

      </div>
    </>
  );
};

export default RecordDetail;
