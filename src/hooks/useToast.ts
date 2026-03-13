import { useState, useCallback } from 'react';

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setKey((k) => k + 1);
    setTimeout(() => setMessage(null), 3000);
  }, []);

  return { toastMessage: message, toastKey: key, showToast };
}
