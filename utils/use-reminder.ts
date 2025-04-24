import { useEffect, useState } from "react";

export function useReminder() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch("/api/couple-page/reminder")
      .then((res) => res.json())
      .then((data) => setShow(data.showReminder));
  }, []);

  const dismiss = async () => {
    await fetch("/api/couple-page/reminder", {
      method: "PATCH",
      body: JSON.stringify({ last_dismissed_at: new Date().toISOString() }),
    });
    setShow(false);
  };

  return { show, dismiss };
}
