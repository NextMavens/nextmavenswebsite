export type ProjectStatus = 'pending' | 'in-progress' | 'completed' | 'rejected';

export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  budget: string;
  timeline: string;
  status: ProjectStatus;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  messages?: Message[];
}

export interface Message {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderRole: 'customer' | 'companyadmin';
  content: string;
  attachments: Array<{
    url: string;
    name: string;
    type: string;
    size: number;
  }>;
  createdAt: string;
  readBy: string[];
  deliveredAt?: string;
} 