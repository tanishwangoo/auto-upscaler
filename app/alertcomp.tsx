import { useState, useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

const AlertComponent: React.FC<{ errorMessage: string | null, alertVisible: boolean }> = ({ errorMessage, alertVisible }) => {  
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
      alertVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      {/* Background overlay */}
      <div className={`fixed inset-0 bg-black bg-opacity-30 transition-all duration-300 ease-in-out ${
        alertVisible ? 'backdrop-blur-sm' : ''
      }`} />
      
      {/* Alert box */}
      <Alert
        variant="destructive"
        className={`z-50 bg-white p-4 rounded-lg transition-transform duration-[1500ms] ease-in-out ${
          alertVisible
            ? 'opacity-100 scale-100'  // Pop-in effect
            : 'opacity-0 scale-90'     // Pop-out effect
        }`}
      >
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {errorMessage}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AlertComponent;