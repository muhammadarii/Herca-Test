import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BadgeDollarSignIcon,
  HandCoinsIcon,
  Home,
  Inbox,
  ShoppingBag,
} from "lucide-react";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Marketing",
    url: "/marketing",
    icon: Inbox,
  },
  {
    title: "Penjualan",
    url: "/penjualan",
    icon: ShoppingBag,
  },
  {
    title: "Komisi",
    url: "/komisi",
    icon: HandCoinsIcon,
  },
  {
    title: "Pembayaran",
    url: "/pembayaran",
    icon: BadgeDollarSignIcon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Herca-Test</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
