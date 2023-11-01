'use client';

import { ClientSafeProvider, signIn, useSession } from 'next-auth/react';
import React from 'react';
import { Button } from './ui/button';

interface ProviderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: ClientSafeProvider;
}

const ProviderButton: React.FC<ProviderButtonProps> = ({
  provider,
  ...props
}) => {
  return (
    <Button variant={'outline'} {...props} onClick={() => signIn(provider.id)}>
      Sign in with {provider.name}
    </Button>
  );
};

export default ProviderButton;
