import { useEffect, useState } from "react";
import moment from "moment";

export const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  });
  return formatter.format(amount);
};
  
  export function calculateSum(array) {
    let total = 0;
  
    for (const value of array) {
      total += value;
    }
  
    return total;
  }
  
  export const useIsMobileView = () => {
    const [mobile, setMobile] = useState(false);
    // const { width } = useWindowSize();
    const [windowSize, setWindowSize] = useState(undefined);
  
    // Handler to call on window resize
    function handleResize() {
      // Set window width to state
      setWindowSize(window.innerWidth);
    }
  
    useEffect(() => {
      // Add event listener
      window.addEventListener("resize", handleResize);
  
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, [windowSize]); // Empty array ensures that effect is only run on mount
  
    useEffect(() => {
      if (windowSize < 720) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }, [windowSize]);
  
    return mobile;
  };
  

  export const HumanFriendlyDate = (dateTime) => {
    if (!dateTime || dateTime === "NA") {
      return "N/A";
    }
    
    const _dateTime = moment(dateTime);
    return `${_dateTime.format("Do MMM, YYYY")}`;
  };