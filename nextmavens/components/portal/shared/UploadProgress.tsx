'use client';

interface UploadProgressProps {
  visible: boolean;
  progress: number;
}

export default function UploadProgress({ visible, progress }: UploadProgressProps) {
  if (!visible) return null;

  return (
    <div className="w-full bg-white/5 rounded-full h-2">
      <div 
        className="bg-primary-purple h-full rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
} 