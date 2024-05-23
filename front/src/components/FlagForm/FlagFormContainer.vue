<template>
  <div>
    <transition name="slide">
      <div class="flag-form-container" :class="{ show: show }" v-if="show">
        <flag-form :video-id="videoId"></flag-form>
      </div>
    </transition>
  </div>
</template>

<script>
import FlagForm from './FlagForm'

export default {
  name: 'FlagFormContainer',
  components: {
    FlagForm
  },
  data () {
    return {
      videoId: 0,
      show: false
    }
  },
  mounted () {
    this.$root.$on('flag-open', (videoId) => {
      this.show = true
      this.videoId = videoId
    })
    this.$root.$on('flag-close', () => {
      this.show = false
      this.videoId = 0
    })
  }
}
</script>

<style lang="scss">
.flag-form-container {
  overflow: hidden;
  max-height: 600px;
}

.slide-enter-active {
  transition: all 0.3s ease-out;
  animation-duration: 0.3s;
  animation-name: slidein;
}

.slide-leave-active {
  transition: all 0.3s ease-out;
  animation-duration: 0.3s;
  animation-name: slideout;
}

@keyframes slidein {
  from {
    max-height: 0;
  }

  to {
    max-height: 500px;
  }
}

@keyframes slideout {
  from {
    max-height: 500px;
  }

  to {
    max-height: 0;
  }
}
</style>
