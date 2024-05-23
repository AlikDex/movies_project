import './assets/scss/main.scss'
import './assets/fonts/icons.css'
import { createApp } from 'vue'
import AppConfig from './js/AppConfig'
import ScrollToTop from './components/ScrollToTop.vue'
//import FlagButton from './components/FlagForm/FlagButton.vue'
//import FlagFormContainer from './components/FlagForm/FlagFormContainer.vue'
import VoteBox from './components/VoteBox.vue'
import VideoPreview from './components/VideoPreview/VideoPreview.vue'
import { watch as videoWatch } from './js/VideoRotatorWatch'

createApp({
  components: {
    ScrollToTop,
    //FlagButton,
    //FlagFormContainer,
    VoteBox,
    VideoPreview
  }
}).mount('#app')

if (AppConfig.videoRotator.enabled) {
  videoWatch()
}
