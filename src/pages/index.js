import * as React from 'react';
import dynamic from 'next/dynamic';
import { useAnimation } from 'framer-motion';

import { useLocomotiveScroll } from 'react-locomotive-scroll';

import ArrowScroll from '@/components/ArrowScroll';

const MainScene = dynamic(() => import('@/components/MainScene'), {
  ssr: false,
});

import CommonLayout from '@/layouts/CommonLayout';

import { useTheme } from '@/hooks/useTheme';

const transition = {
  duration: 0.45,
  ease: [0.4, 0, 0.2, 1],
};

export default function Home() {
  const { toggle, getTheme } = useTheme();

  return (
    <CommonLayout>
      <div className="min-h-[100vh] relative flex flex-none h-full">
        <MainScene />
      </div>
      <ArrowScroll />
    </CommonLayout>
  );
}
