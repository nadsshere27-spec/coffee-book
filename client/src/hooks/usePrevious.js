import { useRef, useEffect } from 'react';

export const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Return the ref (not ref.current) so the component can access it in effects
  return ref;
};

export default usePrevious;