import confetti from "canvas-confetti";
import { useState, useEffect } from "react";

export default function App() {
  const [stage, setStage] = useState("welcome");
  const [name, setName] = useState("Essy");
  const [typed, setTyped] = useState("");
  const [playing, setPlaying] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const message =
    "Dear Essy ❤️\n\nYou are the most special person in my life. Every moment with you feels like magic. Thank you for being in my life. I hope this little surprise makes you smile 💖";

  useEffect(() => {
    if (stage === "letter") {
      let i = 0;
      setTyped("");

      const interval = setInterval(() => {
        setTyped(message.slice(0, i));
        i++;
        if (i > message.length) clearInterval(interval);
      }, 40);

      return () => clearInterval(interval);
    }
  }, [stage]);

  const toggleMusic = () => {
    const audio = document.getElementById("bg-music");

    if (!playing) {
      audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            color: "white",
            fontSize: "12px",
            opacity: Math.random(),
          }}
        >
          ✦
        </span>
      ))}

      {/* Welcome */}
      {stage === "welcome" && (
        <div style={styles.card}>
          <h1>💖 Welcome</h1>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <button style={styles.button} onClick={() => setStage("letter")}>
            Enter 💌
          </button>
        </div>
      )}

      {/* Letter */}
      {stage === "letter" && (
        <div style={styles.card}>
          <h2>💌 For {name}</h2>
          <pre style={styles.text}>{typed}</pre>

          <button style={styles.button} onClick={() => setStage("proposal")}>
            Next 💍
          </button>
        </div>
      )}

      {/* Proposal */}
      {stage === "proposal" && (
        <div style={styles.card}>
          <h1>💍 {name}...</h1>
          <h2>Will you be mine forever? ❤️</h2>

          <button
            style={styles.yes}
            onClick={() => {
              confetti({
                particleCount: 250,
                spread: 120,
                origin: { y: 0.6 },
              });
              setStage("final");
            }}
          >
            YES 💖
          </button>

          <button
            style={styles.no}
            onClick={() => alert("I’ll wait for you ❤️")}
          >
            NO 💔
          </button>
        </div>
      )}

      {/* Final */}
      {stage === "final" && (
        <div style={styles.card}>
          <h1>💖 She Said YES 💖</h1>
          <p>Forever with {name} ❤️</p>

          <audio id="bg-music" loop>
            <source src="/music.mp3" type="audio/mpeg" />
          </audio>

          <button style={styles.button} onClick={toggleMusic}>
            {playing ? "⏸ Pause Music" : "🎵 Play Music"}
          </button>

          <button
            style={styles.button}
            onClick={() => setShowGallery(!showGallery)}
          >
            🖼️ Memories
          </button>

          {showGallery && (
            <div style={styles.gallery}>
              <img src="/photo1.jpg" alt="" style={styles.img} />
              <img src="/photo2.jpg" alt="" style={styles.img} />
              <img src="/photo3.jpg" alt="" style={styles.img} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #141e30, #243b55)",
    fontFamily: "Arial",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "420px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    zIndex: 10,
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid gray",
    width: "80%",
    marginTop: "10px",
  },

  button: {
    padding: "12px 20px",
    background: "crimson",
    color: "white",
    border: "none",
    borderRadius: "10px",
    marginTop: "15px",
    cursor: "pointer",
    display: "block",
    marginInline: "auto",
  },

  yes: {
    padding: "12px 20px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "10px",
    marginRight: "10px",
    cursor: "pointer",
  },

  no: {
    padding: "12px 20px",
    background: "gray",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },

  text: {
    whiteSpace: "pre-wrap",
    fontSize: "15px",
    lineHeight: "1.6",
  },

  gallery: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "15px",
  },

  img: {
    width: "100px",
    height: "100px",
    borderRadius: "12px",
    objectFit: "cover",
  },
};