import React from 'react';
import * as Icons from '../../../../constants/icons';

const StepIndicator = ({ currentStep, setStep, step1Valid }) => {
  const steps = [
    { number: 1, title: 'Property Details', icon: <Icons.PropertiesIcon className="w-5 h-5"/>, valid: true },
    { number: 2, title: 'Unit Details', icon: <Icons.UnitIcon className="w-5 h-5" />, valid: step1Valid },
    { number: 3, title: 'Property Settings', icon: <Icons.SettingsIcon className="w-5 h-5"/>, valid: step1Valid },
  ];

  const handleStepClick = (stepNumber, isValid) => {
    if (currentStep > stepNumber || (isValid && stepNumber !== currentStep)) {
      setStep(stepNumber);
    }
  };

  return (
    <div className="w-full px-4 sm:px-8">
      <div className="flex items-start">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const isClickable = currentStep > step.number || (step.valid && !isCurrent);

          return (
            <React.Fragment key={step.number}>
              <div
                className={`flex flex-col items-center text-center w-40 ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                onClick={() => handleStepClick(step.number, step.valid)}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors relative
                    ${isCurrent && 'bg-blue-500 text-white ring-4 ring-blue-200'}
                    ${isCompleted && 'bg-green-100 text-green-600'}
                    ${!isCurrent && !isCompleted && 'bg-gray-200 text-gray-500'}
                  `}
                >
                  {isCompleted ? <Icons.CheckCircleIcon className="w-8 h-8 text-green-500" /> : step.icon}
                </div>
                <p className={`mt-2 text-sm font-semibold 
                  ${isCurrent ? 'text-blue-600' : ''}
                  ${isCompleted ? 'text-gray-800' : ''}
                  ${!isCurrent && !isCompleted ? 'text-gray-500' : ''}
                `}>
                  {step.title}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`flex-auto border-t-2 mt-6 transition-colors
                    ${isCompleted ? 'border-green-500' : 'border-gray-300'}
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;

