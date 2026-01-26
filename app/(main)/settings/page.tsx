import { Settings, User, Bell, Shield, Palette } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// 설정 카테고리 데이터
const settingsCategories = [
  {
    title: "프로필 설정",
    description: "이름, 이메일, 프로필 사진 등 개인 정보를 관리합니다.",
    icon: User,
  },
  {
    title: "알림 설정",
    description: "이메일, 푸시 알림 등 알림 수신 여부를 설정합니다.",
    icon: Bell,
  },
  {
    title: "보안 설정",
    description: "비밀번호, 2단계 인증 등 보안 관련 설정을 관리합니다.",
    icon: Shield,
  },
  {
    title: "테마 설정",
    description: "라이트/다크 모드 및 UI 테마를 변경합니다.",
    icon: Palette,
  },
]

// 설정 페이지
export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center gap-2">
        <Settings className="size-8 text-muted-foreground" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">설정</h1>
          <p className="text-muted-foreground">
            애플리케이션 설정을 관리합니다.
          </p>
        </div>
      </div>

      {/* 설정 카테고리 카드 */}
      <div className="grid gap-4 sm:grid-cols-2">
        {settingsCategories.map((category) => (
          <Card key={category.title} className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <category.icon className="size-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* 일반 설정 영역 */}
      <Card>
        <CardHeader>
          <CardTitle>일반 설정</CardTitle>
          <CardDescription>
            시스템 전반에 적용되는 일반 설정입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">언어</p>
              <p className="text-sm text-muted-foreground">
                인터페이스 표시 언어를 선택합니다.
              </p>
            </div>
            <Button variant="outline">한국어</Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">시간대</p>
              <p className="text-sm text-muted-foreground">
                날짜 및 시간 표시 기준을 설정합니다.
              </p>
            </div>
            <Button variant="outline">Asia/Seoul (UTC+9)</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
