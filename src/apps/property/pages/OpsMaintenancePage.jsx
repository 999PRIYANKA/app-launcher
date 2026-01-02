import React, { useState, useEffect } from 'react';
import WorkOrdersList from '../components/ops/WorkOrdersList';
import WorkOrderDetailView from '../components/ops/WorkOrderDetailView';
import InspectionsList from '../components/ops/InspectionsList';
import InspectionDetailView from '../components/ops/InspectionDetailView';
import TurnsList from '../components/ops/TurnsList';
import TurnDetailView from '../components/ops/TurnDetailView';
import * as Icons from '../../../constants/icons';

const OpsMaintenancePage = ({ properties = [], initialTab = 'Work Orders' }) => {
  const [activeTab, setActiveTab] = useState(initialTab || 'Work Orders');

  useEffect(() => {
      if (initialTab) {
          setActiveTab(initialTab);
      }
  }, [initialTab]);

  // Work Orders State
  const [workOrders, setWorkOrders] = useState([
    {
      id: '1',
      workOrderNumber: 'WO-1001',
      title: 'Leaky Faucet',
      property: '3809 Billingsley Street # a',
      unit: 'Unit 1',
      priority: 'Low',
      category: 'Plumbing',
      status: 'New',
      type: 'Standard',
      scheduledStart: '2024-10-12',
      description: 'Kitchen faucet dripping constantly.',
      reporterType: 'Tenant',
      reportedBy: 'John Doe',
      requestSource: 'Portal',
      estimatedCost: 150,
      actualCost: 0
    },
    {
      id: '2',
      workOrderNumber: 'WO-1002',
      title: 'Broken HVAC',
      property: 'test Property 123',
      unit: 'Main',
      priority: 'High',
      category: 'HVAC',
      status: 'In Progress',
      type: 'Standard',
      scheduledStart: '2024-11-01',
      description: 'AC not cooling.',
      reporterType: 'Tenant',
      reportedBy: 'Jane Smith',
      requestSource: 'Phone',
      estimatedCost: 500,
      actualCost: 200
    },
    // Child Work Orders for Turn TRN-2002
    {
      id: '3',
      workOrderNumber: 'WO-1003',
      title: 'Full Paint',
      property: 'test Property 123',
      unit: 'Main',
      turnId: '2', // Linked to Turn 2
      priority: 'Medium',
      category: 'General',
      status: 'Completed',
      type: 'Turn',
      estimatedCost: 1200,
      actualCost: 1150
    },
    {
      id: '4',
      workOrderNumber: 'WO-1004',
      title: 'Carpet Cleaning',
      property: 'test Property 123',
      unit: 'Main',
      turnId: '2', // Linked to Turn 2
      priority: 'Medium',
      category: 'General',
      status: 'Scheduled',
      type: 'Turn',
      estimatedCost: 300,
      actualCost: 0
    }
  ]);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);

  // Inspections State
  const [inspections, setInspections] = useState([
    {
      id: '1',
      inspectionNumber: 'INSP-5001',
      property: '3809 Billingsley Street # a',
      unit: 'Unit 1',
      type: 'Move-In',
      scheduledDate: '2024-01-02',
      status: 'Completed',
      inspector: 'Mike Inspector',
      overallCondition: 'Good'
    },
    {
      id: '2',
      inspectionNumber: 'INSP-5002',
      property: 'test Property 123',
      unit: 'Main',
      type: 'Annual',
      scheduledDate: '2024-12-01',
      status: 'Scheduled',
      inspector: 'Sarah Safety'
    }
  ]);
  const [selectedInspection, setSelectedInspection] = useState(null);

  // Turns State
  const [turns, setTurns] = useState([
    {
      id: '1',
      turnNumber: 'TRN-2001',
      property: '3809 Billingsley Street # a',
      unit: 'Unit 1',
      moveOutDate: '2024-01-01',
      targetReadyDate: '2024-01-15',
      actualReadyDate: '2024-01-14',
      status: 'Completed',
      type: 'Standard',
      priority: 'Medium',
      budget: 1500,
      manager: 'Dustin Wyatt'
    },
    {
      id: '2',
      turnNumber: 'TRN-2002',
      property: 'test Property 123',
      unit: 'Main',
      moveOutDate: '2024-12-01',
      targetReadyDate: '2024-12-10',
      status: 'In Progress',
      type: 'Heavy',
      priority: 'High',
      budget: 2000,
      manager: 'Dustin Wyatt'
    }
  ]);
  const [selectedTurn, setSelectedTurn] = useState(null);

  // Helper to calculate rollups
  const recalculateTurnStats = (currentTurns, currentWorkOrders) => {
    return currentTurns.map(turn => {
      const relatedWOs = currentWorkOrders.filter(wo => wo.turnId === turn.id);
      
      const totalEstimatedCost = relatedWOs.reduce((sum, wo) => sum + (wo.estimatedCost || 0), 0);
      const totalActualCost = relatedWOs.reduce((sum, wo) => sum + (wo.actualCost || 0), 0);
      const totalWorkOrders = relatedWOs.length;
      const completedWorkOrders = relatedWOs.filter(wo => wo.status === 'Completed').length;
      const openWorkOrders = relatedWOs.filter(wo => wo.status !== 'Completed' && wo.status !== 'Cancelled').length;

      return {
        ...turn,
        totalEstimatedCost,
        totalActualCost,
        totalWorkOrders,
        completedWorkOrders,
        openWorkOrders
      };
    });
  };

  // Initial Calculation on mount
  useEffect(() => {
    setTurns(prevTurns => recalculateTurnStats(prevTurns, workOrders));
  }, []); // Run once on mount

  const handleSaveWorkOrder = (updatedWO) => {
    // 1. Update Work Orders List
    let updatedWorkOrders = [...workOrders];
    const index = updatedWorkOrders.findIndex(wo => wo.id === updatedWO.id);
    
    if (index !== -1) {
        updatedWorkOrders[index] = updatedWO;
    } else {
        // If it's new (not in list), add it
        updatedWorkOrders.push(updatedWO);
    }
    
    setWorkOrders(updatedWorkOrders);

    // 2. Recalculate Turns
    const updatedTurns = recalculateTurnStats(turns, updatedWorkOrders);
    setTurns(updatedTurns);
    
    setSelectedWorkOrder(null);
  };

  const handleSaveInspection = (updatedInspection) => {
    const updatedInspections = [...inspections];
    const index = updatedInspections.findIndex(i => i.id === updatedInspection.id);
    
    if (index !== -1) {
        updatedInspections[index] = updatedInspection;
    } else {
        updatedInspections.push(updatedInspection);
    }
    setInspections(updatedInspections);
    setSelectedInspection(null);
  };

  const handleSaveTurn = (updatedTurn) => {
    const updatedTurns = [...turns];
    const index = updatedTurns.findIndex(t => t.id === updatedTurn.id);

    if (index !== -1) {
        // Preserve calculated stats if they aren't explicitly passed back (though Detail View handles them)
        updatedTurns[index] = { ...updatedTurns[index], ...updatedTurn };
    } else {
        updatedTurns.push(updatedTurn);
    }
    // Re-run stats calculation to ensure new turns initialize correctly with 0s if needed
    setTurns(recalculateTurnStats(updatedTurns, workOrders));
    setSelectedTurn(null);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Work Orders':
        return (
          <>
            <WorkOrdersList
              workOrders={workOrders}
              onAddWorkOrderClick={() => {
                const newWO = {
                    id: Math.random().toString(36).substr(2, 9),
                    workOrderNumber: `WO-${1000 + workOrders.length + 1}`,
                    title: '',
                    property: '',
                    priority: 'Low',
                    category: 'General',
                    status: 'New'
                };
                setSelectedWorkOrder(newWO);
              }}
              onSelectWorkOrder={setSelectedWorkOrder}
            />
            {selectedWorkOrder && (
              <WorkOrderDetailView
                workOrder={selectedWorkOrder}
                availableTurns={turns}
                properties={properties}
                onBack={() => setSelectedWorkOrder(null)}
                onSave={handleSaveWorkOrder}
              />
            )}
          </>
        );
      case 'Inspections':
        return (
          <>
            <InspectionsList
              inspections={inspections}
              onAddInspectionClick={() => {
                  const newInspection = {
                      id: Math.random().toString(36).substr(2, 9),
                      inspectionNumber: `INSP-${5000 + inspections.length + 1}`,
                      property: '',
                      type: 'Annual',
                      status: 'Scheduled'
                  };
                  setSelectedInspection(newInspection);
              }}
              onSelectInspection={setSelectedInspection}
            />
            {selectedInspection && (
              <InspectionDetailView
                inspection={selectedInspection}
                onBack={() => setSelectedInspection(null)}
                onSave={handleSaveInspection}
              />
            )}
          </>
        );
      case 'Turns': //check
        return (
          <>
            <TurnsList
              turns={turns}
              onAddTurnClick={() => {
                  const newTurn = {
                      id: Math.random().toString(36).substr(2, 9),
                      turnNumber: `TRN-${2000 + turns.length + 1}`,
                      property: '',
                      unit: '',
                      status: 'Planned',
                      type: 'Standard',
                      priority: 'Medium'
                  };
                  setSelectedTurn(newTurn);
              }}
              onSelectTurn={setSelectedTurn}
            />
            {selectedTurn && (
              <TurnDetailView
                turn={selectedTurn}
                relatedWorkOrders={workOrders.filter(wo => wo.turnId === selectedTurn.id)}
                onBack={() => setSelectedTurn(null)}
                onSave={handleSaveTurn}
                onCreateWorkOrder={() => {
                   const newWO = {
                        id: Math.random().toString(36).substr(2, 9),
                        workOrderNumber: `WO-${1000 + workOrders.length + 1}`,
                        title: '',
                        property: selectedTurn.property,
                        unit: selectedTurn.unit,
                        turnId: selectedTurn.id, // Link to current Turn
                        priority: 'Low',
                        category: 'General',
                        status: 'New',
                        type: 'Turn'
                   };
                   setSelectedWorkOrder(newWO);
                }}
                onViewWorkOrder={(wo) => setSelectedWorkOrder(wo)}
              />
            )}
            
            {/* Render Work Order Detail View ON TOP of Turn Detail View if active */}
            {selectedWorkOrder && activeTab === 'Turns' && (
               <WorkOrderDetailView
                 workOrder={selectedWorkOrder}
                 availableTurns={turns}
                 properties={properties}
                 onBack={() => setSelectedWorkOrder(null)}
                 onSave={handleSaveWorkOrder}
               />
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative h-full flex flex-col">
      <div className="bg-white border-b px-6 pt-4">
        <div className="flex space-x-8">
            <button 
                className={`pb-4 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === 'Work Orders' ? 'border-brand-teal text-brand-dark-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('Work Orders')}
            >
                <Icons.WrenchIcon className="w-5 h-5 mr-2" />
                Work Orders
            </button>
            <button 
                className={`pb-4 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === 'Inspections' ? 'border-brand-teal text-brand-dark-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('Inspections')}
            >
                <Icons.ClipboardCheckIcon className="w-5 h-5 mr-2" />
                Inspections
            </button>
            <button 
                className={`pb-4 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === 'Turns' ? 'border-brand-teal text-brand-dark-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('Turns')}
            >
                <Icons.RefreshIcon className="w-5 h-5 mr-2" />
                Turns / Make-Ready
            </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default OpsMaintenancePage;

