import Breadcrumbs from '@/app/ui/users/breadcrumbs';
import RegistrationForm from '@/app/ui/register/registration-form';
export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          
        ]}
      />
      <div className="max-w-lg mx-auto mt-8">
        
      </div>
    </main>
  );
}