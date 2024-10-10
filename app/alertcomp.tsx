import { useState, useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

const AlertComponent: React.FC<{ errorMessage: string | null }> = ({ errorMessage }) => {  
  
  // const [isVisible, setIsVisible] = useState(true);
  // // Hide the alert after 5 seconds
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsVisible(false);
  //   }, 5000);

  //   // Cleanup the timer when the component is unmounted
  //   return () => clearTimeout(timer);
  // }, []);

  // if (!isVisible) return null; // Don't render the alert if it's not visible

  return (
    <Alert
      variant="destructive"
      className="transition transform duration-500 ease-in-out opacity-100 scale-100"
    >
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {errorMessage}
      </AlertDescription>
    </Alert>
  );
}
export default AlertComponent;