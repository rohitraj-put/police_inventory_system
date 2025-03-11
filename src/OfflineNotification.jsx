import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const OfflineNotification = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("You are online.", {
        style: {
          background: "#4CAF50",
          color: "#FFFFFF",
        },
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error("You are currently offline.", {
        style: {
          background: "#F44336",
          color: "#FFFFFF",
        },
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return;
};

export default OfflineNotification;
