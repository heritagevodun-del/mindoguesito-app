"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
    error,
  } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const suggestedQuestions = [
    "🌿 Le Vodun est-il une religion de paix ?",
    "🏛️ Pourquoi Ouidah est la 'Rome' du Vodun ?",
    "⛓️ Raconte-moi la Porte du Non-Retour",
  ];

  return (
    <div className="flex flex-col h-screen bg-[#FDFBF7] text-gray-800 font-sans">
      <header className="fixed top-0 w-full bg-[#FDFBF7]/95 backdrop-blur border-b border-amber-100 z-10 p-4 shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-center">
          <h1 className="text-xl font-serif font-bold text-amber-900 tracking-wide">
            Mindoguesito{" "}
            <span className="hidden sm:inline text-sm font-sans font-normal text-amber-700 opacity-80">
              | Le Sage de Ouidah
            </span>
          </h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pt-24 pb-32 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center space-y-8 mt-10 fade-in">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
                  🧘🏾‍♂️
                </div>
                <h2 className="text-2xl font-serif font-bold text-amber-950">
                  Dola (Bienvenue)
                </h2>
                <p className="text-gray-600 text-sm max-w-xs mx-auto">
                  Je suis le gardien de la mémoire. Posez votre question.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => append({ role: "user", content: q })}
                    className="p-4 bg-white border border-amber-100 rounded-xl text-left text-sm text-amber-900 hover:bg-amber-50 hover:border-amber-300 transition-all shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 shadow-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-amber-900 text-white rounded-br-none"
                    : "bg-white border border-amber-100 text-gray-800 rounded-bl-none"
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-white border border-amber-50 p-3 rounded-2xl text-xs font-bold text-amber-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></span>
                LE SAGE RÉFLÉCHIT...
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 text-center">
              Le lien spirituel est interrompu. Réessayez.
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7] to-transparent pt-10 pb-6 px-4">
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative shadow-xl rounded-full bg-white"
          >
            <input
              className="w-full p-4 pl-6 pr-12 bg-transparent border border-amber-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-800 placeholder-gray-400"
              value={input}
              onChange={handleInputChange}
              placeholder="Parlez au Sage..."
            />
            {/* CORRECTION ICI : Ajout de aria-label pour l'accessibilité */}
            <button
              type="submit"
              aria-label="Envoyer le message"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 p-2 bg-amber-900 text-white rounded-full hover:bg-amber-800 disabled:opacity-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
