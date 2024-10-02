import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#272b33]">
      <div className="flex flex-col items-center text-center mt-10">

      <Image src="/Images/404.jpg" alt="404 not found" width={320} height={200}/>
      <p className="text-xl mt-4 text-[#fbc02d]">Oops! La página que buscas no existe.</p>
      </div>
      <Link href="/" legacyBehavior>
        <a className="mt-6 text-blue-500 hover:text-blue-700">Volver al inicio</a>
      </Link>
    </div>
  );
}
