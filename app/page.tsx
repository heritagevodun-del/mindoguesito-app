'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  
  // Le scroll automatique
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    // FOND AVEC TEXTURE PAPIER ET COULEURS OUIDAH
    <div className="flex flex-col h-screen bg-texture text-ouidah-indigo font-sans selection:bg-ouidah-terre selection:text-white">
      
      {/* HEADER : L'Identité du Gardien */}
      <header className="fixed top-0 w-full bg-ouidah-sable/95 backdrop-blur-sm border-b border-ouidah-terre/10 p-4 z-10 flex items-center justify-center shadow-sm">
        <div className="text-center group cursor-default">
            {/* La Signature Manuscrite */}
            <h1 className="text-4xl font-hand text-ouidah-terre tracking-wider drop-shadow-sm group-hover:scale-105 transition-transform duration-500">
              Mindoguesito
            </h1>
            <p className="text-[10px] font-serif uppercase tracking-[0.3em] text-ouidah-indigo/60 mt-1">
              Gardien du Seuil
            </p>
        </div>
      </header>

      {/* ZONE DE CONVERSATION */}
      <div className="flex-1 overflow-y-auto pt-32 pb-40 px-4 sm:px-6 scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-10">
          
          {/* ACCUEIL : L'Invitation (Visible seulement si vide) */}
          {messages.length === 0 && (
            <div className="text-center mt-10 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-ouidah-terre/20 to-transparent rounded-full flex items-center justify-center mb-8 border border-ouidah-terre/20 shadow-inner">
                 <span className="text-5xl filter drop-shadow-md">🐍</span>
              </div>
              <h2 className="text-3xl font-serif text-ouidah-terre mb-6 italic">
                "Bienvenue dans la cour des anciens."
              </h2>
              <p className="text-ouidah-indigo/70 max-w-lg mx-auto leading-relaxed font-serif text-lg">
                Je suis la mémoire vivante de Ouidah.<br/>
                L'histoire, le Vodun, la forêt sacrée...<br/>
                <span className="text-sm mt-4 block text-ouidah-terre/60 not-italic sans-serif tracking-widest uppercase">Que veux-tu savoir ?</span>
              </p>
            </div>
          )}

          {/* LISTE DES MESSAGES */}
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] px-8 py-6 shadow-md relative transition-all duration-300 hover:shadow-lg ${
                  m.role === 'user'
                    ? 'bg-ouidah-indigo text-ouidah-sable rounded-2xl rounded-tr-sm font-sans' // L'Explorateur (Moderne)
                    : 'bg-ouidah-kaolin text-ouidah-indigo border-l-4 border-ouidah-terre rounded-r-2xl rounded-bl-2xl font-serif text-lg leading-loose' // Le Sage (Tradition)
                }`}
              >
                {/* Petit label au-dessus */}
                <span className={`text-[9px] uppercase tracking-widest block mb-3 opacity-40 font-sans ${m.role === 'user' ? 'text-right text-ouidah-sable' : 'text-left text-ouidah-terre'}`}>
                  {m.role === 'user' ? 'L\'Explorateur' : 'Le Sage'}
                </span>

                {/* Contenu Markdown rendu proprement */}
                <div className={`markdown-content ${m.role === 'assistant' ? 'prose prose-p:my-2 prose-headings:font-serif prose-headings:text-ouidah-terre prose-strong:text-ouidah-terre prose-li:marker:text-ouidah-or' : ''}`}>
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {/* INDICATEUR DE CHARGEMENT (Plume) */}
          {isLoading && (
            <div className="flex justify-start w-full animate-pulse">
              <div className="bg-ouidah-kaolin px-6 py-4 rounded-r-2xl rounded-bl-2xl border-l-4 border-ouidah-terre/30 ml-1">
                <span className="font-hand text-2xl text-ouidah-terre/70">
                  Le gardien consulte les mémoires...
                </span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* BARRE DE SAISIE (L'Arche) */}
      <div className="fixed bottom-0 w-full bg-gradient-to-t from-ouidah-sable via-ouidah-sable/90 to-transparent pb-8 pt-12 px-4 z-20">
        <div className="max-w-3xl mx-auto transform transition-all hover:scale-[1.01]">
          <form onSubmit={handleSubmit} className="relative flex items-center shadow-xl rounded-full bg-white border border-ouidah-terre/20 ring-4 ring-ouidah-sable/60">
            <input
              className="w-full py-5 pl-8 pr-16 bg-transparent border-none focus:ring-0 text-ouidah-indigo placeholder-ouidah-indigo/30 font-sans text-lg"
              value={input}
              placeholder="Interrogez l'histoire..."
              onChange={handleInputChange}
              disabled={isLoading}
            />
            {/* CORRECTION DU BOUTON : AJOUT DE ARIA-LABEL */}
            <button
              type="submit"
              aria-label="Envoyer la question"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-3 bg-ouidah-terre text-white rounded-full hover:bg-ouidah-indigo transition-all duration-300 disabled:opacity-50 disabled:grayscale shadow-md hover:shadow-lg active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </form>
          <p className="text-center text-[10px] text-ouidah-terre/40 mt-4 font-serif italic tracking-wider">
            MINDOGUESITO v1.0 • OUIDAH, BÉNIN
          </p>
        </div>
      </div>
    </div>
  );
}