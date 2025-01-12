export type NotificationType = 
  | 'new_message'
  | 'status_update'
  | 'new_application'
  | 'application_assigned';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  projectId?: string;
  read: boolean;
  createdAt: string;
} 