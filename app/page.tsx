import Link from "next/link"
import { ArrowRight, Github, Sparkles, Zap, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/common/logo"
import { ThemeToggle } from "@/components/layout/theme-toggle"

// 기능 목록
const features = [
  {
    icon: Zap,
    title: "빠른 개발",
    description: "Next.js 15와 React 19로 최신 기술 스택을 활용하세요.",
  },
  {
    icon: Sparkles,
    title: "모던 UI",
    description: "Tailwind CSS와 shadcn/ui로 아름다운 인터페이스를 구축하세요.",
  },
  {
    icon: Shield,
    title: "타입 안전",
    description: "TypeScript로 안전한 코드를 작성하세요.",
  },
]

// 랜딩 페이지
export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Logo />
          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-6 md:flex">
              <Link
                href="/docs"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                문서
              </Link>
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                로그인
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="container mx-auto flex flex-1 flex-col items-center justify-center gap-8 px-4 py-20 text-center md:py-32">
        <Badge variant="secondary" className="gap-1">
          <Sparkles className="size-3" />
          Next.js 15 + React 19
        </Badge>

        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            모던 웹 개발을 위한
            <br />
            <span className="text-primary">Next.js 스타터킷</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Tailwind CSS, shadcn/ui, Zustand 등 최신 기술 스택으로
            빠르게 프로젝트를 시작하세요.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/dashboard">
              시작하기
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="https://github.com" target="_blank" rel="noopener">
              <Github className="mr-2 size-4" />
              GitHub
            </Link>
          </Button>
        </div>
      </section>

      {/* 기능 섹션 */}
      <section className="border-t bg-muted/40 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">주요 기능</h2>
            <p className="mt-2 text-muted-foreground">
              개발 생산성을 높이는 기능들을 제공합니다.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="size-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" className="gap-1" asChild>
                    <Link href="/docs">
                      자세히 보기
                      <ArrowRight className="size-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="border-t py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Next.js Starter Kit. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              개인정보처리방침
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              이용약관
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
