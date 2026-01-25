"use client"

import { Activity, Users, DollarSign, CreditCard } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// 통계 카드 데이터
const stats = [
  {
    title: "총 수익",
    value: "₩45,231,890",
    change: "+20.1%",
    icon: DollarSign,
  },
  {
    title: "구독자",
    value: "+2,350",
    change: "+180.1%",
    icon: Users,
  },
  {
    title: "판매",
    value: "+12,234",
    change: "+19%",
    icon: CreditCard,
  },
  {
    title: "활성 사용자",
    value: "+573",
    change: "+201",
    icon: Activity,
  },
]

// 대시보드 페이지
export default function DashboardPage() {
  const handleTestToast = () => {
    toast.success("알림 테스트", {
      description: "Sonner 토스트가 정상적으로 작동합니다!",
    })
  }

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
          <p className="text-muted-foreground">
            프로젝트 개요와 주요 지표를 확인하세요.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleTestToast}>
            알림 테스트
          </Button>
          <Button>보고서 다운로드</Button>
        </div>
      </div>

      {/* 통계 카드 그리드 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>{" "}
                전월 대비
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* 차트 영역 (플레이스홀더) */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>개요</CardTitle>
            <CardDescription>
              월별 수익 및 사용자 활동 추이
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed">
              <p className="text-sm text-muted-foreground">
                차트 컴포넌트 영역 (recharts 등으로 구현)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 최근 활동 영역 */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
            <CardDescription>최근 7일간의 활동 내역</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="size-9 rounded-full bg-muted" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">사용자 {i}</p>
                    <p className="text-xs text-muted-foreground">
                      새로운 활동을 수행했습니다.
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {i}시간 전
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
