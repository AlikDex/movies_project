<template>
  <div class="flag-modal">
    <header class="flag-modal__header">
      <h3 class="flag-modal__title">Жалоба на видео</h3>
      <button @click="close" class="close-modal">
        <svg viewBox="0 0 512 512" class="close-modal__icon">
          <g transform="matrix(0.52329441,0,0,0.52329441,-5.6076363,-5.7230303)">
            <path d="M 500,442.7 79.3,22.6 C 63.4,6.7 37.7,6.7 21.9,22.5 6.1,38.3 6.1,64 22,79.9 L 442.6,500 22,920.1 C 6,936 6.1,961.6 21.9,977.5 c 15.8,15.8 41.6,15.8 57.4,-0.1 L 500,557.3 920.7,977.4 c 16,15.9 41.6,15.9 57.4,0.1 15.8,-15.8 15.8,-41.5 -0.1,-57.4 L 557.4,500 978,79.9 C 994,64 993.9,38.4 978.1,22.5 962.3,6.7 936.5,6.7 920.7,22.6 Z" />
          </g>
        </svg>
      </button>
    </header>

    <section class="flag-modal__body">
      <flag-form :video-id="videoId" @close="close"></flag-form>
    </section>
  </div>
</template>

<script>

import FlagForm from './FlagForm'

export default {
  name: 'FlagModal',
  components: {
    FlagForm
  },
  props: {
    videoId: {
      type: Number,
      default: 0
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
