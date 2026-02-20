import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeoMeta } from '@unhead/react';
import { Button } from '@/components/ui/button';
import LoginDialog from '@/components/auth/LoginDialog';
import { useLoggedInAccounts } from '@/hooks/useLoggedInAccounts';

const Index = () => {
  const navigate = useNavigate();
  const { currentUser } = useLoggedInAccounts();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  useSeoMeta({
    title: 'Relayed Chat',
    description: 'A decentralized chat application built on Nostr.',
  });

  const handleStart = () => {
    if (currentUser) {
      navigate('/messages');
    } else {
      setLoginDialogOpen(true);
    }
  };

  const handleLogin = () => {
    setLoginDialogOpen(false);
    navigate('/messages');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center gap-10">
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-center">
          <span className="text-accent">relayed</span>.chat
        </h1>
        <p className="text-muted-foreground text-center max-w-sm">
          Private messaging on Nostr
        </p>
        <Button
          size="lg"
          onClick={handleStart}
          className="rounded-full px-8 py-6 text-base font-medium bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Start
        </Button>
      </div>

      <LoginDialog
        isOpen={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Index;
