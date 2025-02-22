import { useState, useEffect } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const DEMO_CONVERSATION: Message[] = [
    {
        role: 'user',
        content: 'Can you help me create a theme switcher for my website?'
    },
    {
        role: 'assistant',
        content: "I'd be happy to help you create a theme switcher! Let's build it with React and make it support multiple themes. We'll need to:"
    },
    {
        role: 'assistant',
        content: "1. Create theme variables\n2. Build a theme selector component\n3. Use localStorage for persistence\n4. Add smooth transitions"
    },
    {
        role: 'user',
        content: 'That sounds good! How should we start?'
    },
    {
        role: 'assistant',
        content: "Let's begin by defining our theme variables in CSS. We'll create a clean system that's easy to extend later..."
    }
];

export default function AIChatPreview() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [currentText, setCurrentText] = useState('');

    useEffect(() => {
        if (currentIndex >= DEMO_CONVERSATION.length) return;

        const message = DEMO_CONVERSATION[currentIndex];
        let charIndex = 0;

        setIsTyping(true);

        const typingInterval = setInterval(() => {
            if (charIndex <= message.content.length) {
                setCurrentText(message.content.slice(0, charIndex));
                charIndex++;
            } else {
                clearInterval(typingInterval);
                setIsTyping(false);
                setMessages(prev => [...prev, message]);
                setCurrentText('');
                setCurrentIndex(prev => prev + 1);
            }
        }, message.role === 'assistant' ? 30 : 10);

        return () => clearInterval(typingInterval);
    }, [currentIndex]);

    return (
        <div className="border border-card-border rounded-xl overflow-hidden bg-card">
            {/* Header */}
            <div className="border-b border-card-border p-4">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🤖</span>
                    <div>
                        <h3 className="font-semibold text-text">AI Assistant</h3>
                        <p className="text-sm text-text-muted">Powered by Claude</p>
                    </div>
                </div>
            </div>

            {/* Chat Container */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`
                max-w-[80%] rounded-lg p-3 
                ${message.role === 'user'
                                    ? 'bg-accent text-white'
                                    : 'bg-tag-bg text-text'
                                }
              `}
                        >
                            <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className={`flex ${currentIndex % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <div className={`
                          max-w-[80%] rounded-lg p-3 
                          ${currentIndex % 2 === 0 ? 'bg-accent text-white' : 'bg-tag-bg text-text'}
                        `}>
                            <p className="whitespace-pre-wrap">{currentText}</p>
                            <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1">|</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="border-t border-card-border p-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 rounded-lg 
                     bg-input-bg border border-input-border
                     text-text placeholder:text-text-muted
                     focus:outline-none focus:ring-2 focus:ring-input-focus-ring"
                        disabled
                    />
                    <button
                        className="px-4 py-2 bg-accent text-white rounded-lg opacity-50 cursor-not-allowed"
                        disabled
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
} 