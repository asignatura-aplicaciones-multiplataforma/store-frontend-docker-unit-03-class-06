import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Chat({ username }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!username) return;

    const s = io("https://store-backend-1-0-0.onrender.com", {
      transports: ["websocket"],
      query: { username }
    });

    setSocket(s);

    s.on("messages", (msgs) => setMessages(msgs));

    s.on("new-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => s.disconnect();
  }, [username]);

  function sendMessage(e) {
    e.preventDefault();
    if (!text.trim()) return;

    socket.emit("new-message", {
      user: username,
      text
    });

    setText("");
  }

  return (
    <section style={{ marginTop: 40 }}>
      <h2>Chat</h2>

      <div
        style={{
          border: "1px solid #ddd",
          padding: 10,
          height: 250,
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Escribe..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "70%" }}
        />
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}
