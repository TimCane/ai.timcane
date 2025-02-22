export type ThemeOption = 'default' | 'dark' | 'high-contrast' | 'terminal';

export interface Theme {
    id: ThemeOption;
    name: string;
    icon: string;
    description: string;
}

export const themes: Theme[] = [
    {
        id: 'default',
        name: 'Default',
        icon: '☀️',
        description: 'Clean and modern with purple accents'
    },
    {
        id: 'dark',
        name: 'Dark Mode',
        icon: '🌙',
        description: 'Easy on the eyes'
    },
    {
        id: 'high-contrast',
        name: 'High Contrast',
        icon: '◐',
        description: 'Maximum readability'
    },
    {
        id: 'terminal',
        name: 'Retro Terminal',
        icon: '💻',
        description: 'Old school terminal vibes'
    }
];

export const getTheme = (id: ThemeOption): Theme => {
    return themes.find(theme => theme.id === id) || themes[0];
}; 