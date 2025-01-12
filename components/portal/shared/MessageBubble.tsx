'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Message } from '@/lib/types/project';
import FilePreview from '@/components/shared/FilePreview';
import { FaCheck, FaCheckDouble, FaFile, FaImage } from 'react-icons/fa';

interface Props {
  message: Message;
  isOwn: boolean;
  participants?: { id: string; name: string }[];
}

export default function MessageBubble({ message, isOwn, participants }: Props) {
  const [selectedFile, setSelectedFile] = useState<Message['attachments'][number] | null>(null);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return FaImage;
    return FaFile;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`max-w-[80%] ${
            isOwn
              ? 'bg-primary-purple/20 text-white'
              : 'bg-white/5 text-white/90'
          } rounded-2xl px-4 py-3`}
        >
          {!isOwn && (
            <p className="text-xs text-white/60 mb-1">{message.senderName}</p>
          )}
          
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {message.attachments.map((file, index) => {
                const FileIcon = getFileIcon(file.type);
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedFile(file)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 
                      rounded-lg text-xs text-primary-purple hover:text-light-blue transition-colors"
                  >
                    <FileIcon className="w-4 h-4" />
                    <span className="max-w-[100px] truncate">{file.name}</span>
                  </button>
                );
              })}
            </div>
          )}
          
          <div className="flex items-center justify-end gap-2 mt-1">
            <p className="text-xs text-white/40">
              {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
            </p>
            {isOwn && (
              <div className="text-xs text-white/40">
                {message.readBy.length > 1 ? (
                  <FaCheckDouble className="w-3 h-3 text-light-blue" />
                ) : (
                  <FaCheck className="w-3 h-3" />
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedFile && (
          <FilePreview
            file={selectedFile}
            onClose={() => setSelectedFile(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
} 