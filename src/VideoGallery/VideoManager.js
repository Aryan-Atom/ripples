const VideoManager = {
  activeId: null,
  activeVideo: null,

  setActive(id, videoElement) {
    if (!videoElement) return
    if (this.activeVideo === videoElement && this.activeId === id) return

    this.pauseActive()
    this.activeId = id
    this.activeVideo = videoElement
  },

  pauseActive() {
    if (!this.activeVideo) return

    try {
      this.activeVideo.pause()
      this.activeVideo.currentTime = 0
    } catch {
      // Ignore on cleanup if playback already stopped.
    }

    this.activeId = null
    this.activeVideo = null
  },

  releaseIfCurrent(videoElement) {
    if (this.activeVideo !== videoElement) return
    this.pauseActive()
  },
}

export default VideoManager
