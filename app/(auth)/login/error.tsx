'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="mt-32 text-center">
      <h2 className="text-2xl font-bold mb-4">Algo deu errado!</h2>
      <p className="text-red-500 mb-4 whitespace-pre-line">
        {error.name === 'CredentialsSignin' ? (
          <p>Sua mensagem personalizada aqui</p>
        ) : (
          <p>{error.message ?? 'Algo deu errado.'}</p>
        )}
      </p>
      <Button
        onClick={
          // Tente recuperar clicando no botão abaixo para recarregar a página
          () => reset()
        }
      >
        Tentar novamente
      </Button>
    </div>
  );
}
