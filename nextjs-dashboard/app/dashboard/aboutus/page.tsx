import Image from 'next/image';
import aboutus from '@/public/aboutus.png'; // Ensure this is the correct path to your image

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="relative flex flex-col items-center p-6">
        {/* Background Image */}
        <div className="relative w-full h-60 lg:h-80">
          <Image 
            src={aboutus}
            alt="About Us Background"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={75}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-black opacity-30" />
        </div>
        
        <div className="relative max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-[-10%] z-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Information Management Experts "IMEX"</h1>
          <p className="text-lg text-gray-700 mb-4">
            Information Management Experts ‘IMEX’, est une SS2I constituée par un pool de compétences dans le domaine des technologies et systèmes d’Informations.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            IMEX est un acteur actif, et assure pour ses clients les missions d’assistance à la maîtrise d’ouvrage, maitrise d’œuvre, (développement, formation et accompagnement au démarrage) dans le cadre de grands projets d’envergure nationale et internationale, dans les domaines de l’administration publique, les banques, les assurances et les opérateurs en télécommunication.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            IMEX œuvre continuellement, pour consolider ses ressources techniques et fonctionnelles, et enrichir son réseau de partenaires internationaux, et ce, afin de capitaliser sur les évolutions et l’état de l’art à l’échelle internationale.
          </p>
          <p className="text-lg text-gray-700">
            IMEX est également distributeur à valeur ajoutée de logiciels d’Infrastructure et outils de développement autour des bases de données de gestion du monde ouvert (Unix, Linux, Windows), Datawarehouses, Gestion électronique de documents et Output Management ainsi que les solutions Open Source.
          </p>
        </div>
      </div>
    </main>
  );
}
