import { useSeoMeta } from '@unhead/react';

const Index = () => {
  useSeoMeta({
    title: 'Relayed Chat',
    description: 'A decentralized chat application built on Nostr.',
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Relayed Chat
        </h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          Ready for functionality
        </p>
      </div>
    </div>
  );
};

export default Index;
