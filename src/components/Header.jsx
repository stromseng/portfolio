import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypographyH2 } from "@/components/ui/typography";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-border/40 bg-background">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="scroll-m-20 text-3xl font-semibold tracking-tight">
                    Magnus A. Strømseng
                </div>
                <div>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle()}
                                    href="/about"
                                >
                                    About
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div></div>
            </div>
        </header>
    );
}