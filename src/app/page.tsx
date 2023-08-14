import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='magic-background bg-#55B1B0 flex min-h-screen flex-col items-center justify-center p-24'>
      {/* Heading */}
      <h1 className='mb-6 max-w-5xl rounded-lg bg-white bg-opacity-10 p-10 text-4xl font-bold text-white shadow-lg md:text-6xl'>
        🍽 Voilà! The Recipe Genie 🧞‍♂️
      </h1>

      {/* Sub-heading */}
      <p className='mb-12 max-w-5xl rounded-lg  px-10 text-center text-lg text-white md:text-xl'>
        Ever been perplexed 🤔 by what meal to conjure from the ingredients you
        have? Fret not, for{' '}
        <span className='font-semibold'>The Recipe Genie</span> is here to whisk
        away your culinary dilemmas! 🍳
      </p>

      {/* Image - you can replace the src with any image you want */}
      <div className='mb-48'></div>

      {/* Redirect button */}
      <Link href='/recipe'>
        <p className='text-#55B1B0 transform rounded-full bg-white px-6 py-2 font-semibold shadow-md transition-transform hover:scale-105'>
          Take me to the magic! 🚀
        </p>
      </Link>
    </main>
  );
}
