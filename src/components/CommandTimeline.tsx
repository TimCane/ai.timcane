import { useState } from 'react';
import type { CollectionEntry } from 'astro:content';

interface TimelineProps {
    commands: CollectionEntry<'commands'>[];
}

export default function CommandTimeline({ commands }: TimelineProps) {

    const [activeCommand, setActiveCommand] = useState<string | null>(null);

    const sortedCommands = [...commands].sort(
        (a, b) => a.data.date.valueOf() - b.data.date.valueOf()
    );

    return (
        <div className="relative py-10">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-200 via-purple-500 to-purple-200" />

            {/* Timeline Events */}
            <div className="relative">
                {sortedCommands.map((command, index) => {
                    const isEven = index % 2 === 0;
                    const date = new Date(command.data.date);
                    const formattedDate = date.toLocaleString('en-GB', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    return (
                        <div
                            key={command.slug}
                            className={`flex items-center gap-4 mb-12 ${isEven ? 'flex-row' : 'flex-row-reverse'
                                }`}
                        >
                            {/* Content */}
                            <div className={`flex-1 ${isEven ? 'text-right' : 'text-left'}`}>
                                <a
                                    href={`/commands/${command.slug}`}
                                    onMouseEnter={() => setActiveCommand(command.slug)}
                                    onMouseLeave={() => setActiveCommand(null)}
                                    className="inline-block group"
                                >
                                    <div className="text-sm text-text-muted mb-1">
                                        {formattedDate}
                                    </div>
                                    <h3 className="text-lg font-semibold text-text group-hover:text-accent transition-colors mb-2">
                                        {command.data.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 mb-2 justify-end">
                                        {command.data.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-tag-bg text-tag-text rounded-full text-xs
                                 group-hover:bg-tag-hover-bg group-hover:text-tag-hover-text 
                                 transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-text-muted text-sm max-w-md">
                                        {command.data.summary}
                                    </p>
                                </a>
                            </div>

                            {/* Connection Point */}
                            <div className="relative">
                                <div
                                    className={`w-4 h-4 rounded-full transition-all duration-300 ${activeCommand === command.slug
                                        ? 'bg-accent scale-125'
                                        : 'bg-tag-bg'
                                        }`}
                                />
                            </div>

                            {/* Spacer for opposite side */}
                            <div className="flex-1" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
} 