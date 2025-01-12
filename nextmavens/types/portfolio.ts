export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'mobile' | 'design' | 'ecommerce' | 'enterprise';
  technologies: string[];
  imageUrls: string[];
  clientName: string;
  completionDate: Date;
  featured: boolean;
  testimonial?: {
    text: string;
    author: string;
    position: string;
  };
  projectUrl?: string;
  stats?: {
    [key: string]: string | number;
  };
}

export interface ProjectFilter {
  category?: string;
  technology?: string;
  featured?: boolean;
} 