'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboardMenuPaths } from '@/constants';
import Link from 'next/link';
import UserInfo from './user/UserInfo';
import { usePathname } from 'next/navigation';

export function DashboardSidebar() {
  const pathName = usePathname();

  return (
    <Sidebar>
      <div className="p-4">
        <SidebarHeader className="mb-2">
          <Link href="/" className="mb-5">
            <h1 className="font-bold text-3xl text-white">Tetatron</h1>
          </Link>
          <UserInfo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            {dashboardMenuPaths.map((item) => (
              <div key={item.title}>
                <SidebarGroupLabel className="font-roboto font-medium text-lg ">
                  {item.title}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  {item.paths.map(({ name, path, icon: Icon }) => (
                    <SidebarMenu key={name}>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          size="lg"
                          asChild
                          className=" text-black"
                          isActive={pathName === path}
                        >
                          <a href={path}>
                            <Icon className="w-5 h-5" />
                            {name}
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  ))}
                </SidebarGroupContent>
              </div>
            ))}
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </div>
    </Sidebar>
  );
}
