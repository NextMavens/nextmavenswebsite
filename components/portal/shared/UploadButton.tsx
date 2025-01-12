'use client';

interface UploadButtonProps {
  onUpload: (files: FileList) => void;
}

export default function UploadButton({ onUpload }: UploadButtonProps) {
  return (
    <label className="px-4 py-2 bg-primary-purple rounded-lg text-white cursor-pointer hover:bg-opacity-90">
      Upload Files
      <input
        type="file"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && onUpload(e.target.files)}
      />
    </label>
  );
} 