<template>
  <div class="scroll-to-top" :class="{ '-show': isShow }" @click.prevent="scrollTop">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps } from 'vue'

type ComponentProperties = {
  offset?: number;
  offsetOpacity?: number;
  duration?: number;
}

const scrolling = ref<boolean>(false)
const lastScrollOffset = ref<number>(0)
const isShow = ref<boolean>(false)

const props = withDefaults(defineProps<ComponentProperties>(), {
  offset: 300,
  offsetOpacity: 1200,
  duration: 700
})

const detectScrolling = (): void => {
  if (scrolling.value === false) {
    scrolling.value = true

    !window.requestAnimationFrame ? setTimeout(checkBackToTop, 250) : window.requestAnimationFrame(checkBackToTop)
  }

  const scrollOffset = window.scrollY || document.documentElement.scrollTop // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"

  isShow.value = ((scrollOffset < lastScrollOffset.value && scrollOffset >= props.offset))

  lastScrollOffset.value = scrollOffset <= 0 ? 0 : scrollOffset // For Mobile or negative scrolling
}

const checkBackToTop = () => {
  const scrollOffset = window.scrollY || document.documentElement.scrollTop

  if (isShow.value === true && scrollOffset <= props.offset) {
    isShow.value = false
  }

  scrolling.value = false
}

const scrollTop = () => {
  if (!window.requestAnimationFrame) {
    window.scrollTo(0, 0)

    return
  }

  const start = window.scrollY || document.documentElement.scrollTop
  let currentTime = 0

  const animateScroll = (timestamp: number) => {
    if (!currentTime) {
      currentTime = timestamp
    }

    const progress = timestamp - currentTime
    const val = Math.max(easeInOutQuad(progress, start, -start, props.duration), 0)

    window.scrollTo(0, val)

    if (progress < props.duration) {
      window.requestAnimationFrame(animateScroll)
    }
  }

  window.requestAnimationFrame(animateScroll)
}

const easeInOutQuad = (t: number, b: number, c: number, d: number): number => {
  t /= d / 2

  if (t < 1) {
    return c / 2 * t * t + b
  }

  t--

  return -c / 2 * (t * (t - 2) - 1) + b
}

window.addEventListener('scroll', detectScrolling)
// window.removeEventListener('scroll', detectScrolling)
</script>
