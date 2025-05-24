'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleNextStep = () => {
    if (file) {
      // Store the file in sessionStorage (as a URL)
      const fileUrl = URL.createObjectURL(file);
      sessionStorage.setItem('uploadedImage', fileUrl);
      sessionStorage.setItem('uploadedImageName', file.name);

      // Navigate to the cutter page
      router.push('/cutter');
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1 px-6 pt-10 lg:px-0">
        <div className="mx-auto max-w-4xl rounded-2xl bg-[#0d80f2] px-4 py-20 text-center text-white">
          <h1 className="mb-6 text-5xl font-bold">Automatiza con Cutless</h1>
          <p className="mx-auto mb-12 max-w-3xl text-xl">
            Genera emails con base a tu imagen. <br />
            Sube tu imagen y deja que <strong>Cutless</strong> haga el resto.
          </p>

          <div
            className="mx-auto flex max-w-xl flex-col items-center rounded-lg bg-white p-2 md:flex-row"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div
              className={cn(
                'mb-2 flex w-full flex-1 cursor-pointer items-center rounded-md border-2 border-dashed p-3 md:mb-0',
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              <span
                className={cn(
                  'line-clamp-1 text-gray-500',
                  file && 'text-start'
                )}
              >
                {file ? file.name : 'Sube tu imagen aquí'}
              </span>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <button
              className="w-full cursor-pointer rounded-md bg-[#0d80f2] px-6 py-4 font-bold whitespace-nowrap md:ml-2 md:w-auto"
              onClick={handleNextStep}
              disabled={!file}
            >
              Siguiente Paso
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
