import type { NostrMetadata } from '@nostrify/nostrify';
import { NSchema as n } from '@nostrify/nostrify';
import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';

/**
 * Batch-fetch author metadata (kind 0) for multiple pubkeys.
 * Used by @samthomson/nostr-messaging DMProvider for display names.
 * Returns { data?: Map } where Map is pubkey -> NostrMetadata (or { metadata?: NostrMetadata }).
 */
export function useAuthorsBatch(
  pubkeys: string[],
): { data?: Map<string, NostrMetadata | { metadata?: NostrMetadata }> } {
  const { nostr } = useNostr();
  const key = [...pubkeys].filter(Boolean).sort().join(',');

  const { data: events } = useQuery({
    queryKey: ['authors-batch', key],
    queryFn: async ({ signal }) => {
      if (pubkeys.length === 0) return [];
      const uniq = [...new Set(pubkeys.filter(Boolean))];
      const result = await nostr.query(
        [{ kinds: [0], authors: uniq, limit: uniq.length }],
        { signal: AbortSignal.any([signal, AbortSignal.timeout(5000)]) },
      );
      return result;
    },
    enabled: pubkeys.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  if (!events?.length) {
    return {};
  }

  const map = new Map<string, NostrMetadata | { metadata?: NostrMetadata }>();
  for (const event of events) {
    try {
      const metadata = n.json().pipe(n.metadata()).parse(event.content);
      map.set(event.pubkey, metadata);
    } catch {
      map.set(event.pubkey, {});
    }
  }
  return { data: map };
}
