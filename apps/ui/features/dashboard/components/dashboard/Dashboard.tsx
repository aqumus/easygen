'use client'

import { useUser } from "@/features/auth";
import { redirect } from "next/navigation";
import { paths } from "@/config/paths";

export function Dashboard() {
  
    const { data: user } = useUser();
  
    if (!user) {
      redirect(paths.auth.login.getHref());
    }
  
    return (
  
      <div>
        Welcome to the application {user?.name}
      </div>
    );
  }
