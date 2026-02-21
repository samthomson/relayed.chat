import { useCallback, useEffect, useState } from 'react';
import {
  DMProvider,
  RELAY_MODE,
  type DMProviderDeps,
} from '@samthomson/nostr-messaging/core';
import { useNostr } from '@nostrify/react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useAppContext } from '@/hooks/useAppContext';
import { useToast } from '@/hooks/useToast';
import { useAuthorsBatch } from '@/hooks/useAuthorsBatch';
import { useNostrPublish } from '@/hooks/useNostrPublish';
import { useUploadFile } from '@/hooks/useUploadFile';
import { useIsMobile } from '@/hooks/useIsMobile';
import { genUserName } from '@/lib/genUserName';
import type { NostrMetadata } from '@nostrify/nostrify';

interface DMMessagingProviderProps {
  children: React.ReactNode;
}

/**
 * Wraps the app with DMProvider from @samthomson/nostr-messaging.
 * Must be rendered inside NostrProvider, NostrLoginProvider, and AppProvider.
 */
export function DMMessagingProvider({ children }: DMMessagingProviderProps) {
  const { nostr } = useNostr();
  const { user } = useCurrentUser();
  const { config } = useAppContext();
  const { toast: toastFn } = useToast();
  const { mutateAsync: publishEventMutate } = useNostrPublish();
  const { mutateAsync: uploadFileMutate } = useUploadFile();
  const isMobile = useIsMobile();

  const [wasOffline, setWasOffline] = useState(false);
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleOnline = () => {
      setWasOffline(true);
      setIsOnline(true);
    };
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const onNotify = useCallback(
    (options: { title?: string; description?: string; variant?: 'default' | 'destructive' }) => {
      toastFn({
        title: options.title,
        description: options.description,
        variant: options.variant === 'destructive' ? 'destructive' : 'default',
      });
    },
    [toastFn],
  );

  const getDisplayName = useCallback(
    (pubkey: string, metadata?: NostrMetadata) =>
      metadata?.name ?? genUserName(pubkey),
    [],
  );

  const publishEvent = useCallback(
    async (event: unknown) => {
      const e = event as Parameters<typeof publishEventMutate>[0];
      await publishEventMutate(e);
    },
    [publishEventMutate],
  );

  const uploadFile = useCallback(
    async (file: File) => {
      const tags = await uploadFileMutate(file);
      const url = tags?.[0]?.[1];
      if (!url) throw new Error('Upload did not return a URL');
      return url;
    },
    [uploadFileMutate],
  );

  const discoveryRelays = config.relayMetadata.relays.map((r) => r.url);
  const appConfig = {
    discoveryRelays,
    relayMode: RELAY_MODE.HYBRID,
  };

  const deps: DMProviderDeps = {
    nostr,
    user: user ? { pubkey: user.pubkey, signer: user.signer } : null,
    discoveryRelays,
    relayMode: RELAY_MODE.HYBRID,
    isOnline,
    wasOffline,
    onNotify,
    getDisplayName,
    fetchAuthorsBatch: useAuthorsBatch,
    publishEvent,
    uploadFile,
    isMobile,
    follows: [],
    appConfig,
  };
  
  return <DMProvider deps={deps} config={{ ui: { showShorts: false, showSearch: true } }}>{children}</DMProvider>;
}
