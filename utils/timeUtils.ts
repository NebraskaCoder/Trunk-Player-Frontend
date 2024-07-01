import dayjs from "dayjs";

/**
 * Convert seconds to minutes and seconds as a string
 * @param seconds - seconds to convert
 * @returns minutes and seconds string
 */
export const secToMinSecStr = (seconds: number) => {
  return dayjs().startOf("day").add(seconds, "seconds").format("mm:ss");
};
