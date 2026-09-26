import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 bg-[#0a0a0a] text-white">
      {/* Big 404 Accent Text */}
      <h1 className="text-8xl sm:text-9xl font-black text-[#ccff00] tracking-widest font-sans drop-shadow-sm select-none">
        404</h1>

      {/* Main Message */}
      <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-wide mt-4">
        Page Not Found
      </h2>

      {/* Subtitle / Explanation */}
      <p className="text-zinc-400 text-sm sm:text-base max-w-md mt-3">
        Looks like you stepped off the training path. The page you are looking for doesn’t exist or has been moved.</p>

      {/* Action Button */}
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#ccff00] text-black font-bold rounded-full hover:bg-[#b8e600] transition-colors duration-200 text-sm uppercase tracking-wide shadow-md" >
          <span>← Back to Workouts</span>
        </Link>
      </div>
    </div>
  );
}