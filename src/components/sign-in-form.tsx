'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(50),
});

interface SignInFormProps {}

const SignInForm: React.FC<SignInFormProps> = ({}) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid email or password.');
        return;
      }
      router.push('/');
    } catch (error: Error | any) {
      setError(error?.response?.data?.message || 'Something went wrong.');
      setTimeout(() => {
        setError(null);
      }, 10000);
    }
  }

  const onError: SubmitErrorHandler<z.infer<typeof formSchema>> = (
    errors,
    e,
  ) => {
    console.log(errors);
    setError('Invalid email or password.');
  };

  return (
    <div className="flex-1">
      <h2 className="text-3xl font-bold my-1 text-indigo-700">Sign In</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>This is your public email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  Password for your account. (min 4 characters)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full bg-indigo-500 hover:bg-indigo-700 "
            type="submit"
          >
            Sign In
          </Button>
        </form>
      </Form>
      <small className="flex items-center justify-end">
        Don&apos;t have an account?{' '}
        <Button className="px-1" asChild variant={'link'}>
          <Link href={'/signUp'}>Sign Up</Link>
        </Button>
      </small>
    </div>
  );
};

export default SignInForm;
