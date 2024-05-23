export type RotatorConfig = {
  enabled: boolean;
  sendReportUrl: string;
  videoWatchAttrName: string,
  categoryWatchAttrName: string
}

export default <RotatorConfig>{
  enabled: false,
  sendReportUrl: '/api/v1/videos/rotator/',
  videoWatchAttrName: 'data-vw',
  categoryWatchAttrName: 'data-vcw'
}
