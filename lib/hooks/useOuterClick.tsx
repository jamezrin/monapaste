import { useEffect, useRef } from 'react';

// https://stackoverflow.com/a/54292872/4673065
function useOuterClick(callback) {
  const callbackRef = useRef<any>(); // initialize mutable callback ref
  const innerRef = useRef<any>(); // returned to client, who sets the "border" element

  // update callback on each render, so second useEffect has most recent callback
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
    function handleClick(e) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      )
        callbackRef.current(e);
    }
  }, []); // no dependencies -> stable click listener

  return innerRef; // convenience for client (doesn't need to init ref himself)
}

export default useOuterClick;
