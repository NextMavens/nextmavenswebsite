import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CustomerSidebar } from '@/components/layout/CustomerSidebar';

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0f0428]">
      <DashboardLayout sidebar={<CustomerSidebar />}>
        {children}
      </DashboardLayout>
    </div>
  );
} 