import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useGetContacts, useDeleteContact } from "../hooks/useContact";
import { InboxRowSkeleton } from "../components/Skeletons";

const Inbox = () => {
  const { data: contacts, isLoading, isError, error } = useGetContacts();
  const deleteMutation = useDeleteContact();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;

  if (isLoading)
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-2">
          <InboxRowSkeleton />
          <InboxRowSkeleton />
          <InboxRowSkeleton />
        </div>
      </div>
    );
  if (isError)
    return <p className="text-red-400 p-6">Error: {error.message}</p>;

  const messages = contacts ?? [];

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-medium text-white mb-8">Inbox</h1>

      {messages.length === 0 ? (
        <p className="text-neutral-400">No messages yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {messages.map((msg) => {
            const isExpanded = expandedId === msg.id;
            return (
              <div
                key={msg.id}
                className="bg-neutral-900 border border-white/10 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : msg.id)}
                  className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm text-white font-medium truncate">
                      {msg.name}{" "}
                      <span className="text-neutral-500">— {msg.subject}</span>
                    </span>
                    {!isExpanded && (
                      <span className="text-xs text-neutral-500 truncate">
                        {msg.message}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-neutral-500 shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 flex flex-col gap-3 border-t border-white/10 pt-3">
                    <p className="text-sm text-neutral-400">{msg.email}</p>
                    <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </p>
                    <button
                      onClick={() => deleteMutation.mutate(msg.id)}
                      className="self-start text-xs text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Inbox;
