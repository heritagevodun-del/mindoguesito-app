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

  // Scroll automatique fluide
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Suggestions en mode "Cartes Élégantes"
  const suggestedQuestions = [
    {
      icon: "🌿",
      title: "Nature & Esprits",
      text: "Le Vodun est-il une religion de paix ?",
    },
    {
      icon: "🏛️",
      title: "Histoire Sacrée",
      text: "Pourquoi Ouidah est la 'Rome' du Vodun ?",
    },
    {
      icon: "🐍",
      title: "Symboles",
      text: "Quelle est la signification du Python Sacré ?",
    },
    {
      icon: "⛓️",
      title: "Mémoire",
      text: "Raconte-moi la Porte du Non-Retour",
    },
  ];

  return (
    // Ajout de 'bg-noise' pour la texture papier premium
    <main className="flex flex-col h-[100dvh] bg-ouidah-sable bg-noise text-ouidah-indigo font-sans overflow-hidden selection:bg-ouidah-terre selection:text-white relative">
      {/* 1. HEADER PRESTIGE */}
      <header className="fixed top-0 w-full z-50 transition-all duration-300">
        {/* Fond flouté dégradé pour une fusion parfaite */}
        <div className="absolute inset-0 bg-gradient-to-b from-ouidah-sable/95 via-ouidah-sable/80 to-transparent backdrop-blur-sm"></div>

        <div className="max-w-4xl mx-auto px-4 py-4 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ouidah-terre text-white flex items-center justify-center text-lg shadow-md border-2 border-ouidah-or/30">
              🧘🏾‍♂️
            </div>
            <div>
              <h1 className="text-lg font-serif font-bold text-ouidah-indigo tracking-wide leading-none">
                Mindoguesito
              </h1>
              <p className="text-[10px] uppercase tracking-[0.25em] text-ouidah-terre/80 font-bold mt-1">
                Le Sage de Ouidah
              </p>
            </div>
          </div>

          {/* 👇 NOUVEAU BADGE "GUIDE" ATTRAYANT */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-full bg-white/50 border border-ouidah-or/20 font-semibold text-ouidah-terre shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Guide Spirituel Connecté
          </div>
        </div>
      </header>

      {/* 2. ZONE DE CHAT */}
      <div className="flex-1 overflow-y-auto pt-28 pb-40 px-4 no-scrollbar scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* ÉTAT VIDE : ACCUEIL IMMERSIF */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[55vh] animate-fade-in">
              {/* Logo Central Animé */}
              <div className="mb-8 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-ouidah-or to-ouidah-terre rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
                <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border border-ouidah-kaolin">
                  <span className="text-5xl">🏛️</span>
                </div>
              </div>

              <div className="text-center space-y-3 max-w-lg mb-10">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-ouidah-indigo">
                  Kwabo, mon enfant.
                </h2>
                {/* 👇 APOSTROPHE CORRIGÉE ICI */}
                <p className="text-ouidah-gris text-base leading-relaxed font-light">
                  L&apos;arbre à palabres est ouvert. Je porte la mémoire des
                  temps anciens et la sagesse du Vodun.
                </p>
              </div>

              {/* Grille de Cartes Premium */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full px-2">
                {suggestedQuestions.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => append({ role: "user", content: item.text })}
                    className="flex items-start gap-4 p-5 bg-white/70 hover:bg-white border border-ouidah-or/10 hover:border-ouidah-terre/30 rounded-2xl text-left transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 group"
                  >
                    <span className="text-2xl bg-ouidah-kaolin p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </span>
                    <div>
                      <span className="block text-xs font-bold text-ouidah-terre uppercase tracking-wide mb-1 opacity-70 group-hover:opacity-100">
                        {item.title}
                      </span>
                      <span className="text-sm text-ouidah-indigo font-medium group-hover:text-ouidah-terre transition-colors">
                        {item.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* LISTE DES MESSAGES AVEC AVATARS */}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-4 w-full ${
                m.role === "user" ? "flex-row-reverse" : "flex-row"
              } animate-message-appear`}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm border border-white/50 ${
                  m.role === "user"
                    ? "bg-ouidah-indigo text-white"
                    : "bg-ouidah-terre text-white"
                }`}
              >
                {m.role === "user" ? "👤" : "🧘🏾‍♂️"}
              </div>

              {/* Bulle de Message */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-6 py-4 shadow-sm text-[15px] leading-7 ${
                  m.role === "user"
                    ? "bg-ouidah-indigo text-white rounded-tr-none"
                    : "bg-white border border-ouidah-or/15 text-ouidah-indigo rounded-tl-none"
                }`}
              >
                <div
                  className={`prose prose-sm max-w-none ${
                    m.role === "user"
                      ? "prose-invert text-white/90"
                      : "text-ouidah-indigo"
                  }`}
                >
                  <span
                    className={
                      m.role === "assistant" ? "font-serif" : "font-sans"
                    }
                  >
                    {m.content}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* LOADING STATE - Élégant */}
          {isLoading && (
            <div className="flex gap-4 w-full animate-fade-in">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ouidah-terre text-white flex items-center justify-center text-sm shadow-sm">
                🧘🏾‍♂️
              </div>
              <div className="bg-white border border-ouidah-or/20 px-6 py-4 rounded-2xl rounded-tl-none flex items-center gap-3 shadow-sm">
                <div className="flex space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-ouidah-terre rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-ouidah-terre rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-ouidah-terre rounded-full animate-bounce"></div>
                </div>
                <span className="text-xs font-semibold text-ouidah-gris tracking-wider">
                  Le Fâ révèle la vérité...
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="mx-auto max-w-md p-4 bg-red-50/80 backdrop-blur text-red-800 rounded-xl text-sm border border-red-100 text-center shadow-sm">
              <span className="font-bold block mb-1">
                Oups, les esprits sont silencieux.
              </span>
              <span className="text-xs opacity-80">{error.message}</span>
            </div>
          )}

          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* 3. INPUT AREA "FLOATING BAR" */}
      <div className="fixed bottom-0 left-0 w-full pt-10 pb-6 px-4 z-40">
        {/* Dégradé de fond pour masquer le texte qui défile dessous */}
        <div className="absolute inset-0 bg-gradient-to-t from-ouidah-sable via-ouidah-sable/95 to-transparent pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative">
          <form
            onSubmit={handleSubmit}
            className="relative shadow-2xl shadow-ouidah-indigo/5 rounded-full bg-white/80 backdrop-blur-xl border border-white/50 ring-1 ring-ouidah-indigo/5 transition-all duration-300 focus-within:ring-2 focus-within:ring-ouidah-terre/30 focus-within:scale-[1.01]"
          >
            <input
              className="w-full py-4 pl-6 pr-16 bg-transparent rounded-full focus:outline-none text-ouidah-indigo placeholder-ouidah-gris/60 font-medium text-base"
              value={input}
              onChange={handleInputChange}
              placeholder="Posez votre question au Sage..."
              aria-label="Votre message"
            />

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 bottom-2 aspect-square bg-ouidah-terre text-white rounded-full hover:bg-ouidah-indigo disabled:opacity-50 disabled:hover:bg-ouidah-terre transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center transform hover:rotate-12 active:scale-90"
              aria-label="Envoyer"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 ml-0.5"
                >
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              )}
            </button>
          </form>

          <p className="text-center text-[10px] text-ouidah-gris/60 mt-3 font-medium tracking-wide">
            Mindoguesito • Intelligence Artificielle & Culture Vodun
          </p>
        </div>
      </div>
    </main>
  );
}
