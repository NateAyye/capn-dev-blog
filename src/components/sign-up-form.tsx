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
import api from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z
    .string()
    .min(2, {
      message: 'Password must be at least 2 characters.',
    })
    .max(50, { message: 'Password must be less than 50 characters.' }),
});

interface SignInFormProps {}

const SignInForm: React.FC<SignInFormProps> = ({}) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await api.post('/signup', data);
      console.log(response);

      router.push('/');
    } catch (error: Error | any) {
      setError(error?.response?.data?.message || 'Something went wrong.');
      setTimeout(() => {
        setError(null);
      }, 10000);
    }
  };

  return (
    <div className="flex-1">
      <h2 className="text-xl font-bold text-indigo-700">Sign Up</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>This is your public username.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button className="w-full" type="submit">
            Sign Up
          </Button>
        </form>
      </Form>
      <small className="flex items-center justify-end">
        Already have an account?{' '}
        <Button className="px-1" asChild variant={'link'}>
          <Link href={'/signIn'}>Sign In</Link>
        </Button>
      </small>
    </div>
  );
};

export default SignInForm;
