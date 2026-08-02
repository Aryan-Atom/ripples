const VideoManager = {
  activeVideo: null,
  setActive(video) {
    if (this.activeVideo === video) return
    this.pauseActive()
    this.activeVideo = video
  },
  pauseActive() {
    if (!this.activeVideo) return
    try {
      this.activeVideo.pause()
      this.activeVideo.currentTime = 0
    } catch {
      // ignore cleanup failures
    }
    this.activeVideo = null
  },
  release(video) {
    if (this.activeVideo === video) {
      this.pauseActive()
    }
  },
}

export default VideoManager
