import { Shield, Plus } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// 역할 데이터
const roles = [
  {
    name: "관리자",
    description: "모든 기능에 대한 전체 접근 권한",
    userCount: 3,
    permissions: 24,
    variant: "destructive" as const,
  },
  {
    name: "편집자",
    description: "콘텐츠 생성 및 편집 권한",
    userCount: 12,
    permissions: 15,
    variant: "default" as const,
  },
  {
    name: "뷰어",
    description: "읽기 전용 접근 권한",
    userCount: 45,
    permissions: 8,
    variant: "secondary" as const,
  },
  {
    name: "게스트",
    description: "제한된 공개 콘텐츠 접근",
    userCount: 128,
    permissions: 3,
    variant: "outline" as const,
  },
]

// 역할 관리 페이지
export default function RolesPage() {
  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">역할 관리</h1>
          <p className="text-muted-foreground">
            사용자 역할을 정의하고 관리합니다.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 size-4" />
          역할 추가
        </Button>
      </div>

      {/* 역할 카드 그리드 */}
      <div className="grid gap-4 sm:grid-cols-2">
        {roles.map((role) => (
          <Card key={role.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="size-5 text-muted-foreground" />
                  <CardTitle className="text-lg">{role.name}</CardTitle>
                </div>
                <Badge variant={role.variant}>{role.userCount}명</Badge>
              </div>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {role.permissions}개의 권한 포함
                </span>
                <Button variant="ghost" size="sm">
                  수정
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 역할 상세 설정 영역 */}
      <Card>
        <CardHeader>
          <CardTitle>역할 권한 매트릭스</CardTitle>
          <CardDescription>
            각 역할별 세부 권한을 확인하고 수정합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed">
            <p className="text-sm text-muted-foreground">
              권한 매트릭스 영역 (준비 중)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
