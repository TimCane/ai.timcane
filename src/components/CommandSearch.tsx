import { useState } from 'react';
import type { CollectionEntry } from 'astro:content';

interface Props {
    commands: CollectionEntry<'commands'>[];
}

export default function CommandSearch({ commands }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Get unique tags and categories
    const allTags = Array.from(new Set(commands.flatMap(command => command.data.tags)));
    const allCategories = Array.from(new Set(commands.map(command => command.data.category)));

    const handleSearch = (term: string, tag: string | null, category: string | null) => {
        const filtered = commands.filter(command => {
            const matchesTerm = term === '' ||
                command.data.title.toLowerCase().includes(term.toLowerCase()) ||
                command.data.summary.toLowerCase().includes(term.toLowerCase());

            const matchesTag = !tag || command.data.tags.includes(tag);
            const matchesCategory = !category || command.data.category === category;

            return matchesTerm && matchesTag && matchesCategory;
        });

        // Dispatch custom event with filtered results
        const event = new CustomEvent('command-filter', {
            detail: filtered
        });
        document.dispatchEvent(event);
    };

    return (
        <div className="mb-8 space-y-4">
            {/* Search Input */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search commands..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        handleSearch(e.target.value, selectedTag, selectedCategory);
                    }}
                    className="w-full px-4 py-2 rounded-lg 
                     bg-input-bg border border-input-border
                     text-text placeholder:text-text-muted
                     focus:outline-none focus:ring-2 focus:ring-input-focus-ring"
                />
                <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
                {/* Tags */}
                <div className="flex-1 min-w-[200px]">
                    <select
                        value={selectedTag || ''}
                        onChange={(e) => {
                            const value = e.target.value || null;
                            setSelectedTag(value);
                            handleSearch(searchTerm, value, selectedCategory);
                        }}
                        className="w-full px-4 py-2 rounded-lg 
                       bg-input-bg border border-input-border
                       text-text
                       focus:outline-none focus:ring-2 focus:ring-input-focus-ring"
                    >
                        <option value="">All Tags</option>
                        {allTags.map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                </div>

                {/* Categories */}
                <div className="flex-1 min-w-[200px]">
                    <select
                        value={selectedCategory || ''}
                        onChange={(e) => {
                            const value = e.target.value || null;
                            setSelectedCategory(value);
                            handleSearch(searchTerm, selectedTag, value);
                        }}
                        className="w-full px-4 py-2 rounded-lg 
                       bg-input-bg border border-input-border
                       text-text
                       focus:outline-none focus:ring-2 focus:ring-input-focus-ring"
                    >
                        <option value="">All Categories</option>
                        {allCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
} 