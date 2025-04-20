import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Dashboard } from "../Dashboard";
import { Transformer } from "../Transformer";
import { Analytics } from "../Analytics";

import { useLocation } from "react-router-dom";

export default function Page() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col">
            {/* 使用 switch 语句处理多路径 */}
            {(() => {
              switch (location.pathname) {
                case "/page/dashboard":
                  return <Dashboard />;
                case "/page/transformer":
                  return <Transformer />;
                case "/page/analytics":
                  return <Analytics />;
                default:
                  return <Dashboard />;
              }
            })()}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
