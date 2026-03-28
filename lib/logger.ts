/**
 * Server-side logger for Wisdom Integration.
 * Logs errors with context to the server console.
 * Internal error details are never forwarded to the client —
 * API routes return only user-friendly messages.
 */

export function logError(context: string, error: unknown) {
  console.error(`[${context}]`, error instanceof Error ? error.message : error)
}
