'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Project, Message } from '@/lib/types/project';
import { uploadFiles } from '@/lib/telegram-storage';
import MessageBubble from '../shared/MessageBubble';

interface Props {
  userId: string;
}

export default function MessagesSection({ userId }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch user's projects
  useEffect(() => {
    const projectsRef = collection(db, 'applications');
    const projectsQuery = query(
      projectsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(projectsQuery, (snapshot) => {
      const projectsData: Project[] = [];
      snapshot.forEach((doc) => {
        projectsData.push({ id: doc.id, ...doc.data() } as Project);
      });
      setProjects(projectsData);
    });
  }, [userId]);

  // Fetch messages for selected project
  useEffect(() => {
    if (!selectedProject) return;

    const messagesRef = collection(db, 'messages');
    const messagesQuery = query(
      messagesRef,
      where('projectId', '==', selectedProject.id),
      orderBy('createdAt', 'asc')
    );

    return onSnapshot(messagesQuery, (snapshot) => {
      const messagesData: Message[] = [];
      snapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(messagesData);
      scrollToBottom();
    });
  }, [selectedProject]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!selectedProject || (!newMessage.trim() && attachments.length === 0)) return;

    setLoading(true);
    try {
      let attachmentUrls: string[] = [];
      if (attachments.length > 0) {
        attachmentUrls = await uploadFiles(attachments);
      }

      await addDoc(collection(db, 'messages'), {
        projectId: selectedProject.id,
        senderId: userId,
        senderRole: 'customer',
        content: newMessage.trim(),
        attachments: attachmentUrls,
        createdAt: serverTimestamp(),
        readBy: [userId]
      });

      setNewMessage('');
      setAttachments([]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 5) {
      alert('Maximum 5 files allowed');
      return;
    }
    setAttachments(files);
  };

  return (
    <div className="h-[calc(100vh-200px)] flex">
      {/* Projects List */}
      <div className="w-64 border-r border-white/10 overflow-y-auto">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className={`w-full p-4 text-left hover:bg-white/5 transition-colors
              ${selectedProject?.id === project.id ? 'bg-white/10' : ''}`}
          >
            <h3 className="text-white font-medium truncate">{project.title}</h3>
            <p className="text-white/60 text-sm truncate">{project.category}</p>
          </button>
        ))}
      </div>

      {/* Messages Area */}
      {selectedProject ? (
        <div className="flex-1 flex flex-col">
          {/* Project Header */}
          <div className="p-4 border-b border-white/10">
            <h2 className="text-white font-medium">{selectedProject.title}</h2>
            <p className="text-white/60 text-sm">{selectedProject.category}</p>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.senderId === userId}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 
                  text-white placeholder-white/40 focus:border-primary-purple focus:ring-1 
                  focus:ring-primary-purple"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={loading || (!newMessage.trim() && attachments.length === 0)}
                className="px-4 py-2 bg-gradient-to-r from-primary-purple to-light-blue 
                  rounded-lg text-white disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send'}
              </motion.button>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              />
              <label
                htmlFor="file-upload"
                className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 
                  hover:text-white cursor-pointer transition-colors text-sm"
              >
                Attach Files
              </label>
              {attachments.length > 0 && (
                <span className="text-white/60 text-sm">
                  {attachments.length} file(s) selected
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-white/60">
          Select a project to view messages
        </div>
      )}
    </div>
  );
} 