import { Suspense } from "react";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentAuth";
import { SignOutButton } from "@/services/clerk/components/AuthButtons";
import { LogOutIcon } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { SidebarUserButtonClient } from "./_SidebarUserButtonClient";

export function SidebarUserButton() {
  return (
    <Suspense>
      <SidebarUserSuspense />
    </Suspense>
  );
}

async function SidebarUserSuspense() {
  const { user } = await getCurrentUser({ allData: true });

  if (user == null) {
    return (
      <SignOutButton>
        <SidebarMenuButton>
          <LogOutIcon />
          <span>Logout</span>
        </SidebarMenuButton>
      </SignOutButton>
    );
  }
  return <SidebarUserButtonClient user={user} />;
}
