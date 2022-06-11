import { useCallback, useEffect, useState } from "react";

export const useUser = () => {
  const [username, setUsername] = useState<string | null>();
  useEffect(() => {
    setUsername(window.localStorage.getItem("username"));
  }, []);
  const reset = useCallback((name: string) => {
    setUsername(name);
    window.localStorage.setItem("username", name);
  }, []);
  return { name: username, reset };
};
