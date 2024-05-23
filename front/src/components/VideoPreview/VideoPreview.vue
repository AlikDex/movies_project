<template>
  <div :class="[cssClass, {'--play': display}]"
        @mouseenter="onPreviewMouseOver"
        @mouseleave="onPreviewMouseOut"
        @blur="onPreviewMouseOut"
        tabindex="-1">
    <div class="fake-progress" v-if="showProgress"><div class="fake-progress__bar"></div></div>
    <video :src="previewUrl"
            v-if="display"
            muted
            autoplay
            loop
            webkit-playsinline="true"
            playsinline="true"
            @loadstart="previewLoading"
            @canplay="previewLoaded"
            @error="previewLoadedWithError"
            @play="previewStartsPlay"
            @pause="previewEndsPlay"
            @contextmenu.prevent.stop="">
    </video>
    <slot @contextmenu.prevent.stop=""></slot>
    <play-preview-button :class="props.playButtonCssClass"
                         :is-play-now="isPlayed"
                         v-if="props.playButtonEnabled"
                         @start-play="startPlay"
                         @stop-play="stopPlay">
      <template #play>
        <i class="icon icon-circle-play"></i>
      </template>
      <template #stop>
        <i class="icon icon-circle-stop"></i>
      </template>
    </play-preview-button>
  </div>
</template>

<script lang="ts" setup>
import PlayPreviewButton from './PlayPreviewButton.vue'
import { defineEmits, defineProps, ref, withDefaults } from 'vue'

type ComponentProperties = {
  cssClass?: string;
  previewUrl: string;
  playButtonEnabled?: boolean;
  playButtonCssClass?: string;
}

const props = withDefaults(defineProps<ComponentProperties>(), {
  playButtonEnabled: true,
  playButtonCssClass: 'video-preview__play',
  cssClass: 'video-preview',
  previewUrl: ''
})

const emit = defineEmits(['preview-start', 'preview-end', 'preview-error'])

const showProgress = ref<boolean>(false)
const display = ref<boolean>(false)
const isPlayed = ref<boolean>(false)
const deferredPreviewPlayTimer = ref<ReturnType<typeof setTimeout>|null>(null)

// Handle direct click on button
// Starts playing without delay
const startPlay = () => {
  display.value = true
  window.addEventListener('blur', onWindowBlur)
}

const stopPlay = () => {
  display.value = false
  isPlayed.value = false

  removeDeferredTimer()
  window.removeEventListener('blur', onWindowBlur)
}

const previewStartsPlay = () => {
  isPlayed.value = true
}

const previewEndsPlay = () => {
  isPlayed.value = false
}

const previewLoading = () => {
  showProgress.value = true
}

const previewLoaded = () => {
  showProgress.value = false
}

const previewLoadedWithError = () => {
  showProgress.value = false
  display.value = false
  window.removeEventListener('blur', onWindowBlur)
  emit('preview-error')
}
// Handle mouse enter and mouse leave events
const removeDeferredTimer = () => {
  if (deferredPreviewPlayTimer.value !== null) {
    window.clearTimeout(deferredPreviewPlayTimer.value)
    deferredPreviewPlayTimer.value = null
  }
}

const playPreviewWithDelay = () => {
  if (deferredPreviewPlayTimer.value !== null) {
    return
  }

  deferredPreviewPlayTimer.value = setTimeout(() => {
    display.value = true
    window.addEventListener('blur', onWindowBlur)
    removeDeferredTimer()
  }, 400)
}

const onPreviewMouseOver = () => {
  playPreviewWithDelay()
}

const onPreviewMouseOut = (e: MouseEvent & { toElement: HTMLElement }) => {
  const el = e.toElement || e.relatedTarget

  //window.removeEventListener('blur', onWindowBlur)
  removeDeferredTimer()

  if (el && el.nodeName !== 'VIDEO') {
    if (display.value === true) {
      display.value = false
    }
  }
}

const onWindowBlur = () => {
  stopPlay()
}
</script>
