import type { RotatorOptions as VideoRotatorConfig} from '@/js/Rotator'

declare global {
  interface Window {
    AppConfig: AppConfig | undefined;
  }
}

type AppConfig = {
  videoRotator: Partial<VideoRotatorConfig>
}

const config: AppConfig = {
  videoRotator: {
    enabled: false,
  }
}

if (Object.prototype.hasOwnProperty.call(window, 'AppConfig')) {
  Object.assign(config, window.AppConfig)
}

export default config
