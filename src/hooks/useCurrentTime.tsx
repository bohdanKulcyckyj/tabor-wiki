import { currentTime } from "@legendapp/state/helpers/time"
import { use$, useObservable } from "@legendapp/state/react";
import { observe } from "@legendapp/state";

export const useCurrentTime = () => {
  const formattedCurrentTime$ = useObservable<string>("")
  const formattedCurrentTime = use$(formattedCurrentTime$)

  observe(() => {
    const now = currentTime.get()
    const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes().toString().padStart(2, "0")} ${now.getDate().toString().padStart(2, "0")}.${(
      now.getMonth() + 1).toString().padStart(2, "0")}.${now.getFullYear()}`;
      formattedCurrentTime$.set(formattedTime);
  })

  return formattedCurrentTime;
};
