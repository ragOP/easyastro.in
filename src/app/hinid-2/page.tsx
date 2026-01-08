export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}>
      <iframe
        src="https://destiny-canvas-maker.lovable.app/"
        title="EasyAstra Quiz"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        allow="camera; microphone; fullscreen"
      />
    </div>
  );
}
