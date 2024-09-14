import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AuthPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold text-center mb-6'>
          Login to Karkhana
        </h1>
        <p className='text-center text-gray-600 mb-6'>
          Welcome to Karkhana. Please log in to access your account.
        </p>
        <Link
          href='/auth/login'
          passHref
        >
          <Button className='w-full mb-4'>Log In</Button>
        </Link>
        <p className='text-center text-sm text-gray-500'>
          Don't have an account?{' '}
          <Link
            href='/auth/signup'
            className='text-blue-500 hover:underline'
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
