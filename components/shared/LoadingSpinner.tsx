'use client';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-[#0f0428] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  );
}