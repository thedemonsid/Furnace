import { Sidebar } from "@/components/sidebar/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen font-mono m-0 p-0">
      {/* Sidebar */}
      <Sidebar></Sidebar>
      {children}
    </div>
  );
}
