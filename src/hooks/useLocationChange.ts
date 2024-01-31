import { useEffect } from "react";
import { Location, useLocation } from "react-router-dom";

type TCallbackMethod = (location: Location) => void;

const useLocationChange = (onLocationChange: TCallbackMethod) => {
  const location = useLocation();

  useEffect(() => {
    onLocationChange(location);
  }, [location, onLocationChange]);
};

export default useLocationChange;
