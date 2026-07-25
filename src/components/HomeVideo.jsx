export default function HomeVideo() {
  return (
    <section className="home-video home-section" aria-label="Engineering showcase">
      <div className="home-video__frame">
        <video
          className="home-video__media"
          src="/assets/video_engineering.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
    </section>
  )
}
