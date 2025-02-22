import { useState, useEffect } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const EXAMPLE_CONVERSATIONS: { title: string; messages: Message[] }[] = [
    {
        title: "Creating a Theme Switcher",
        messages: [
            { role: 'user', content: 'Can you help me create a theme switcher for my website?' },
            { role: 'assistant', content: "I'd be happy to help you create a theme switcher! Let's build it with React and make it support multiple themes. We'll need to:" },
            { role: 'assistant', content: "1. Create theme variables\n2. Build a theme selector component\n3. Use localStorage for persistence\n4. Add smooth transitions" },
            { role: 'user', content: 'That sounds good! How should we start?' },
            { role: 'assistant', content: "Let's begin by defining our theme variables in CSS. We'll create a clean system that's easy to extend later..." }
        ]
    },
    {
        title: "Building a Timeline",
        messages: [
            { role: 'user', content: 'I want to create a visual timeline showing the progression of features.' },
            { role: 'assistant', content: "That's a great idea! A timeline can really help users understand the development journey. Let's create an interactive one with:" },
            { role: 'assistant', content: "1. Alternating left/right layout\n2. Animated hover states\n3. Connection lines between events\n4. Theme-compatible styling" },
            { role: 'user', content: 'I like the alternating layout idea. How do we implement that?' },
            { role: 'assistant', content: "We can use CSS Grid and some clever positioning. Here's how we'll structure it..." }
        ]
    },
    {
        title: "Command Search System",
        messages: [
            { role: 'user', content: 'How can we add search and filtering to the commands page?' },
            { role: 'assistant', content: "Let's build a robust search system that helps users find commands easily. We should include:" },
            { role: 'assistant', content: "1. Full-text search\n2. Tag filtering\n3. Category selection\n4. Real-time updates" },
            { role: 'user', content: 'Perfect! Should we use any specific libraries?' },
            { role: 'assistant', content: "For this scale, we can build it custom without external dependencies. Let's start with the search input component..." }
        ]
    },
    {
        title: "Process Flow Diagram",
        messages: [
            { role: 'user', content: 'I need to visualize how the AI assistance process works.' },
            { role: 'assistant', content: "A process flow diagram would be perfect for this! We can make it interactive to show each step clearly. Let's include:" },
            { role: 'assistant', content: "1. Step-by-step visualization\n2. Example previews\n3. Animated transitions\n4. Clear connection lines" },
            { role: 'user', content: 'Could we add hover states to show more details?' },
            { role: 'assistant', content: "Absolutely! We can create a sticky preview section that updates as users hover over different steps..." }
        ]
    },
    {
        title: "Chat Interface",
        messages: [
            { role: 'user', content: 'Can we show visitors how the AI chat actually works?' },
            { role: 'assistant', content: "Great idea! We can create an interactive preview of our chat interface. Here's what we'll include:" },
            { role: 'assistant', content: "1. Typing animations\n2. Message bubbles\n3. Theme integration\n4. Example conversations" },
            { role: 'user', content: 'Love it! How do we handle the typing animation?' },
            { role: 'assistant', content: "We'll use a character-by-character approach with React state management..." }
        ]
    }
];

export default function AIChatPreview() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [currentText, setCurrentText] = useState('');
    const [selectedConversation] = useState(() => {
        // Randomly select a conversation on component mount
        const randomIndex = Math.floor(Math.random() * EXAMPLE_CONVERSATIONS.length);
        return EXAMPLE_CONVERSATIONS[randomIndex];
    });

    useEffect(() => {
        if (currentIndex >= selectedConversation.messages.length) return;

        const message = selectedConversation.messages[currentIndex];
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
    }, [currentIndex, selectedConversation]);

    return (
        <div className="border border-card-border rounded-xl overflow-hidden bg-card">
            {/* Header */}
            <div className="border-b border-card-border p-4">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🤖</span>
                    <div>
                        <h3 className="font-semibold text-text">{selectedConversation.title}</h3>
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