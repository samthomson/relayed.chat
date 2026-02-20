import { useSeoMeta } from '@unhead/react';
import { LoginArea } from '@/components/auth/LoginArea';

const Index = () => {
  useSeoMeta({
    title: 'Relayed Chat',
    description: 'A decentralized chat application built on Nostr.',
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-medium tracking-tight">
            relayed_chat
          </h1>
          <p className="text-sm text-muted-foreground">
            _
          </p>
        </div>
        <LoginArea className="flex w-full max-w-xs" />
      </div>
    </div>
  );
};

export default Index;
