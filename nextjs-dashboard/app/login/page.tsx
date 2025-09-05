import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import Image from 'next/image';
import login from '@/public/login.png'; // Ensure this is the correct path to your image

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen">
      {/* Left Side: Background Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image 
          src={login} 
          alt="Login Background" 
          layout="fill" 
          objectFit="cover" 
          objectPosition="center" 
          quality={75} 
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black opacity-30" />
      </div>
      
      {/* Right Side: Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        <div className="relative flex w-full max-w-lg flex-col space-y-6 bg-white rounded-lg shadow-lg p-8">
          <LoginForm />
        </div>
      </div>

      {/* Blue Header */}
      <div className="absolute top-0 left-0 w-full bg-blue-500 p-4 md:p-6 z-10 flex items-end">
        <div className="w-32 text-white">
          <AcmeLogo />
        </div>
      </div>
    </main>
  );
}