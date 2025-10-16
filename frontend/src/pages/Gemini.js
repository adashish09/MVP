import React, { useState, useRef, useEffect } from "react";
import "../Styles/Gemini.css";

const Gemini = ({ navbarHeight = 70 }) => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages, loading]);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const userMessage = { id: Date.now(), role: "user", text: prompt };
    setMessages(prev => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const finalPrompt = `${prompt}\nTranslate the response in ${language}.`;

      const res = await fetch("http://localhost:8080/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      const data = await res.json();

      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";

      const botMessage = { id: Date.now() + 1, role: "bot", text };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now() + 2, role: "bot", text: "⚠️ Error fetching response." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="gemini-container"
      style={{ paddingTop: `${navbarHeight}px` }}
    >
      <div className="chat-header">

        <div className="chat-greeting">Hi, I am Kalyani</div>
      </div>

   <div className="chat-body">
  {messages.map((msg) => (
    <div key={msg.id} className={`chat-message-container ${msg.role}`}>
      <img
        src={
          msg.role === "user"
            ? "https://i.pravatar.cc/40?u=user" // user avatar
            : "https://i.pravatar.cc/40?u=ai"   // AI avatar
        }
        alt={msg.role}
        className="avatar"
      />
      <div className={`chat-message ${msg.role}`}>
        {msg.role === "bot" ? (
          <div
            className="bot-text"
            dangerouslySetInnerHTML={{
              __html: msg.text
                .replace(/\n/g, "<br/>")
                .replace(/`([^`]+)`/g, "<code>$1</code>")
                .replace(/^(> .+)$/gm, "<blockquote>$1</blockquote>"),
            }}
          />
        ) : (
          msg.text
        )}
      </div>
    </div>
  ))}
  {loading && (
    <div className="chat-message-container bot">
      <img
        src="https://i.pravatar.cc/40?u=ai"
        alt="bot"
        className="avatar"
      />
      <div className="chat-message bot">Thinking...</div>
    </div>
  )}
  <div ref={chatEndRef} />
</div>


      <div className="chat-input-container">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-select"
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Punjabi">Punjabi</option>
          <option value="Marathi">Marathi</option>
          <option value="Kannada">Kannada</option>
          <option value="Tamil">Tamil</option>
        </select>

        <input
          type="text"
          placeholder="Type your message..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="chat-input"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="send-btn"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Gemini;
