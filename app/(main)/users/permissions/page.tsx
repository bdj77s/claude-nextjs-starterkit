import { Lock, Plus, Search } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// 권한 카테고리 데이터
const permissionCategories = [
  {
    category: "사용자 관리",
    permissions: [
      { name: "users.view", description: "사용자 목록 조회" },
      { name: "users.create", description: "사용자 생성" },
      { name: "users.edit", description: "사용자 정보 수정" },
      { name: "users.delete", description: "사용자 삭제" },
    ],
  },
  {
    category: "콘텐츠 관리",
    permissions: [
      { name: "content.view", description: "콘텐츠 조회" },
      { name: "content.create", description: "콘텐츠 생성" },
      { name: "content.edit", description: "콘텐츠 편집" },
      { name: "content.publish", description: "콘텐츠 게시" },
    ],
  },
  {
    category: "시스템 설정",
    permissions: [
      { name: "settings.view", description: "설정 조회" },
      { name: "settings.edit", description: "설정 변경" },
      { name: "logs.view", description: "로그 조회" },
      { name: "backup.manage", description: "백업 관리" },
    ],
  },
]

// 권한 관리 페이지
export default function PermissionsPage() {
  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">권한 관리</h1>
          <p className="text-muted-foreground">
            시스템 권한을 정의하고 관리합니다.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 size-4" />
          권한 추가
        </Button>
      </div>

      {/* 검색 영역 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="권한 검색..." className="pl-9" />
        </div>
      </div>

      {/* 권한 카테고리별 카드 */}
      <div className="space-y-4">
        {permissionCategories.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="size-5 text-muted-foreground" />
                <CardTitle>{category.category}</CardTitle>
              </div>
              <CardDescription>
                {category.permissions.length}개의 권한이 포함되어 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {category.permissions.map((permission) => (
                  <div
                    key={permission.name}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <Badge variant="outline" className="font-mono text-xs">
                        {permission.name}
                      </Badge>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
