import { cn } from "@/lib/utils";
import { secToMinSecStr } from "@/utils/timeUtils";

import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  PlayIcon,
  PauseIcon,
  StopIcon,
  SpeakerLoudIcon,
  DownloadIcon,
  Share1Icon as ShareIcon,
} from "@radix-ui/react-icons";

import type { AudioState } from "@/types/AudioTypes";

export interface TransmissionPlayerProps {
  downloadSrc?: string;
  currentTimeSeconds: number;
  durationSeconds?: number;
  audioPlayingState?: AudioState;
  isEmergency?: boolean;
  isEncrypted?: boolean;
  disableSlider?: boolean;
  showPlayPause?: boolean;
  showVolumeControl?: boolean;
  showDownloadLink?: boolean;
  onAudioStateChange?: (state: AudioState) => void;
}

const TransmissionPlayer = ({
  downloadSrc,
  currentTimeSeconds,
  durationSeconds,
  audioPlayingState = "stopped",
  isEmergency = false,
  isEncrypted = false,
  disableSlider = false,
  showPlayPause = true,
  showVolumeControl = true,
  showDownloadLink,
  onAudioStateChange,
}: TransmissionPlayerProps) => {
  const isAudioPlaying = audioPlayingState === "playing";
  const shouldShowDownloadLink = downloadSrc ? showDownloadLink ?? true : false;
  const currentTimeStr = secToMinSecStr(currentTimeSeconds);
  const durationStr = durationSeconds
    ? secToMinSecStr(durationSeconds)
    : undefined;
  const isSliderDisabled = disableSlider || !durationSeconds;

  const handleAudioStateChange = (state?: AudioState) => () => {
    if (onAudioStateChange) {
      onAudioStateChange(
        state ?? audioPlayingState === "playing" ? "paused" : "playing"
      );
    }
  };

  return (
    <div
      className={cn(
        "py-3 px-5 rounded-3xl bg-opacity-30 w-full flex flex-col",
        {
          "ring ring-red-600 bg-red-200": isEmergency,
          "ring ring-cyan-600 border-cyan-600 bg-cyan-50":
            isAudioPlaying && !isEmergency,
          "ring-1 ring-gray-300 bg-gray-50": !isEmergency && !isAudioPlaying,
        }
      )}
    >
      <div className="flex justify-between items-center gap-x-3">
        {showPlayPause && (
          <span>
            {audioPlayingState === "stopped" ? (
              <button onClick={handleAudioStateChange("playing")}>
                <PlayIcon className="mr-2 text-cyan-600 hover:text-cyan-700" />
              </button>
            ) : (
              <>
                {audioPlayingState === "paused" ? (
                  <button onClick={handleAudioStateChange("playing")}>
                    <PlayIcon className="w-8 text-cyan-600 hover:text-cyan-700" />
                  </button>
                ) : (
                  <button onClick={handleAudioStateChange("paused")}>
                    <PauseIcon className="w-8 text-cyan-600 hover:text-cyan-700" />
                  </button>
                )}
                <button onClick={handleAudioStateChange("stopped")}>
                  <StopIcon className="w-8 text-cyan-600 hover:text-cyan-700" />
                </button>
              </>
            )}
          </span>
        )}
        <span className="font-medium text-sm">{currentTimeStr}</span>
        <Slider
          defaultValue={[currentTimeSeconds]}
          max={durationSeconds}
          step={1}
          disabled={isSliderDisabled}
          className="!grow !w-auto"
        />
        <span className="font-medium text-sm">
          {durationStr ? durationStr : null}
        </span>
        {showVolumeControl && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                //   onClick={doPlayAudio}
                >
                  <SpeakerLoudIcon className="w-6 text-cyan-600 text-opacity-60 hover:text-cyan-700" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Volume Control</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {shouldShowDownloadLink && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={downloadSrc}
                  download
                >
                  <DownloadIcon className="w-6 text-cyan-600 text-opacity-60 hover:text-cyan-700" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download Audio File</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <ShareIcon className="w-6 text-cyan-600 text-opacity-60 hover:text-cyan-700" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share Transmission</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex justify-between items-center gap-x-3 mt-2">
        <span className="font-bold tracking-tight">
          Omaha Police Northeast Dispatch
        </span>
        <span className="ml-3 flex gap-3">
          {isEncrypted && <Badge variant="default">Encrypted</Badge>}
          {isEmergency && <Badge variant="destructive">Emergency</Badge>}
        </span>
        <span className="text-xs text-gray-600">
          Aug 03, 2023 <span className="ml-1 font-semibold">05:48:34 CDT</span>
        </span>
      </div>
      <div className="mt-2">
        <span className="text-xs">Units:</span>
        <span className="ml-2 text-xs font-semibold">
          1-Adam-1, 1-Adam-2, 1-Adam-3, 1-Adam-4, 1-Adam-5, 1-Adam-6
        </span>
      </div>
    </div>
  );
};

export default TransmissionPlayer;
