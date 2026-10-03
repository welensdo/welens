import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panel de Administración - WeLens',
  description: 'Panel de administración para WeLens',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}