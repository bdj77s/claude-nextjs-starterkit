import Link from "next/link"
import { ArrowLeft, Book, Code, Rocket, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// 문서 섹션 데이터
const docSections = [
  {
    title: "시작하기",
    description: "프로젝트 설정 및 기본 사용법을 알아보세요.",
    icon: Rocket,
    items: ["설치 가이드", "첫 번째 프로젝트", "기본 설정"],
  },
  {
    title: "가이드",
    description: "주요 기능에 대한 상세 가이드입니다.",
    icon: Book,
    items: ["인증 설정", "데이터베이스 연동", "API 사용법"],
  },
  {
    title: "API 레퍼런스",
    description: "API 엔드포인트 및 사용 예제입니다.",
    icon: Code,
    items: ["REST API", "WebSocket", "인증 API"],
  },
  {
    title: "설정",
    description: "고급 설정 및 커스터마이징 옵션입니다.",
    icon: Settings,
    items: ["환경 변수", "테마 설정", "플러그인"],
  },
]

// 문서 페이지 (공개)
export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-16">
        {/* 홈으로 돌아가기 버튼 */}
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 size-4" />
            홈으로
          </Link>
        </Button>

        {/* 페이지 헤더 */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">문서</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            프로젝트를 시작하고 활용하는 데 필요한 모든 정보를 제공합니다.
          </p>
        </div>

        {/* 문서 섹션 그리드 */}
        <div className="grid gap-6 md:grid-cols-2">
          {docSections.map((section) => (
            <Card key={section.title} className="hover:bg-muted/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <section.icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                      → {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 추가 리소스 */}
        <div className="mt-12 rounded-lg border p-6">
          <h2 className="text-xl font-semibold">추가 리소스</h2>
          <p className="mt-2 text-muted-foreground">
            더 많은 도움이 필요하시면 아래 리소스를 참고하세요.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Button variant="outline">GitHub</Button>
            <Button variant="outline">Discord 커뮤니티</Button>
            <Button variant="outline">FAQ</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
