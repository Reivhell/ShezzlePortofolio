import { createClient } from '@/lib/supabase-server'
import { Pin, Trash2, CheckCircle, XCircle } from 'lucide-react'
import type { Comment } from '@/types'

export default async function CommentsPage() {
  const supabase = await createClient()
  const { data: comments, error } = await supabase
    .from('portfolio_comments')
    .select('*')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching comments:', error)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Comments</h1>
        <p className="text-gray-400 text-sm mt-1">Manage comments from your portfolio visitors</p>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments && comments.length > 0 ? (
          comments.map((comment: Comment) => (
            <div
              key={comment.id}
              className={`p-4 rounded-xl border ${
                comment.is_pinned
                  ? 'bg-indigo-500/10 border-indigo-500/30'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {comment.profile_image ? (
                    <img
                      src={comment.profile_image}
                      alt={comment.user_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <span className="text-indigo-400 font-medium">
                        {comment.user_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{comment.user_name}</span>
                      {comment.is_pinned && (
                        <span className="flex items-center gap-1 px-2 py-0.5 text-xs bg-indigo-500/20 text-indigo-300 rounded-full">
                          <Pin className="w-3 h-3" />
                          Pinned
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">
                      {new Date(comment.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <p className="text-gray-300 mt-2">{comment.content}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!comment.is_pinned ? (
                    <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-indigo-400 transition-colors">
                      <Pin className="w-4 h-4" />
                    </button>
                  ) : (
                    <button className="p-2 rounded-lg hover:bg-white/10 text-indigo-400 hover:text-gray-400 transition-colors">
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                  <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-gray-500 bg-white/5 border border-white/10 rounded-xl">
            No comments yet.
          </div>
        )}
      </div>
    </div>
  )
}
