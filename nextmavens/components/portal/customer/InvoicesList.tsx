'use client';

import { useState } from 'react';
import FilterDropdown from '../shared/FilterDropdown';
import SearchInput from '../shared/SearchInput';
import { Invoice } from '@/lib/types/invoice';

export default function InvoicesList() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Invoices</h2>
        <div className="flex gap-4">
          <FilterDropdown />
          <SearchInput />
        </div>
      </div>
      
      <div className="bg-white/5 rounded-xl overflow-hidden">
        {/* Invoice table/list implementation */}
        {invoices.length === 0 ? (
          <div className="p-4 text-center text-white/60">
            No invoices found
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {/* Map through invoices */}
          </div>
        )}
      </div>
    </div>
  );
} 