export type RotatorConfig = {
  enabled: boolean;
  sendReportUrl: string;
  galleryWatchAttrName: string,
  categoryWatchAttrName: string
}

export default <RotatorConfig>{
  enabled: false,
  sendReportUrl: '/api/v1/gallery/watch-stats/',
  galleryWatchAttrName: 'data-gw',
  categoryWatchAttrName: 'data-gcw'
}
