import { useState } from 'react'

export default function TanChatAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative z-[100]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 items-center gap-2 rounded-xl bg-[linear-gradient(135deg,var(--lagoon),var(--lagoon-deep))] px-3 text-sm font-bold text-white shadow-[0_4px_12px_rgba(79,184,178,0.24)] transition hover:scale-[1.02] hover:shadow-[0_6px_16px_rgba(79,184,178,0.32)] active:scale-[0.98]"
        aria-label="Open AI Assistant"
      >
        <div className="relative flex h-4 w-4 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-40"></span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
          </svg>
        </div>
        <span className="hidden sm:inline">AI Assistant</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[-1]" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-3 w-[min(calc(100vw-2rem),24rem)] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] shadow-[0_20px_50px_rgba(23,58,64,0.15)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 origin-top-right">
            <div className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--header-bg)] px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--lagoon)] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="16" height="12" x="4" y="8" rx="2" />
                    <path d="M12 8V4H8" />
                    <path d="M15 13v2" />
                    <path d="M9 13v2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-none text-[var(--sea-ink)]">
                    TanStack AI
                  </h3>
                  <span className="text-[10px] font-medium text-[var(--lagoon-deep)] uppercase tracking-wider">
                    Online Assistant
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="h-80 overflow-y-auto p-4 flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="h-7 w-7 flex-shrink-0 rounded-full bg-[var(--lagoon)] flex items-center justify-center text-white">
                  <span className="text-[10px] font-bold">AI</span>
                </div>
                <div className="rounded-2xl bg-[var(--foam)] border border-[var(--line)] px-4 py-2.5 text-sm text-[var(--sea-ink)] shadow-sm">
                  Hello! I'm your AI assistant for Garda Pangan. I can help you navigate the demo and answer questions about TanStack Start.
                </div>
              </div>
              
              <div className="mt-2 grid grid-cols-2 gap-2">
                {['About Garda Pangan', 'Demo Features', 'TanStack AI', 'Project Architecture'].map((item) => (
                  <button 
                    key={item}
                    className="text-left px-3 py-2 rounded-xl border border-[var(--line)] bg-white/50 text-xs font-medium text-[var(--sea-ink-soft)] hover:border-[var(--lagoon)] hover:text-[var(--lagoon-deep)] transition"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--line)] p-4 bg-white/30">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 pr-10 text-sm shadow-sm transition focus:border-[var(--lagoon)] focus:outline-none focus:ring-4 focus:ring-[var(--lagoon)]/10"
                />
                <button className="absolute right-2 p-1.5 text-[var(--lagoon-deep)] transition hover:scale-110 active:scale-95">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
              <p className="mt-3 text-center text-[10px] text-[var(--sea-ink-soft)] opacity-60">
                Powered by TanStack AI • Version 1.0.4
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
