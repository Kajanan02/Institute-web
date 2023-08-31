import React from 'react';

function FormStepper({ currentStep }) {
  const steps = ['Step 1', 'Step 2']; // Add more steps if needed

  return (
    <div className="form-stepper">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className={`stepper-circle ${index === currentStep - 1 ? 'active' : ''}`}>
            {index + 1}
          </div>
          {index < steps.length - 1 && <div className="stepper-line" />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default FormStepper;
