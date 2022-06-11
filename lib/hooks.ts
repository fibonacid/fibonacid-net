import { useCallback, useEffect, useState } from "react";

export const useUser = () => {
  const [username, setUsername] = useState<string | null>();
  useEffect(() => {
    setUsername(window.sessionStorage.getItem("username"));
  }, []);
  const reset = useCallback((name: string) => {
    setUsername(name);
    window.sessionStorage.setItem("username", name);
  }, []);
  return { name: username, reset };
};
