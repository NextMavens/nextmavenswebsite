'use client';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFile, FaImage, FaFilePdf, FaFileWord, FaTimes } from 'react-icons/fa';

interface FileAttachment {
  url: string;
  name: string;
  type: string;
  size: number;
}

interface Props {
  file: FileAttachment;
  onClose: () => void;
}

export default function FilePreview({ file, onClose }: Props) {
  const [loading, setLoading] = useState(true);

  const getFileIcon = () => {
    if (file.type.startsWith('image/')) return FaImage;
    if (file.type === 'application/pdf') return FaFilePdf;
    if (file.type.includes('word')) return FaFileWord;
    return FaFile;
  };

  const FileIcon = getFileIcon();

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#0f0428] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FileIcon className="w-5 h-5 text-primary-purple" />
            <div>
              <h3 className="text-white font-medium">{file.name}</h3>
              <p className="text-sm text-white/60">{formatFileSize(file.size)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaTimes className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Preview Area */}
        <div className="relative aspect-video bg-black/30">
          {file.type.startsWith('image/') ? (
            <>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary-purple border-t-transparent rounded-full animate-spin" />
                </div>
              )}
             <Image
  src={file.url}
  alt={file.name}
  width={500} // Specify the desired width
  height={500} // Specify the desired height
  className="w-full h-full object-contain"
  onLoadingComplete={() => setLoading(false)} // Use onLoadingComplete instead of onLoad
/>
            </>
          ) : file.type === 'application/pdf' ? (
            <iframe
              src={file.url}
              className="w-full h-full"
              title={file.name}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60">
              <FileIcon className="w-16 h-16 mb-4" />
              <p>Preview not available</p>
              <a
                href={file.url}
                download
                className="mt-4 px-4 py-2 bg-primary-purple/20 hover:bg-primary-purple/30 
                  rounded-lg transition-colors"
              >
                Download File
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
} 