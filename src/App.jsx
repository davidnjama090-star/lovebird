import { useState, useEffect } from "react";

export default function App() {
  const [stage, setStage] = useState("welcome");
  const [name, setName] = useState("Essy");
  const [typed, setTyped] = useState("");

  const message =
    "Dear Essy ❤️\n\nYou are the most special person in my life. Every moment with you feels like magic.";

  // 💌 typing effect
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

  return (
    <div style={styles.container}>
      {/* 🌸 WELCOME */}
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

      {/* 💌 LETTER */}
      {stage === "letter" && (
        <div style={styles.card}>
          <h2>💌 For {name}</h2>
          <pre style={styles.text}>{typed}</pre>

          <button style={styles.button} onClick={() => setStage("proposal")}>
            Next 💍
          </button>
        </div>
      )}

      {/* 💍 PROPOSAL */}
      {stage === "proposal" && (
        <div style={styles.card}>
          <h1>💍 {name}...</h1>

          <h2>Will you be mine forever? ❤️</h2>

          <button
            style={styles.yes}
            onClick={() => setStage("final")}
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

      {/* 💖 FINAL */}
      {stage === "final" && (
        <div style={styles.card}>
          <h1>💖 She Said YES 💖</h1>
          <p>Forever with {name} ❤️</p>
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
    background: "linear-gradient(to right, #ffdde1, #ee9ca7)",
    fontFamily: "Arial",
    padding: "20px",
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },

  input: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid gray",
    marginTop: "10px",
    width: "80%",
  },

  button: {
    padding: "10px 20px",
    background: "crimson",
    color: "white",
    border: "none",
    borderRadius: "10px",
    marginTop: "15px",
    cursor: "pointer",
  },

  yes: {
    padding: "10px 20px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "10px",
    marginRight: "10px",
  },

  no: {
    padding: "10px 20px",
    background: "gray",
    color: "white",
    border: "none",
    borderRadius: "10px",
  },

  text: {
    whiteSpace: "pre-wrap",
    fontSize: "15px",
    lineHeight: "1.6",
  },
};