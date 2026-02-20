import { useSeoMeta } from '@unhead/react';

const Index = () => {
  useSeoMeta({
    title: 'Relayed Chat',
    description: 'A decentralized chat application built on Nostr.',
  });

  const colors = [
    { name: 'electric cyan', value: 'hsl(190, 95%, 50%)' },
    { name: 'neon green', value: 'hsl(140, 85%, 45%)' },
    { name: 'hot magenta', value: 'hsl(320, 100%, 55%)' },
    { name: 'deep orange', value: 'hsl(20, 90%, 50%)' },
    { name: 'violet', value: 'hsl(270, 85%, 60%)' },
    { name: 'acid yellow', value: 'hsl(55, 100%, 50%)' },
    { name: 'blood red', value: 'hsl(0, 85%, 50%)' },
    { name: 'ice blue', value: 'hsl(200, 90%, 60%)' },
    { name: 'toxic lime', value: 'hsl(80, 100%, 45%)' },
    { name: 'pink', value: 'hsl(340, 95%, 60%)' },
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-sm text-muted-foreground mb-12">
          color options
        </div>
        <div className="grid grid-cols-2 gap-8">
          {colors.map((color, idx) => (
            <div key={idx} className="space-y-2">
              <h1 className="text-2xl font-medium tracking-tight">
                <span style={{ color: color.value }}>relayed</span>.chat
              </h1>
              <p className="text-xs text-muted-foreground font-mono">
                {color.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
