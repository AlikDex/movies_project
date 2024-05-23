<template>
  <div @click.prevent.stop="handleClick">
    <slot name="stop" v-if="props.isPlayNow"></slot>
    <slot name="play" v-else></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits } from 'vue'

type ComponentProperties = {
  isPlayNow?: boolean;
}

const props = withDefaults(defineProps<ComponentProperties>(), {
  isPlayNow: false
})

const emit = defineEmits(['start-play', 'stop-play'])

const handleClick = () => {
  if (!props.isPlayNow) {
    emit('start-play')
  } else {
    emit('stop-play')
  }
}
</script>
