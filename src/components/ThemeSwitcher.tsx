import { useState } from 'react';
import { themes, type ThemeOption } from '../lib/themes';

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<ThemeOption>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('theme') as ThemeOption) || 'default';
        }
        return 'default';
    });
    const [isOpen, setIsOpen] = useState(false);

    const handleThemeChange = (newTheme: ThemeOption) => {
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-lg font-medium transition-all relative group text-text-muted hover:text-text"
                aria-label="Theme switcher"
            >
                <span className="flex items-center gap-2">
                    <span>{themes.find(t => t.id === theme)?.icon}</span>
                    <span className="hidden sm:inline">{themes.find(t => t.id === theme)?.name}</span>
                </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg border border-card-border bg-white shadow-lg py-2 z-50">
                    {themes.map(t => (
                        <button
                            key={t.id}
                            onClick={() => handleThemeChange(t.id)}
                            className={`w-full px-4 py-2 text-left hover:bg-theme-bg flex items-center gap-2 ${theme === t.id ? 'text-purple-600' : 'text-text-muted'
                                }`}
                        >
                            <span className="text-lg">{t.icon}</span>
                            <div>
                                <div className="font-medium">{t.name}</div>
                                <div className="text-sm text-text-muted">{t.description}</div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
} 