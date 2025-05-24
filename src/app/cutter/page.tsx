'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ImageCutter } from '@/components/organisms/image-cutter';

export default function CutterPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Get the uploaded image from sessionStorage
    const storedImageUrl = sessionStorage.getItem('uploadedImage');
    const storedImageName = sessionStorage.getItem('uploadedImageName');

    if (!storedImageUrl) {
      // If no image is found, redirect back to the home page
      router.push('/');
      return;
    }

    setImageUrl(storedImageUrl);
    setImageName(storedImageName);
  }, [router]);

  const handleNextStep = () => {
    // Navigate to the email page
    router.push('/email');
  };

  if (!imageUrl) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Cargando...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-bold">Editar Imagen</h1>
        <p className="mb-6 text-gray-600">
          Añade líneas horizontales y verticales para definir los fragmentos de
          la imagen.
        </p>

        <div className="mb-8">
          <ImageCutter
            initialImageUrl={imageUrl}
            initialImageName={imageName || 'imagen.jpg'}
            onFragmentsGenerated={fragments => {
              // Store fragments in sessionStorage for the next page
              sessionStorage.setItem(
                'imageFragments',
                JSON.stringify(fragments)
              );
            }}
          />
        </div>

        <div className="flex justify-end">
          <button className="btn-primary" onClick={handleNextStep}>
            Siguiente Paso
          </button>
        </div>
      </div>
    </main>
  );
}
