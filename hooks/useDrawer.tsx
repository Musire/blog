import { useEffect, useState, useRef } from "react";

type AnimationState = true | false | null;  
// true  = animate in
// false = animate out
// null  = reset

export default function useDrawer(duration: number = 300) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [animation, setAnimation] = useState<AnimationState>(true);

  // NodeJS or browser timeout — support both environments
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDrawer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setIsMounted(true);
    setAnimation(true); // animate in
  };

  const closeDrawer = () => {
    setAnimation(false); // animate out

    timeoutRef.current = setTimeout(() => {
      setIsMounted(false);
      setAnimation(null); // reset
    }, duration);
  };

  const toggleDrawer = () => {
    isMounted ? closeDrawer() : openDrawer();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    isMounted,
    animation,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
}
