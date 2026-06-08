import confetti from "canvas-confetti";
import { useState, useEffect } from "react";

export default function App() {
  const [stage, setStage] = useState("welcome");
  const [name, setName] = useState("Essy");
  const [typed, setTyped] = useState("");
  const [playing, setPlaying] = useState(false);
  const [showPoem, setShowPoem] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const message =
`Dear ${name} ❤️

Before anything else, I want to say something from my heart.

I know there were moments when I hurt you, disappointed you, or failed to love you the way you deserved. I truly regret those moments, and I am genuinely sorry for every pain I caused you.

Please don’t let one mistake erase all the beautiful memories, laughter, and love we shared. What we have means so much to me.

You mean more to me than words can explain. Your smile, your heart, your presence — all of it brings light into my life.

I may not be perfect, but my feelings for you are real, and I want to become better for us.

Thank you for still being in my life ❤️`;

  const poem =
`Have you ever had something so sweet that you close your eyes just to take it in? That’s what loving you feels like.

If love had a flavour, it would be you — sweet like honey, warm like today’s breath, something I never get tired of.

Your voice is like rain on a hot day, calming everything it touches.

Your touch feels like the sweetest morning after a long night of waiting.

I didn’t know love could feel this natural, this effortless, this real.

But then you came along… and now it feels like I’ve known it all my life ❤️`;

  useEffect(() => {
    if (stage === "letter") {
      let i = 0;
      setTyped("");

      const interval = setInterval(() => {
        setTyped(message.slice(0, i));
        i++;
        if (i > message.length) clearInterval(interval);
      }, 20);

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

      {/* WELCOME */}
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

      {/* LETTER */}
      {stage === "letter" && (
        <div style={styles.card}>
          <h2>💌 For {name}</h2>
          <pre style={styles.text}>{typed}</pre>

          <button style={styles.button} onClick={() => setStage("proposal")}>
            Next 💍
          </button>
        </div>
      )}

      {/* PROPOSAL */}
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

      {/* FINAL */}
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

          {/* POEM BUTTON */}
          <button
            style={styles.button}
            onClick={() => setShowPoem(!showPoem)}
          >
            💌 Read Poem
          </button>

          {/* POEM */}
          {showPoem && (
            <pre style={{ ...styles.text, marginTop: "15px" }}>
              {poem}
            </pre>
          )}

          {/* GALLERY BUTTON */}
          <button
            style={styles.button}
            onClick={() => setShowGallery(!showGallery)}
          >
            🖼️ Memories
          </button>

          {/* GALLERY */}
          {showGallery && (
            <div style={styles.gallery}>
              <img src="/photo1.jpg" style={styles.img} />
              <img src="/photo2.jpg" style={styles.img} />
              <img src="/photo3.jpg" style={styles.img} />
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
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "420px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
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
    fontSize: "14px",
    lineHeight: "1.6",
    textAlign: "left",
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