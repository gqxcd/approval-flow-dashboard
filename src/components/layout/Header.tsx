
import React from 'react';
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Clock, FileText, Search, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header 
      className={cn("h-16 border-b border-slate-200 flex items-center px-4 bg-white", 
      className)}
    >
      <div className="flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search..." 
            className="pl-10 w-full bg-slate-100 border-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <nav>
          <ul className="hidden md:flex items-center gap-4">
            <li>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-slate-100">
                      <div className="flex items-center gap-1.5">
                        <FileText size={18} />
                        <span className="font-medium">All Requests</span>
                      </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white">
                      <ul className="grid w-[200px] p-2 gap-1">
                        <li>
                          <NavigationMenuLink asChild>
                            <Button variant="ghost" size="sm" className="w-full justify-start">
                              HR
                            </Button>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Button variant="ghost" size="sm" className="w-full justify-start">
                              MyIT
                            </Button>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Button variant="ghost" size="sm" className="w-full justify-start">
                              Workday
                            </Button>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Button variant="ghost" size="sm" className="w-full justify-start">
                              Internal Approval
                            </Button>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li>
            <li>
              <Button variant="ghost" size="sm" className="flex gap-1.5">
                <FileText size={18} />
                <span className="font-medium">My Requests</span>
              </Button>
            </li>
            <li>
              <Button variant="ghost" size="sm" className="flex gap-1.5">
                <Clock size={18} />
                <span className="font-medium">Pending Approval</span>
              </Button>
            </li>
            <li>
              <Button variant="ghost" size="sm" className="flex gap-1.5">
                <Settings size={18} />
                <span>Settings</span>
              </Button>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full h-4 w-4 flex items-center justify-center text-white text-xs">
              3
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="font-medium hidden sm:inline-block">John Doe</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
