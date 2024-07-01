/* eslint-disable react/jsx-no-literals */
import TransmissionPlayer from "../TransmissionPlayer";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Radio/TransmissionPlayer",
  component: TransmissionPlayer,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof TransmissionPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

const downloadSrc = "https://www.example.com/audio.mp3";

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const NormalTransmission: Story = {
  args: {
    downloadSrc,
    currentTimeSeconds: 38,
    durationSeconds: 120,
    audioPlayingState: "stopped",
    showPlayPause: true,
    isEmergency: false,
    showDownloadLink: true,
    showVolumeControl: true,
  },
};

export const EmergencyTransmission: Story = {
  args: {
    downloadSrc,
    currentTimeSeconds: 0,
    audioPlayingState: "stopped",
    showPlayPause: true,
    isEmergency: true,
    showDownloadLink: true,
    showVolumeControl: true,
  },
};

export const NoControlsWithDownloadButtonTransmission: Story = {
  args: {
    downloadSrc,
    currentTimeSeconds: 42,
    durationSeconds: 78,
    audioPlayingState: "stopped",
    disableSlider: true,
    showPlayPause: false,
    isEmergency: false,
    showDownloadLink: true,
    showVolumeControl: false,
  },
};
