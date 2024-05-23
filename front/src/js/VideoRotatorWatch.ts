import defaultConfig from '@/configs/videoRotatorWatcher'
import type { RotatorConfig } from '@/configs/videoRotatorWatcher'
//import type { RotatorConfig }, defaultConfig from '@/configs/galleryRotatorWatcher'

type Stats = {
  categoriesClicked: Array<string>,
  videosViewed: Array<string>,
  videosClicked: Array<string>
}

const config = { ...defaultConfig }
const statsCollector: Stats = {
  categoriesClicked: [],
  videosViewed: [],
  videosClicked: []
}

const observerOptions = {
  root: null,
  threshold: 0.75
}

const handleIntersection: IntersectionObserverCallback = (entries, observer) => {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target
      const val = el.getAttribute(config.videoWatchAttrName)

      if (val !== null) {
        statsCollector.videosViewed.push(val)
      }

      observer.unobserve(entry.target);
    }
  })
}

const registerVideoClick = (id: string|null) => {
  if (id === null || statsCollector.videosClicked.indexOf(id) > -1) {
    return
  }

  statsCollector.videosClicked.push(id)
}

const registerCategoryClick = (id: string|null) => {
  if (id === null || statsCollector.categoriesClicked.indexOf(id) > -1) {
    return
  }

  statsCollector.categoriesClicked.push(id)
}

/**
 * Send report when window closer or move to other page
 */
const sendReport = (sendReportUrl: string, statsCollector: object) => {
  fetch(sendReportUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    cache: 'no-cache',
    keepalive: true,
    body: JSON.stringify(statsCollector)
  })
}

const configure = (newConf: RotatorConfig) => {
  Object.assign(config, { ...newConf })
}

const watch = () => {
  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  const videosThumbs = document.querySelectorAll(`[${config.videoWatchAttrName}]`)

  videosThumbs.forEach((el) => {
    observer.observe(el)

    el.addEventListener('click', () => {
      registerVideoClick(el.getAttribute(config.videoWatchAttrName))
    })
  })

  const observedCategories = document.querySelectorAll(`[${config.categoryWatchAttrName}]`)

  observedCategories.forEach((el) => {
    el.addEventListener('click', () => {
      registerCategoryClick(el.getAttribute(config.categoryWatchAttrName))
    })
  })

  window.addEventListener('pagehide', () => {
    sendReport(config.sendReportUrl, statsCollector)
  })
}

export {
  watch,
  configure
}
