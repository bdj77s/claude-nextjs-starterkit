import { BarChart3, TrendingUp, PieChart, LineChart } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// 분석 카드 데이터
const analyticsCards = [
  {
    title: "페이지 뷰",
    value: "124,532",
    change: "+12.5%",
    icon: BarChart3,
    description: "이번 달 총 페이지 조회수",
  },
  {
    title: "전환율",
    value: "3.24%",
    change: "+0.8%",
    icon: TrendingUp,
    description: "방문자 대비 전환 비율",
  },
  {
    title: "이탈률",
    value: "42.3%",
    change: "-5.2%",
    icon: PieChart,
    description: "단일 페이지 방문 후 이탈",
  },
  {
    title: "평균 세션",
    value: "4분 32초",
    change: "+18초",
    icon: LineChart,
    description: "사용자당 평균 체류 시간",
  },
]

// 분석 페이지
export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">분석</h1>
        <p className="text-muted-foreground">
          사이트 트래픽 및 사용자 행동을 분석합니다.
        </p>
      </div>

      {/* 분석 카드 그리드 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {analyticsCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{card.change}</span> 전월 대비
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 차트 영역 */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>트래픽 추이</CardTitle>
            <CardDescription>최근 30일간의 방문자 추이</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed">
              <p className="text-sm text-muted-foreground">
                트래픽 차트 영역 (준비 중)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>사용자 분포</CardTitle>
            <CardDescription>지역별 사용자 분포 현황</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed">
              <p className="text-sm text-muted-foreground">
                분포 차트 영역 (준비 중)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
