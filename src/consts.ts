import { Filter } from "./types";

export const imgFilters: {[key in Filter]: string} = {
  1: "brightness(100%) contrast(100%) grayscale(0%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(100%) sepia(0%)",
  2: "brightness(104%) contrast(104%) grayscale(0%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(122%) sepia(0%)",
  3: "brightness(100%) contrast(107%) grayscale(0%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(165%) sepia(50%)",
  4: "brightness(105%) contrast(100%) grayscale(100%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(100%) sepia(50%)",
  5: "brightness(110%) contrast(114%) grayscale(0%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(122%) sepia(0%)"
}