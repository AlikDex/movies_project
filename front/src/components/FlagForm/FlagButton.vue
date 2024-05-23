<template>
  <div class="flag-button" @click.prevent="open">
    <slot></slot>
  </div>
</template>

<script>
import FlagModal from './FlagModal.vue'

export default {
  name: 'FlagButton',
  props: {
    action: {
      type: String,
      default: 'block'
    },
    videoId: {
      type: Number,
      default: 0
    },
    modalOptions: {
      type: Object,
      default: () => ({
        width: '100%',
        maxWidth: 600,
        height: 'auto',
        adaptive: true,
        pivotY: 0.5,
        name: 'FlagModal'
      })
    }
  },
  data () {
    return {
      opened: false
    }
  },
  mounted () {
    this.$root.$on('flag-close', () => {
      this.opened = false
    })
  },
  methods: {
    open () {
      if (this.action === 'modal') {
        this.openModal()
      } else {
        this.opened = !this.opened

        if (this.opened === true) {
          this.$root.$emit('flag-open', this.videoId)
        } else {
          this.$root.$emit('flag-close')
        }
      }
    },
    openModal () {
      this.$modal.show(FlagModal, {
        videoId: this.videoId
      }, this.modalOptions)
    }
  }
}
</script>
