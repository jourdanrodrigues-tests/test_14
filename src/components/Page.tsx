import React from 'react';

import { Typography } from '@material-tailwind/react';

import mergeCls from '@/mergeCls.ts';

type Props = { title: string; children: React.ReactNode; className?: string };

export default function Page({ title, children, className }: Props) {
  return (
    <div
      className={mergeCls(
        'max-h-screen w-screen flex flex-col items-center justify-center',
        className
      )}
    >
      <Typography variant="h1">{title}</Typography>
      {children}
    </div>
  );
}
