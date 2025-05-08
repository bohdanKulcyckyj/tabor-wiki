import { currentTime } from "@legendapp/state/helpers/time"
import { use$ } from "@legendapp/state/react";

export const useCurrentTime = () => {
  const formattedCurrentTime = use$(() => {
    const now = currentTime.get()
    const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes().toString().padStart(2, "0")} ${now.getDate().toString().padStart(2, "0")}.${(
        now.getMonth() + 1).toString().padStart(2, "0")}.${now.getFullYear()}`;
    return formattedTime;
  })

  return formattedCurrentTime;
};
