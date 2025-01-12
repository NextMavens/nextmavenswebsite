'use client';

export default function FilterDropdown() {
  return (
    <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white">
      <option value="all">All</option>
      <option value="pending">Pending</option>
      <option value="paid">Paid</option>
    </select>
  );
} 