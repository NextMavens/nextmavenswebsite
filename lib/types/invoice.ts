export interface Invoice {
  id: string;
  projectId: string;
  amount: number;
  status: 'pending' | 'paid';
  dueDate: string;
  createdAt: string;
  items: {
    description: string;
    amount: number;
  }[];
} 