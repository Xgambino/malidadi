import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep = 1, totalSteps = 3 }) => {
  const steps = [
    { id: 1, label: 'Shipping', icon: 'Truck' },
    { id: 2, label: 'Payment', icon: 'CreditCard' },
    { id: 3, label: 'Review', icon: 'CheckCircle' }
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${
                step?.id <= currentStep
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'bg-surface border-border text-muted-foreground'
              }`}>
                <Icon name={step?.icon} size={18} />
              </div>
              <span className={`mt-2 text-xs font-medium ${
                step?.id <= currentStep ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {step?.label}
              </span>
            </div>
            {index < steps?.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                step?.id < currentStep ? 'bg-primary' : 'bg-border'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;