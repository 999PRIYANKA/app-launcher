import React, { useState } from 'react';
import PropertiesList from '../components/properties/PropertiesList';
import AddPropertyFlow from '../components/properties/AddPropertyFlow';
import PropertyDetailView from '../components/properties/PropertyDetailView';

const PropertiesPage = ({ 
    properties = [], 
    leases = [], 
    tenants = [], 
    landlords = [],
    mortgages = [], 
    policies = [], 
    taxRecords = [],
    hoaAccounts = [],
    evictions = [],
    activities = [],
    tasks = [],
    onLogActivity,
    onAddTask,
    onUpdateTask,
    onAddProperty, 
    onUpdateProperty, 
    onAddLease, 
    onUpdateLease,
    onDeleteLease,
    onAddTenant,
    onUpdateTenant,
    onDeleteTenant,
    onAddMortgage,
    onUpdateMortgage,
    onDeleteMortgage,
    onAddInsurance,
    onUpdateInsurance,
    onDeleteInsurance,
    onAddTaxRecord,
    onUpdateTaxRecord,
    onDeleteTaxRecord,
    onAddHOA,
    onUpdateHOA,
    onDeleteHOA,
    onAddEviction,
    onUpdateEviction,
    onDeleteEviction
}) => {
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleSaveProperty = (property) => {
    const newProperty = { ...property, status: 'Vacant', id: Math.random().toString(36).substr(2, 9) };
    if (onAddProperty) {
        onAddProperty(newProperty);
    }
    setIsAddingProperty(false);
  };

  const handleUpdate = (updatedProp) => {
      if (onUpdateProperty) {
          onUpdateProperty(updatedProp);
      }
      setSelectedProperty(updatedProp);
  };
  
  return (
    <div className="relative h-full">
        <PropertiesList 
            properties={properties} 
            onAddPropertyClick={() => setIsAddingProperty(true)} 
            onSelectProperty={setSelectedProperty}
        />

        {isAddingProperty && (
            <div className="absolute inset-0 z-50 bg-white">
                 <AddPropertyFlow 
                    onExit={() => setIsAddingProperty(false)}
                    onSave={handleSaveProperty}
                />
            </div>
        )}

        {selectedProperty && (
             <PropertyDetailView 
                property={selectedProperty} 
                allProperties={properties}
                landlords={landlords}
                leases={leases.filter(l => l.property === selectedProperty.propertyName)}
                tenants={tenants.filter(t => t.property === selectedProperty.propertyName)}
                mortgages={mortgages.filter(m => m.propertyId === selectedProperty.id)}
                policies={policies.filter(p => p.propertyId === selectedProperty.id)}
                taxRecords={taxRecords.filter(t => t.propertyId === selectedProperty.id)}
                hoaAccounts={hoaAccounts.filter(h => h.propertyId === selectedProperty.id)}
                evictions={evictions.filter(e => e.propertyId === selectedProperty.id)}
                
                activities={activities}
                tasks={tasks}
                onLogActivity={onLogActivity}
                onAddTask={onAddTask}
                onUpdateTask={onUpdateTask}

                onBack={() => setSelectedProperty(null)} 
                onUpdate={handleUpdate}
                
                onAddLease={onAddLease}
                onUpdateLease={onUpdateLease}
                onDeleteLease={onDeleteLease}

                onAddTenant={onAddTenant}
                onUpdateTenant={onUpdateTenant}
                onDeleteTenant={onDeleteTenant}

                onAddMortgage={onAddMortgage}
                onUpdateMortgage={onUpdateMortgage}
                onDeleteMortgage={onDeleteMortgage}

                onAddInsurance={onAddInsurance}
                onUpdateInsurance={onUpdateInsurance}
                onDeleteInsurance={onDeleteInsurance}

                onAddTaxRecord={onAddTaxRecord}
                onUpdateTaxRecord={onUpdateTaxRecord}
                onDeleteTaxRecord={onDeleteTaxRecord}

                onAddHOA={onAddHOA}
                onUpdateHOA={onUpdateHOA}
                onDeleteHOA={onDeleteHOA}

                onAddEviction={onAddEviction}
                onUpdateEviction={onUpdateEviction}
                onDeleteEviction={onDeleteEviction}
            />
        )}
    </div>
  );
};

export default PropertiesPage;

