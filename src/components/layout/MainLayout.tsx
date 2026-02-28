import type { ReactNode } from "react";

interface MainLayoutProps {
  chatPanel: ReactNode;
  dataPanel: ReactNode;
}

export function MainLayout({ chatPanel, dataPanel }: MainLayoutProps) {
  return (
    <div className="flex flex-1 min-h-0">
      {/* Chat panel — 35% */}
      <div className="w-[35%] min-w-[320px] border-r border-border flex flex-col">
        {chatPanel}
      </div>
      {/* Data panel — 65% */}
      <div className="flex-1 flex flex-col overflow-hidden">{dataPanel}</div>
    </div>
  );
}
