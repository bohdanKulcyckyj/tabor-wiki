import { useState, useEffect } from "react";

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes().toString().padStart(2, "0")} ${now.getDate().toString().padStart(2, "0")}.${(
        now.getMonth() + 1).toString().padStart(2, "0")}.${now.getFullYear()}`;
      setCurrentTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return currentTime;
};
