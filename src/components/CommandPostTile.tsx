import type { CollectionEntry } from 'astro:content';
import { format } from 'date-fns';

interface Props {
    post: CollectionEntry<'commands'>;
}

export default function CommandPostTile({ post }: Props) {
    return (
        <article className="bg-white/50 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all group">
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <time dateTime={post.data.date.toISOString()}>
                            {format(post.data.date, 'MMM d, yyyy')}
                        </time>
                        <span>•</span>
                        <span>{post.data.duration}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {post.data.title}
                    </h3>
                </div>

                {/* Content */}
                <div className="flex-grow">
                    <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.data.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.data.tags.map(tag => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>{post.data.difficulty}</span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
} 