interface ChatbotWidgetProps {
  remixUrl?: string;
}

export function ChatbotWidget({ remixUrl = 'http://localhost:5173' }: ChatbotWidgetProps) {
  const handleClick = () => {
    // Determine the correct URL based on environment
    const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
    const targetUrl = isProduction ? 'https://app.meseriaslocal.ro/ajutor' : `${remixUrl}/ajutor`;
    window.location.href = targetUrl;
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        #chatbot-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: 12px 16px;
          border-radius: 16px;
          background: linear-gradient(135deg, #f97316 0%, #f59e0b 100%);
          border: none;
          cursor: pointer;
          z-index: 9999;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
          color: white;
          font-weight: 600;
          font-size: 12px;
          min-width: 70px;
        }
        #chatbot-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
        }
        #chatbot-button img {
          width: 32px;
          height: 32px;
          object-fit: contain;
        }
        #chatbot-button .pulse-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: #4ade80;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        @media (max-width: 768px) {
          #chatbot-button {
            bottom: 100px;
            padding: 10px 12px;
            font-size: 11px;
            min-width: 65px;
          }
          #chatbot-button img {
            width: 28px;
            height: 28px;
          }
        }
      `}} />
      
      <button
        id="chatbot-button"
        onClick={handleClick}
        aria-label="Deschide asistent AI"
      >
        <span className="pulse-dot"></span>
        <img src="https://www.meseriaslocal.ro/logo.svg" alt="Meserias Local" />
        <span>Agent AI</span>
      </button>
    </>
  );
}
