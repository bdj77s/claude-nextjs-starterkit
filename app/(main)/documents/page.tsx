import { FileText, FolderOpen, Upload, Search } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// 문서 통계 데이터
const documentStats = [
  {
    title: "전체 문서",
    value: "1,234",
    icon: FileText,
    description: "등록된 총 문서 수",
  },
  {
    title: "폴더",
    value: "56",
    icon: FolderOpen,
    description: "생성된 폴더 수",
  },
]

// 최근 문서 데이터
const recentDocuments = [
  { name: "프로젝트 기획서.pdf", size: "2.4 MB", date: "2024-01-15" },
  { name: "디자인 가이드.docx", size: "1.8 MB", date: "2024-01-14" },
  { name: "API 문서.md", size: "456 KB", date: "2024-01-13" },
  { name: "회의록_1월.pdf", size: "890 KB", date: "2024-01-12" },
  { name: "요구사항 정의서.xlsx", size: "1.2 MB", date: "2024-01-11" },
]

// 문서 페이지
export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">문서</h1>
          <p className="text-muted-foreground">
            문서를 업로드하고 관리합니다.
          </p>
        </div>
        <Button>
          <Upload className="mr-2 size-4" />
          업로드
        </Button>
      </div>

      {/* 통계 카드 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {documentStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 검색 영역 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="문서 검색..." className="pl-9" />
        </div>
      </div>

      {/* 최근 문서 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>최근 문서</CardTitle>
          <CardDescription>최근에 업로드되거나 수정된 문서입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentDocuments.map((doc) => (
              <div
                key={doc.name}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <FileText className="size-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.size}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{doc.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
