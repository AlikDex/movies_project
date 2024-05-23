<template>
  <LightGallery :settings="{
    speed: 500,
    mobileSettings: {
      controls: false,
      showCloseIcon: true,
      download: true
    },
    getCaptionFromTitleOrAlt: false,
    plugins: plugins
  }">
    <slot />
  </LightGallery>
</template>

<script setup lang="ts">
import LightGallery from 'lightgallery/vue'
import lgZoom from 'lightgallery/plugins/zoom'
import lgFullScreen from 'lightgallery/plugins/fullscreen'

const plugins = [lgZoom, lgFullScreen]
</script>

<style lang="css" scoped>
  @import 'lightgallery/css/lightgallery.css';
  @import 'lightgallery/css/lg-thumbnail.css';
  @import 'lightgallery/css/lg-zoom.css';
  @import 'lightgallery/css/lg-fullscreen.css';
</style>

