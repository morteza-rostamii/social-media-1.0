
import { useRef, useEffect } from 'react';

function useUpdateEffect(callback, dependencies) {
  const firstRenderRef = useRef(true);
  const secondRenderRef = useRef(true);

  useEffect(() => {
    // skip first render
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    if (secondRenderRef.current) {
      secondRenderRef.current = false;
      return;
    }

    return callback();
  }, dependencies);
}

export default useUpdateEffect