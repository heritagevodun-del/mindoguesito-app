"use client";

import { useState, useRef, useEffect } from "react";

// 1. CORRECTION : On définit un "Type" précis pour les messages (plus de 'any')
interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  // On utilise notre nouveau type Message[]
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages]);

  async function sendMessage(e?: React.FormEvent, textOverride?: string) {
    e?.preventDefault();
    const content = textOverride || input;
    if (!content.trim()) return;

    // TypeScript est content : on respecte le format Message
    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `⚠️ PROBLÈME : ${errorText}` },
        ]);
      } else {
        const reply = await response.text();
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      }
    } catch (err) {
      // 2. CORRECTION : On utilise la variable 'err' pour le debug (plus d'erreur "unused")
      console.error("Erreur détectée :", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Erreur de connexion internet." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#FDFBF7] text-gray-800 font-sans">
      <header className="p-4 border-b border-amber-100 bg-white/50 backdrop-blur text-center font-bold text-amber-900 font-serif">
        Mindoguesito (Mode Diagnostic)
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center mt-20 space-y-4">
            <p className="text-gray-500">
              Posez une question pour tester le cerveau du Sage.
            </p>
            {/* 3. CORRECTION : On utilise &quot; pour les guillemets */}
            <button
              onClick={() => sendMessage(undefined, "Bonjour")}
              className="px-4 py-2 bg-amber-100 text-amber-900 rounded-lg"
            >
              Essayer &quot;Bonjour&quot;
            </button>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl max-w-[85%] ${
              m.role === "user"
                ? "ml-auto bg-amber-900 text-white"
                : "mr-auto bg-white border border-gray-200"
            }`}
          >
            {m.content}
          </div>
        ))}
        {isLoading && (
          <div className="text-sm text-gray-400 animate-pulse">
            Le Sage réfléchit...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={(e) => sendMessage(e)}
        className="p-4 bg-white border-t border-gray-100"
      >
        <input
          className="w-full p-3 border rounded-full"
          placeholder="Écrivez ici..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
      </form>
    </div>
  );
}
