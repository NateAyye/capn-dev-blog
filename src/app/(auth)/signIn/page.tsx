import ProviderButton from '@/components/provider-button';
import SignInForm from '@/components/sign-in-form';
import { Separator } from '@/components/ui/separator';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';
import authOptions from '../../api/auth/[...nextauth]/_options';

interface SignInProps {}

const SignIn: React.FC<SignInProps> = async ({}) => {
  const providers = (await getProviders()) || [];
  const session = await getServerSession(authOptions);

  if (session) redirect('/');
  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="flex m-5 md:m-0 shadow-2xl rounded-lg p-4 flex-col w-full max-w-3xl space-y-6 md:space-y-0 md:space-x-6 md:flex-row ">
        <div className="w-full md:w-1/2 h-1/2 space-y-3 px-5 flex flex-col justify-center items-center">
          <p className="text-3xl font-sans font-bold text-indigo-600">
            Providers
          </p>
          {Object.values(providers).map((provider) => {
            if (provider.name === 'Credentials') return;
            return (
              <ProviderButton
                className="w-full h-10 text-lg"
                key={provider.name}
                provider={provider}
              />
            );
          })}
        </div>
        <Separator className="not-sr-only md:sr-only" />
        <div className="w-[1px] bg-border" />
        <SignInForm />
      </div>
    </main>
  );
};

export default SignIn;
