import type { CollectionEntry } from 'astro:content';
import { format } from 'date-fns';

interface Props {
    post: CollectionEntry<'commands'>;
    href?: string;
}

export default function CommandPostTile({ post, href }: Props) {
    const Tag = href ? 'a' : 'div';

    return (
        <Tag
            href={href}
            className="block bg-white border border-gray-100 rounded-2xl p-6 
                       hover:shadow-lg transition-all group cursor-pointer"
        >
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <time dateTime={post.data.date.toISOString()}>
                            {format(post.data.date, 'MMM d, yyyy')}
                        </time>
                        <span>•</span>
                        <span>{post.data.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {post.data.title}
                    </h3>
                </div>

                {/* Summary */}
                <p className="text-gray-600 mb-6 flex-grow">
                    {post.data.summary}
                </p>

                {/* Footer */}
                <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {post.data.tags.map(tag => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-sm rounded-full
                                         bg-tag-bg text-tag-text
                                         group-hover:bg-tag-hover-bg group-hover:text-tag-hover-text 
                                         transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span>{post.data.filesChanged.length} files</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            <span>{post.data.codeSnippets} snippets</span>
                        </div>
                    </div>
                </div>
            </div>
        </Tag>
    );
} 