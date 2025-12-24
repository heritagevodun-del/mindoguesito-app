"use client";

import { useChat, Message } from "ai/react";
import { useEffect, useRef, useState } from "react";

// Structure d'une session archivée
interface ArchivedChat {
  id: string;
  title: string;
  date: string;
  messages: Message[];
}

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
    error,
    setMessages,
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // État pour stocker l'historique
  const [archivedChats, setArchivedChats] = useState<ArchivedChat[]>([]);

  // 1. Au chargement, on récupère la mémoire du navigateur
  useEffect(() => {
    setTimeout(() => {
      const savedHistory = localStorage.getItem("mindoguesito_history");
      if (savedHistory) {
        try {
          setArchivedChats(JSON.parse(savedHistory));
        } catch (e) {
          console.error("Erreur lecture historique", e);
        }
      }
    }, 0);
  }, []);

  // Scroll automatique fluide
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // 2. Fonction pour SAUVEGARDER et créer un nouveau chat
  const handleNewChat = () => {
    if (messages.length > 0) {
      const newArchive: ArchivedChat = {
        id: Date.now().toString(),
        title: messages[0].content.substring(0, 30) + "...",
        date: new Date().toLocaleDateString(),
        messages: messages,
      };

      const updatedHistory = [newArchive, ...archivedChats];
      setArchivedChats(updatedHistory);
      localStorage.setItem(
        "mindoguesito_history",
        JSON.stringify(updatedHistory)
      );

      setMessages([]);
      setIsSidebarOpen(false);
    }
  };

  // 3. Fonction pour CHARGER une ancienne discussion
  const loadChat = (chat: ArchivedChat) => {
    if (
      confirm(
        "Charger cette ancienne discussion ? La discussion actuelle non sauvegardée sera perdue."
      )
    ) {
      setMessages(chat.messages);
      setIsSidebarOpen(false);
    }
  };

  // Fonction pour supprimer une archive
  const deleteChat = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm("Oublier ce souvenir définitivement ?")) {
      const updatedHistory = archivedChats.filter((c) => c.id !== id);
      setArchivedChats(updatedHistory);
      localStorage.setItem(
        "mindoguesito_history",
        JSON.stringify(updatedHistory)
      );
    }
  };

  // 👇 FONCTION CORRIGÉE (Plus d'erreur 'err unused')
  const handleShare = async () => {
    const shareData = {
      title: "MINDOGUESITO",
      text: "Discute avec le Sage numérique de Ouidah. Une expérience unique sur le Vodun.",
      url: "https://mindoguesito.com",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // On utilise la variable 'err' pour calmer le linter
        console.log("Partage annulé ou erreur:", err);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert("✨ Lien du Temple copié ! Partagez-le avec vos proches.");
    }
  };

  const suggestions = [
    { icon: "🌿", text: "Le Vodun et la nature" },
    { icon: "🐍", text: "Histoire du Python Sacré" },
    { icon: "🚪", text: "La Porte du Non-Retour" },
    { icon: "🕊️", text: "Philosophie de paix" },
  ];

  return (
    <div className="flex h-[100dvh] bg-ouidah-sable font-sans overflow-hidden relative selection:bg-ouidah-terre selection:text-white">
      {/* --- 1. SIDEBAR (Navigation de Gauche) --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`
        fixed md:relative z-50 h-full w-[280px] bg-ouidah-indigo text-ouidah-kaolin flex flex-col transition-transform duration-300 shadow-2xl md:shadow-none border-r border-white/5
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }
      `}
      >
        {/* Logo Sidebar */}
        <div className="p-6 pb-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ouidah-or to-[#8B4513] flex items-center justify-center text-white shadow-lg border border-white/20">
              🏛️
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg text-white tracking-wide leading-none">
                MINDOGUESITO
              </h1>
              <span className="text-[10px] uppercase tracking-[0.25em] text-ouidah-or/80 font-bold block mt-1">
                IA Vodun
              </span>
            </div>
          </div>

          {/* Bouton Nouveau Chat */}
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/5 hover:border-ouidah-or/50 group"
          >
            <span className="text-xl font-light group-hover:rotate-90 transition-transform duration-300">
              +
            </span>
            <span className="text-sm font-medium">Nouvelle discussion</span>
          </button>
        </div>

        {/* Historique RÉEL */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
          <p className="text-[10px] font-bold text-ouidah-gris uppercase tracking-widest mb-3 pl-2 opacity-60">
            Mémoire
          </p>

          {archivedChats.length > 0 ? (
            archivedChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => loadChat(chat)}
                className="group flex items-center justify-between text-sm text-white/80 px-3 py-3 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 hover:text-white transition-all hover:border-ouidah-or/30"
              >
                <div className="truncate flex-1 pr-2">
                  <span className="mr-2">💬</span> {chat.title}
                </div>
                <button
                  onClick={(e) => deleteChat(e, chat.id)}
                  className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-red-400 p-1 transition-opacity"
                  title="Supprimer"
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <div className="text-sm text-white/30 px-3 italic text-center py-4 border border-dashed border-white/10 rounded-lg">
              Aucune archive...
            </div>
          )}
        </div>

        {/* Pied de page Sidebar */}
        <div className="p-4 border-t border-white/10 space-y-1 bg-black/20">
          {/* Bouton Partager */}
          <button
            onClick={handleShare}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 text-sm text-ouidah-or font-medium hover:text-white transition-colors group text-left mb-2 border border-ouidah-or/20 hover:border-ouidah-or/50"
          >
            <span className="group-hover:scale-110 transition-transform">
              ✨
            </span>{" "}
            Partager le Temple
          </button>

          <a
            href="https://www.heritagevodun.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-ouidah-kaolin/80 hover:text-white transition-colors group"
          >
            <span className="group-hover:scale-110 transition-transform">
              🌍
            </span>{" "}
            Retour au Site Web
          </a>
          <a
            href="https://www.heritagevodun.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-ouidah-kaolin/80 hover:text-white transition-colors group"
          >
            <span className="group-hover:scale-110 transition-transform">
              💌
            </span>{" "}
            Contacter le Temple
          </a>

          <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-ouidah-terre text-white flex items-center justify-center text-xs font-bold border border-white/20">
              V
            </div>
            <div className="text-xs">
              <p className="font-bold text-white">Visiteur</p>
              <p className="text-white/40">Mode Invité</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- 2. MAIN CONTENT (Zone de Chat) --- */}
      <main className="flex-1 flex flex-col h-full bg-ouidah-sable relative w-full">
        {/* Texture Papier subtile */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40 pointer-events-none mix-blend-multiply"></div>

        {/* Header Mobile Only */}
        <header className="md:hidden flex items-center justify-between p-4 bg-ouidah-sable/90 backdrop-blur border-b border-ouidah-or/10 z-30 sticky top-0">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-ouidah-indigo hover:bg-black/5 rounded-full transition-colors"
            aria-label="Ouvrir le menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <span className="font-serif font-bold text-ouidah-indigo">
            MINDOGUESITO
          </span>
          <div className="w-8"></div>
        </header>

        {/* Zone de Messages Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth relative z-10">
          <div className="max-w-3xl mx-auto space-y-6 pb-32">
            {/* État Vide (Accueil) */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in text-center px-4">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border border-ouidah-or/20 mb-8 relative group">
                  <div className="absolute inset-0 rounded-full bg-ouidah-or/10 animate-pulse-slow"></div>
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-500">
                    🧘🏾‍♂️
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-serif font-bold text-ouidah-indigo mb-4 leading-tight">
                  Kwabo, mon enfant.
                </h2>
                <p className="text-ouidah-gris max-w-lg mb-10 text-lg font-light">
                  Je suis la mémoire vivante. Pose-moi une question sur les
                  rites, l&apos;histoire ou la sagesse du Vodun.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => append({ role: "user", content: s.text })}
                      className="p-4 bg-white/70 hover:bg-white border border-ouidah-or/10 hover:border-ouidah-terre/30 rounded-xl text-left text-sm text-ouidah-indigo shadow-sm hover:shadow-md transition-all flex items-center gap-3 group"
                    >
                      <span className="text-xl bg-ouidah-kaolin p-1.5 rounded-md group-hover:scale-110 transition-transform">
                        {s.icon}
                      </span>
                      <span className="font-medium">{s.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Liste des Messages */}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-4 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                } animate-message-appear group`}
              >
                {m.role !== "user" && (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-ouidah-terre to-[#8B4513] text-white flex items-center justify-center text-sm shadow-md border border-white/20 flex-shrink-0 mt-1">
                    🧘🏾‍♂️
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-6 py-4 text-[15px] leading-7 shadow-sm transition-all ${
                    m.role === "user"
                      ? "bg-ouidah-indigo text-white rounded-tr-none shadow-indigo-900/10"
                      : "bg-white border border-ouidah-or/15 text-ouidah-indigo rounded-tl-none"
                  }`}
                >
                  <div
                    className={`prose prose-sm max-w-none ${
                      m.role === "user" ? "prose-invert" : "text-ouidah-indigo"
                    }`}
                  >
                    <span
                      className={
                        m.role === "assistant" ? "font-serif" : "font-sans"
                      }
                    >
                      {/* 👇 RENDU DU TEXTE AVEC LIENS CLIQUABLES ET GRAS */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: m.content
                            // 1. Détection des Liens (URL) -> Devient un lien cliquable stylisé
                            .replace(
                              /(https?:\/\/[^\s]+)/g,
                              '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-ouidah-terre font-bold underline decoration-ouidah-or/50 hover:text-ouidah-indigo hover:decoration-ouidah-indigo transition-colors" title="Ouvrir le lien">$1</a>'
                            )
                            // 2. Gestion du Markdown Gras (**texte**)
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                            // 3. Gestion des retours à la ligne
                            .replace(/\n/g, "<br />"),
                        }}
                      />
                    </span>
                  </div>
                </div>

                {m.role === "user" && (
                  <div className="w-9 h-9 rounded-full bg-ouidah-indigo text-white flex items-center justify-center text-sm shadow-md border border-white/10 flex-shrink-0 mt-1">
                    👤
                  </div>
                )}
              </div>
            ))}

            {/* Animation de Chargement */}
            {isLoading && (
              <div className="flex gap-4 animate-fade-in">
                <div className="w-9 h-9 rounded-full bg-ouidah-terre text-white flex items-center justify-center text-sm flex-shrink-0">
                  🧘🏾‍♂️
                </div>
                <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-none shadow-sm border border-ouidah-or/10 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-ouidah-or rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-ouidah-or rounded-full animate-bounce [animation-delay:0.1s]"></div>
                  <div className="w-1.5 h-1.5 bg-ouidah-or rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <span className="text-xs text-ouidah-gris ml-2 font-medium italic">
                    Le Sage consulte le Fâ...
                  </span>
                </div>
              </div>
            )}

            {/* Affichage des Erreurs */}
            {error && (
              <div className="mx-auto max-w-md p-4 bg-red-50 text-red-800 text-sm text-center rounded-xl border border-red-100 shadow-sm">
                Une perturbation mystique empêche la réponse. Veuillez
                réessayer.
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Zone de Saisie (Flottante) */}
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 z-20">
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ouidah-sable via-ouidah-sable/95 to-transparent pointer-events-none"></div>

          <div className="max-w-3xl mx-auto relative">
            <form
              onSubmit={handleSubmit}
              className="relative shadow-2xl shadow-ouidah-indigo/5 rounded-full bg-white transition-all hover:shadow-ouidah-terre/10 focus-within:ring-2 focus-within:ring-ouidah-terre/20 focus-within:scale-[1.01]"
            >
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Posez votre question au Sage..."
                className="w-full py-4 pl-6 pr-14 bg-transparent rounded-full focus:outline-none text-ouidah-indigo placeholder-ouidah-gris/60 text-base"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-2 bottom-2 aspect-square bg-ouidah-terre text-white rounded-full hover:bg-ouidah-indigo disabled:opacity-50 transition-all duration-300 shadow-md flex items-center justify-center hover:rotate-12 active:scale-95"
                aria-label="Envoyer"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
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
            <p className="text-center text-[10px] text-ouidah-gris/60 mt-3 font-medium uppercase tracking-widest">
              Mindoguesito • Intelligence Artificielle & Culture Vodun
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
