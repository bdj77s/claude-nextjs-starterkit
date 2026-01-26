import { Users, UserPlus, UserCheck, UserX } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// 사용자 통계 데이터
const userStats = [
  {
    title: "전체 사용자",
    value: "2,350",
    icon: Users,
    description: "등록된 총 사용자 수",
  },
  {
    title: "신규 사용자",
    value: "+127",
    icon: UserPlus,
    description: "이번 달 가입자",
  },
  {
    title: "활성 사용자",
    value: "1,892",
    icon: UserCheck,
    description: "최근 30일 활동",
  },
  {
    title: "비활성 사용자",
    value: "458",
    icon: UserX,
    description: "30일 이상 미접속",
  },
]

// 사용자 목록 페이지
export default function UsersPage() {
  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">사용자 관리</h1>
          <p className="text-muted-foreground">
            시스템에 등록된 사용자를 관리합니다.
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 size-4" />
          사용자 추가
        </Button>
      </div>

      {/* 통계 카드 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {userStats.map((stat) => (
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

      {/* 사용자 목록 테이블 영역 */}
      <Card>
        <CardHeader>
          <CardTitle>사용자 목록</CardTitle>
          <CardDescription>등록된 모든 사용자를 확인합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed">
            <p className="text-sm text-muted-foreground">
              사용자 테이블 영역 (준비 중)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
