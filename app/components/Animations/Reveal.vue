<template>
  <Motion
    :as="as"
    :class="$attrs.class"
    :initial="initial"
    :while-in-view="whileInView"
    :in-view-options="{ once: true }"
    :transition="transition"
  >
    <slot />
  </Motion>
</template>

<script setup lang="ts">
import { Motion } from "motion-v";

type Direction = "up" | "down" | "left" | "right";
type AnimationType = "fade-slide" | "fade" | "slide" | "scale";

const props = withDefaults(
  defineProps<{
    as?: string;
    type?: AnimationType;
    direction?: Direction;
    distance?: number;
    duration?: number;
    delay?: number;
  }>(),
  {
    as: "div",
    type: "fade-slide",
    direction: "up",
    distance: 24,
    duration: 0.5,
    delay: 0,
  },
);

const prefersReduced = import.meta.client
  ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
  : false;

const neutral = { x: 0, y: 0, opacity: 1, scale: 1 };

const initial = computed(() => {
  if (prefersReduced) return neutral;

  const offset = props.distance;
  const translate: Record<Direction, { x: number; y: number }> = {
    up: { x: 0, y: offset },
    down: { x: 0, y: -offset },
    left: { x: offset, y: 0 },
    right: { x: -offset, y: 0 },
  };
  const { x, y } = translate[props.direction];

  if (props.type === "fade") return { x: 0, y: 0, opacity: 0, scale: 1 };
  if (props.type === "slide") return { x, y, opacity: 1, scale: 1 };
  if (props.type === "scale") return { x: 0, y: 0, opacity: 0, scale: 0.9 };
  return { x, y, opacity: 0, scale: 1 };
});

const whileInView = computed(() => neutral);

const transition = computed(() => ({
  duration: prefersReduced ? 0 : props.duration,
  delay: prefersReduced ? 0 : props.delay,
  ease: "easeOut",
}));
</script>
