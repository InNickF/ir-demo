import { soundConfigAtom } from "@/commons/store/jotai/notifications";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "in-ui-react";
import { useAtom } from "jotai";

export const SoundButton = () => {
  const [soundConfig, setSoundConfig] = useAtom(soundConfigAtom);

  return (
    <Button
      onlyIcon
      kind="ghost"
      size="small"
      icon={soundConfig ? <SpeakerWaveIcon /> : <SpeakerXMarkIcon />}
      onClick={() => {
        setSoundConfig((prev) => !prev);
      }}
    />
  );
};
