import { useEffect, useRef, useState } from 'react';

// A message that shows up and goes away by itself, for example "Link copied".
// Showing a message again starts the timer again.
export function useTemporaryMessage(duration = 2000) {
  const [message, setMessage] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function showMessage(text: string) {
    clearTimeout(timer.current);
    setMessage(text);
    timer.current = setTimeout(() => setMessage(''), duration);
  }

  // Stop the timer when the component is removed
  useEffect(() => () => clearTimeout(timer.current), []);

  return [message, showMessage] as const;
}
