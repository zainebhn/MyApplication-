import Image from 'next/image';
import services from '@/public/services.png'; // Ensure this is the correct path to your image

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="relative flex flex-col items-center p-6">
        {/* Background Image */}
        <div className="relative w-full h-60 lg:h-80">
          <Image 
            src={services}
            alt="Services Background"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={75}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-black opacity-30" />
        </div>
        
        <div className="relative max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-[-10%] z-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Services</h1>
          <p className="text-lg text-gray-700 mb-4">
            Forts de dix-huit ans d’expérience dans le monde de mise en œuvre de solutions logicielles, La société IMEX est caractérisée par :
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
            <li>Une expérience dans les environnements critiques : temps réel, gros volumes, sécurisés, décisionnels stratégiques (réseau bancaires, réseaux Télécom, domaine de l’emploi, l’administration publique).</li>
            <li>Une expérience particulière dans les pays d’Afrique Francophone, qui présentent de grandes similitudes en termes d’Infrastructure informatique répartie et de procédures de fonctionnement.</li>
          </ul>
          <p className="text-lg text-gray-700 mb-4">
            Les ressources qualifiées d’IMEX couvrent les services et les domaines suivants :
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li>Etudes et qualification</li>
            <li>Gestion de Projet</li>
            <li>Paramétrages et implémentations</li>
            <li>Conception et Développement</li>
            <li>Maintenance et Support Produits</li>
            <li>Assistance et formation</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
