import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">Medicina Clínica</h1>
            </div>
            
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <div className="flex space-x-4">
                <Link
                  href="/sign-in"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Registrarse
                </Link>
              </div>
            </SignedOut>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <SignedIn>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ¡Bienvenido a tu plataforma médica!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Medicina más simple, cuidado más humano
              </p>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Panel de Control
                  </h3>
                  <p className="text-gray-600">
                    Has iniciado sesión exitosamente. Aquí puedes acceder a todas las funcionalidades de la plataforma.
                  </p>
                </div>
              </div>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-4xl font-light text-gray-900 mb-4">
                Medicina más simple
              </h2>
              <p className="text-2xl text-gray-900 mb-6">
                cuidado más humano
              </p>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Todo listo para una mejor experiencia clínica. Una plataforma integral 
                que conecta profesionales de la salud con tecnología avanzada para 
                brindar el mejor cuidado a los pacientes.
              </p>

              <div className="flex justify-center space-x-4">
                <Link
                  href="/sign-up"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md text-lg transition-colors"
                >
                  Comenzar ahora
                </Link>
                <Link
                  href="/sign-in"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-8 rounded-md text-lg transition-colors"
                >
                  Iniciar sesión
                </Link>
              </div>
            </div>
          </SignedOut>
        </div>
      </main>
    </div>
  );
}
