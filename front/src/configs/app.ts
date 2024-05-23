export default {
  abuseUrl: 'https://example.com/api/v1/abuse/',
  getVideoUrl: process.env.NODE_ENV === 'production'
               ? (id: number) => { return `/api/v1/video/${id}/` }
               : (id: number) => { return `/test/sources.json?id=${id}` }
}
