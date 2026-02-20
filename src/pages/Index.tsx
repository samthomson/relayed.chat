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
        <h1 className="text-2xl font-medium tracking-tight">
          <span className="text-accent">relayed</span>.chat
        </h1>
        <LoginArea className="flex w-full max-w-xs" />
      </div>
    </div>
  );
};

export default Index;
