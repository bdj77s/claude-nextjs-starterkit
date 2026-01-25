"use client"

import Link from "next/link"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/common/logo"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface HeaderProps {
  className?: string
  onMenuClick?: () => void
  showMenuButton?: boolean
}

// 헤더 컴포넌트 - 네비게이션 바
export function Header({
  className,
  onMenuClick,
  showMenuButton = false,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-4">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onMenuClick}
            >
              <Menu className="size-5" />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          )}
          <Logo />
        </div>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden flex-1 items-center gap-6 px-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            홈
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            소개
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            문서
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}

// 사용자 메뉴 드롭다운
function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-8 rounded-full">
          <Avatar className="size-8">
            <AvatarImage src="/avatar.png" alt="사용자" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">사용자</p>
            <p className="text-xs leading-none text-muted-foreground">
              user@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>프로필</DropdownMenuItem>
        <DropdownMenuItem>설정</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>로그아웃</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
