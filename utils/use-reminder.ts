import { useEffect, useState } from "react";
import { format } from "date-fns";

export function useReminder() {
  const [show, setShow] = useState(false);
  const [milestone, setMilestone] = useState<string>("");

  useEffect(() => {
    fetch("/api/couple-page/reminder")
      .then((res) => res.json())
      .then((data) => {
        setShow(data.show);
        setMilestone(format(new Date(data.popupStart), "dd/MM/yyyy"));
      });
  }, []);

  const dismiss = async () => {
    await fetch("/api/couple-page/reminder", {
      method: "PATCH",
    });
    setShow(false);
  };

  return { show, setShow, dismiss, milestone };
}
