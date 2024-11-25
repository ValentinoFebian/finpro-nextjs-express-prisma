'use client';
import EventList from '../events';
import Footer from '@/views/components/Footer';
import dynamic from 'next/dynamic';

const ImageSlider = dynamic(() => import('@/views/components/ImageSlider'), {
  ssr: false,
});

export default function HomeView() {
  return (
    <div>
      <section className="pt-24 w-full relative flex flex-col items-center justify-center bg-home-icon-sm sm:bg-home-icon-md lg:bg-home-icon-lg xl:bg-home-icon-xl bg-cover bg-center text-center min-h-screen">
        <div className="w-full max-w-screen-lg mx-auto">
          <ImageSlider />
          <div className="w-full relative flex flex-col items-center justify-center min-h-screen bg-home-icon-sm sm:bg-home-icon-md lg:bg-home-icon-lg xl:bg-home-icon-xl bg-cover bg-center text-center">
            <div className="absolute inset opacity-50"></div>
            <EventList />
          </div>
        </div>
      </section>
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}
