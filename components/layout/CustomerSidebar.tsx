'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaHome, 
  FaProjectDiagram, 
  FaComments, 
  FaFileInvoice, 
  FaChartBar,
  FaCog 
} from 'react-icons/fa';

const navigationItems = [
  { href: '/dashboard', label: 'Overview', icon: FaHome },
  { href: '/dashboard/projects', label: 'Projects', icon: FaProjectDiagram },
  { href: '/dashboard/messages', label: 'Messages', icon: FaComments },
  { href: '/dashboard/invoices', label: 'Invoices', icon: FaFileInvoice },
  { href: '/dashboard/analytics', label: 'Analytics', icon: FaChartBar },
  { href: '/dashboard/settings', label: 'Settings', icon: FaCog },
];

export function CustomerSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 h-full">
      <div className="p-4">
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-purple text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
} 