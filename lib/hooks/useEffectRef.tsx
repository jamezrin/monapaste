import { MutableRefObject, useEffect, useRef } from 'react';

/**
 * Keeps an up-to-date ref to an object by updating it on useEffect run
 * @param obj 
 * @returns 
 */
export function useEffectRef<T>(obj: T): MutableRefObject<T> {
  const ref = useRef(obj);

  useEffect(() => {
    ref.current = obj;
  });

  return ref;
}