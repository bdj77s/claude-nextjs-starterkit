# 컴포넌트 상세 문서

이 문서는 프로젝트의 주요 컴포넌트에 대한 상세 설명과 사용법을 제공합니다.

---

## 목차

1. [레이아웃 컴포넌트](#1-레이아웃-컴포넌트)
2. [네비게이션 컴포넌트](#2-네비게이션-컴포넌트)
3. [UI 컴포넌트](#3-ui-컴포넌트)
4. [공통 컴포넌트](#4-공통-컴포넌트)
5. [프로바이더 컴포넌트](#5-프로바이더-컴포넌트)
6. [상태 관리](#6-상태-관리)
7. [유틸리티 함수](#7-유틸리티-함수)
8. [타입 정의](#8-타입-정의)

---

## 1. 레이아웃 컴포넌트

### 1.1 RootLayout (app/layout.tsx)

**용도**: 애플리케이션의 최상위 레이아웃

**주요 기능**:
- HTML 기본 구조 정의
- 전역 폰트 설정
- 테마 프로바이더 래핑
- 전역 토스트 알림

**Props**:
```typescript
interface RootLayoutProps {
  children: React.ReactNode
}
```

**구조**:
```typescript
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**주요 특징**:
- `suppressHydrationWarning`: 테마 관련 hydration 경고 억제
- Google Fonts 최적화 (next/font)
- 전역 CSS 적용

---

### 1.2 MainLayout (app/(main)/layout.tsx)

**용도**: 대시보드 및 메인 애플리케이션 페이지의 레이아웃

**주요 기능**:
- 사이드바 + 콘텐츠 영역 구조
- 상단 헤더 바
- 반응형 레이아웃

**구조**:
```typescript
export default function MainLayout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          <div className="flex-1 flex justify-between">
            <nav>{/* 브레드크럼 영역 */}</nav>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

**의존성**:
- `SidebarProvider`: shadcn/ui의 사이드바 컨텍스트
- `AppSidebar`: 커스텀 사이드바 컴포넌트
- `ThemeToggle`: 테마 전환 버튼

**반응형 동작**:
- **Desktop** (>= 768px): 사이드바 고정, 토글 가능
- **Mobile** (< 768px): 사이드바 오버레이, 자동 닫힘

---

### 1.3 AuthLayout (app/(auth)/layout.tsx)

**용도**: 인증 페이지 (로그인, 회원가입) 레이아웃

**주요 기능**:
- 중앙 정렬된 심플한 레이아웃
- 사이드바 없음

**구조**:
```typescript
export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <div className="w-full max-w-md p-6">
        {children}
      </div>
    </div>
  )
}
```

---

## 2. 네비게이션 컴포넌트

### 2.1 AppSidebar (components/layout/app-sidebar.tsx)

**용도**: 메인 애플리케이션의 사이드 네비게이션

**Props**: 없음

**주요 기능**:
- 3단계 메뉴 구조 (메인, 관리, 기타)
- 계층적 서브메뉴
- 현재 경로 하이라이팅
- 아이콘 + 텍스트 표시
- 툴팁 지원

**메뉴 데이터 구조**:
```typescript
interface MenuItem {
  title: string
  href: string
  icon: LucideIcon
  subItems?: {
    title: string
    href: string
  }[]
}

const mainNavItems: MenuItem[] = [
  { title: "홈", href: "/", icon: Home },
  { title: "대시보드", href: "/dashboard", icon: LayoutDashboard },
  { title: "분석", href: "/analytics", icon: BarChart3 },
]

const managementItems: MenuItem[] = [
  {
    title: "사용자",
    href: "/users",
    icon: Users,
    subItems: [
      { title: "목록", href: "/users" },
      { title: "역할", href: "/users/roles" },
      { title: "권한", href: "/users/permissions" },
    ],
  },
  // ...
]
```

**사용 예시**:
```typescript
// MainLayout에서 사용
<SidebarProvider>
  <AppSidebar />
  {/* ... */}
</SidebarProvider>
```

**커스터마이징**:
1. **메뉴 항목 추가**:
```typescript
const mainNavItems = [
  // 기존 항목...
  {
    title: "새 메뉴",
    href: "/new-menu",
    icon: NewIcon,
  },
]
```

2. **서브메뉴 추가**:
```typescript
{
  title: "상위 메뉴",
  href: "/parent",
  icon: ParentIcon,
  subItems: [
    { title: "서브 1", href: "/parent/sub1" },
    { title: "서브 2", href: "/parent/sub2" },
  ],
}
```

**현재 경로 감지**:
```typescript
const pathname = usePathname()
// isActive 속성으로 현재 경로 하이라이팅
<SidebarMenuButton isActive={pathname === item.href}>
```

---

### 2.2 MobileNav (components/layout/mobile-nav.tsx)

**용도**: 모바일 환경의 네비게이션

**Props**:
```typescript
interface MobileNavProps {
  items: NavItem[]
}
```

**주요 기능**:
- Sheet 기반 슬라이드 메뉴
- 터치 친화적 UI
- 메뉴 선택 시 자동 닫힘

---

### 2.3 Header (components/layout/header.tsx)

**용도**: 페이지 상단 헤더

**주요 기능**:
- 로고 표시
- 네비게이션 링크
- 사용자 메뉴 (향후 추가)

---

### 2.4 Footer (components/layout/footer.tsx)

**용도**: 페이지 하단 푸터

**주요 기능**:
- 저작권 정보
- 소셜 링크
- 법적 문서 링크

---

## 3. UI 컴포넌트

### 3.1 Button (components/ui/button.tsx)

**용도**: 재사용 가능한 버튼 컴포넌트

**Variants**:
- `default`: 기본 버튼
- `destructive`: 삭제/경고 버튼
- `outline`: 아웃라인 버튼
- `secondary`: 보조 버튼
- `ghost`: 투명 버튼
- `link`: 링크 스타일 버튼

**Sizes**:
- `default`: 기본 크기
- `sm`: 작은 크기
- `lg`: 큰 크기
- `icon`: 아이콘 전용

**사용 예시**:
```typescript
import { Button } from "@/components/ui/button"

// 기본 버튼
<Button>클릭</Button>

// Variant 지정
<Button variant="destructive">삭제</Button>
<Button variant="outline" size="sm">작은 버튼</Button>

// 아이콘 버튼
<Button variant="ghost" size="icon">
  <Icon />
</Button>

// Link와 함께 사용
<Button asChild>
  <Link href="/dashboard">대시보드</Link>
</Button>
```

---

### 3.2 Card (components/ui/card.tsx)

**용도**: 카드 컨테이너 컴포넌트

**구성 요소**:
- `Card`: 카드 컨테이너
- `CardHeader`: 헤더 영역
- `CardTitle`: 제목
- `CardDescription`: 설명
- `CardContent`: 콘텐츠 영역
- `CardFooter`: 푸터 영역

**사용 예시**:
```typescript
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>카드 제목</CardTitle>
    <CardDescription>카드 설명</CardDescription>
  </CardHeader>
  <CardContent>
    {/* 콘텐츠 */}
  </CardContent>
  <CardFooter>
    {/* 푸터 */}
  </CardFooter>
</Card>
```

---

### 3.3 Dialog (components/ui/dialog.tsx)

**용도**: 모달 대화상자

**구성 요소**:
- `Dialog`: 루트 컴포넌트
- `DialogTrigger`: 트리거 버튼
- `DialogContent`: 모달 내용
- `DialogHeader`: 헤더
- `DialogTitle`: 제목
- `DialogDescription`: 설명
- `DialogFooter`: 푸터
- `DialogClose`: 닫기 버튼

**사용 예시**:
```typescript
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>모달 열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>제목</DialogTitle>
      <DialogDescription>설명</DialogDescription>
    </DialogHeader>
    {/* 콘텐츠 */}
    <DialogFooter>
      <Button>확인</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### 3.4 Input (components/ui/input.tsx)

**용도**: 텍스트 입력 필드

**Props**:
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // HTML Input 속성 모두 지원
}
```

**사용 예시**:
```typescript
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="space-y-2">
  <Label htmlFor="email">이메일</Label>
  <Input
    id="email"
    type="email"
    placeholder="example@email.com"
  />
</div>
```

**React Hook Form과 함께 사용**:
```typescript
import { useForm } from "react-hook-form"

function MyForm() {
  const { register } = useForm()

  return (
    <Input
      {...register("email", { required: true })}
      placeholder="이메일"
    />
  )
}
```

---

### 3.5 Select (components/ui/select.tsx)

**용도**: 선택 드롭다운

**구성 요소**:
- `Select`: 루트 컴포넌트
- `SelectTrigger`: 트리거 버튼
- `SelectValue`: 선택된 값 표시
- `SelectContent`: 드롭다운 내용
- `SelectItem`: 선택 항목

**사용 예시**:
```typescript
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="선택하세요" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">옵션 1</SelectItem>
    <SelectItem value="option2">옵션 2</SelectItem>
    <SelectItem value="option3">옵션 3</SelectItem>
  </SelectContent>
</Select>
```

---

### 3.6 Sidebar (components/ui/sidebar.tsx)

**용도**: 사이드바 UI 프리미티브

**구성 요소**:
- `SidebarProvider`: 사이드바 컨텍스트
- `Sidebar`: 사이드바 컨테이너
- `SidebarHeader`: 헤더 영역
- `SidebarContent`: 콘텐츠 영역
- `SidebarFooter`: 푸터 영역
- `SidebarGroup`: 메뉴 그룹
- `SidebarGroupLabel`: 그룹 라벨
- `SidebarGroupContent`: 그룹 콘텐츠
- `SidebarMenu`: 메뉴 컨테이너
- `SidebarMenuItem`: 메뉴 항목
- `SidebarMenuButton`: 메뉴 버튼
- `SidebarMenuSub`: 서브메뉴
- `SidebarMenuSubItem`: 서브메뉴 항목
- `SidebarMenuSubButton`: 서브메뉴 버튼
- `SidebarTrigger`: 사이드바 토글 버튼
- `SidebarInset`: 콘텐츠 영역 컨테이너

**사용 예시**:
```typescript
<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      {/* 로고 등 */}
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>메뉴 그룹</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Icon />
                <span>메뉴 항목</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      {/* 버전 정보 등 */}
    </SidebarFooter>
  </Sidebar>

  <SidebarInset>
    {/* 메인 콘텐츠 */}
  </SidebarInset>
</SidebarProvider>
```

---

### 3.7 Tooltip (components/ui/tooltip.tsx)

**용도**: 툴팁 표시

**구성 요소**:
- `TooltipProvider`: 툴팁 컨텍스트
- `Tooltip`: 루트 컴포넌트
- `TooltipTrigger`: 트리거 요소
- `TooltipContent`: 툴팁 내용

**사용 예시**:
```typescript
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <Icon />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>툴팁 내용</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

### 3.8 Sonner (components/ui/sonner.tsx)

**용도**: 토스트 알림

**사용 예시**:
```typescript
import { toast } from "sonner"

// 기본 토스트
toast("메시지")

// 성공 토스트
toast.success("성공적으로 저장되었습니다")

// 에러 토스트
toast.error("오류가 발생했습니다")

// 로딩 토스트
const toastId = toast.loading("처리 중...")
// 나중에 업데이트
toast.success("완료!", { id: toastId })

// 커스텀 토스트
toast("커스텀 메시지", {
  description: "상세 설명",
  action: {
    label: "실행 취소",
    onClick: () => console.log("Undo"),
  },
})
```

---

### 3.9 기타 UI 컴포넌트

| 컴포넌트 | 용도 | 파일 경로 |
|----------|------|-----------|
| **Accordion** | 접을 수 있는 콘텐츠 | `components/ui/accordion.tsx` |
| **Avatar** | 사용자 프로필 이미지 | `components/ui/avatar.tsx` |
| **Badge** | 배지/태그 | `components/ui/badge.tsx` |
| **Checkbox** | 체크박스 | `components/ui/checkbox.tsx` |
| **DropdownMenu** | 드롭다운 메뉴 | `components/ui/dropdown-menu.tsx` |
| **Label** | 폼 라벨 | `components/ui/label.tsx` |
| **ScrollArea** | 스크롤 영역 | `components/ui/scroll-area.tsx` |
| **Separator** | 구분선 | `components/ui/separator.tsx` |
| **Sheet** | 슬라이드 패널 | `components/ui/sheet.tsx` |
| **Skeleton** | 스켈레톤 로더 | `components/ui/skeleton.tsx` |
| **Switch** | 토글 스위치 | `components/ui/switch.tsx` |
| **Textarea** | 다중 줄 입력 | `components/ui/textarea.tsx` |

자세한 사용법은 [shadcn/ui 공식 문서](https://ui.shadcn.com)를 참고하세요.

---

## 4. 공통 컴포넌트

### 4.1 Logo (components/common/logo.tsx)

**용도**: 애플리케이션 로고

**Props**:
```typescript
interface LogoProps {
  showText?: boolean
  className?: string
}
```

**사용 예시**:
```typescript
import { Logo } from "@/components/common/logo"

// 아이콘만
<Logo />

// 아이콘 + 텍스트
<Logo showText />

// 커스텀 스타일
<Logo showText className="h-8" />
```

---

### 4.2 LoadingSpinner (components/common/loading-spinner.tsx)

**용도**: 로딩 스피너

**Props**:
```typescript
interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}
```

**사용 예시**:
```typescript
import { LoadingSpinner } from "@/components/common/loading-spinner"

// 기본 크기
<LoadingSpinner />

// 큰 크기
<LoadingSpinner size="lg" />

// 중앙 정렬
<div className="flex justify-center">
  <LoadingSpinner />
</div>
```

---

## 5. 프로바이더 컴포넌트

### 5.1 ThemeProvider (components/providers/theme-provider.tsx)

**용도**: 테마 관리 (라이트/다크 모드)

**Props**:
```typescript
interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: "class" | "data-theme"
  defaultTheme?: "light" | "dark" | "system"
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}
```

**사용 예시**:
```typescript
import { ThemeProvider } from "@/components/providers/theme-provider"

<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

**테마 사용**:
```typescript
import { useTheme } from "next-themes"

function Component() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <p>현재 테마: {theme}</p>
      <button onClick={() => setTheme("dark")}>다크 모드</button>
      <button onClick={() => setTheme("light")}>라이트 모드</button>
      <button onClick={() => setTheme("system")}>시스템</button>
    </div>
  )
}
```

---

### 5.2 ThemeToggle (components/layout/theme-toggle.tsx)

**용도**: 테마 전환 버튼

**주요 기능**:
- 드롭다운 메뉴로 테마 선택
- 현재 테마 아이콘 표시
- 라이트/다크/시스템 모드 지원

**사용 예시**:
```typescript
import { ThemeToggle } from "@/components/layout/theme-toggle"

// 헤더에 추가
<header>
  {/* 기타 요소 */}
  <ThemeToggle />
</header>
```

---

## 6. 상태 관리

### 6.1 useSidebarStore (stores/use-sidebar-store.ts)

**용도**: 사이드바 상태 관리

**상태**:
```typescript
interface SidebarState {
  isOpen: boolean       // 사이드바 열림/닫힘
  isCollapsed: boolean  // 사이드바 축소 상태
}
```

**액션**:
```typescript
interface SidebarActions {
  toggle: () => void                      // 열림/닫힘 토글
  setOpen: (open: boolean) => void        // 열림 상태 설정
  setCollapsed: (collapsed: boolean) => void // 축소 상태 설정
}
```

**사용 예시**:
```typescript
import { useSidebarStore } from "@/stores/use-sidebar-store"

function Component() {
  const { isOpen, toggle } = useSidebarStore()

  return (
    <div>
      <p>사이드바: {isOpen ? "열림" : "닫힘"}</p>
      <button onClick={toggle}>토글</button>
    </div>
  )
}
```

**Persistence**:
- 로컬 스토리지에 자동 저장 (`sidebar-storage` 키)
- 페이지 새로고침 시 상태 복원

---

### 6.2 새 스토어 추가 패턴

```typescript
// stores/use-[name]-store.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface State {
  // 상태 정의
  count: number
}

interface Actions {
  // 액션 정의
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useCountStore = create<State & Actions>()(
  persist(
    (set) => ({
      // 초기 상태
      count: 0,

      // 액션 구현
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: "count-storage", // 로컬 스토리지 키
    }
  )
)
```

---

## 7. 유틸리티 함수

### 7.1 cn (lib/utils.ts)

**용도**: Tailwind CSS 클래스명 조건부 병합

**구현**:
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**사용 예시**:
```typescript
import { cn } from "@/lib/utils"

// 기본 사용
<div className={cn("text-base", "font-bold")} />
// 결과: "text-base font-bold"

// 조건부 클래스
<div className={cn("text-base", isActive && "font-bold")} />

// 클래스 충돌 해결
<div className={cn("p-4", "p-8")} />
// 결과: "p-8" (나중 값 우선)

// 배열 지원
<div className={cn(["text-base", "font-bold"])} />

// 객체 지원
<div className={cn({
  "text-red-500": isError,
  "text-green-500": isSuccess,
})} />
```

**장점**:
- `clsx`: 조건부 클래스 처리
- `twMerge`: Tailwind 클래스 충돌 해결
- TypeScript 타입 안정성

---

### 7.2 Constants (lib/constants.ts)

**용도**: 애플리케이션 전역 상수

**정의된 상수**:
```typescript
// 사이트 설정
export const SITE_CONFIG = {
  name: "Next.js Starter Kit",
  description: "모던 Next.js 스타터킷",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
} as const

// 네비게이션 링크
export const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/about", label: "소개" },
  { href: "/docs", label: "문서" },
] as const

// 소셜 링크
export const SOCIAL_LINKS = {
  github: "https://github.com",
  twitter: "https://twitter.com",
} as const
```

**사용 예시**:
```typescript
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants"

// 사이트 정보
console.log(SITE_CONFIG.name)

// 네비게이션 렌더링
{NAV_LINKS.map((link) => (
  <Link key={link.href} href={link.href}>
    {link.label}
  </Link>
))}
```

**확장 방법**:
```typescript
// 새 상수 추가
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  timeout: 30000,
} as const

export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 10,
  maxLimit: 100,
} as const
```

---

## 8. 타입 정의

### 8.1 공통 타입 (types/index.ts)

#### NavItem
**용도**: 네비게이션 항목 타입

```typescript
export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: React.ComponentType<{ className?: string }>
  label?: string
}
```

**사용 예시**:
```typescript
const navItems: NavItem[] = [
  {
    title: "홈",
    href: "/",
    icon: HomeIcon,
  },
  {
    title: "외부 링크",
    href: "https://example.com",
    external: true,
  },
]
```

---

#### SidebarNavItem
**용도**: 사이드바 네비게이션 항목 (서브메뉴 지원)

```typescript
export interface SidebarNavItem extends NavItem {
  items?: SidebarNavItem[]
}
```

**사용 예시**:
```typescript
const sidebarItems: SidebarNavItem[] = [
  {
    title: "사용자",
    href: "/users",
    icon: UsersIcon,
    items: [
      { title: "목록", href: "/users" },
      { title: "역할", href: "/users/roles" },
    ],
  },
]
```

---

#### User
**용도**: 사용자 타입

```typescript
export interface User {
  id: string
  name: string
  email: string
  image?: string
  role?: "admin" | "user"
}
```

**사용 예시**:
```typescript
const user: User = {
  id: "1",
  name: "홍길동",
  email: "hong@example.com",
  role: "admin",
}
```

---

#### ApiResponse
**용도**: API 응답 타입

```typescript
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}
```

**사용 예시**:
```typescript
// 단일 사용자 응답
type UserResponse = ApiResponse<User>

// 사용자 목록 응답
type UsersResponse = ApiResponse<User[]>

// API 호출
async function fetchUser(id: string): Promise<UserResponse> {
  const res = await fetch(`/api/users/${id}`)
  return res.json()
}
```

---

#### PaginationParams
**용도**: 페이지네이션 파라미터

```typescript
export interface PaginationParams {
  page: number
  limit: number
  total?: number
}
```

---

#### PaginatedResponse
**용도**: 페이지네이션 응답 타입

```typescript
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

**사용 예시**:
```typescript
type UsersPaginatedResponse = PaginatedResponse<User>

async function fetchUsers(
  params: PaginationParams
): Promise<UsersPaginatedResponse> {
  const res = await fetch(
    `/api/users?page=${params.page}&limit=${params.limit}`
  )
  return res.json()
}

// 응답 예시
const response: UsersPaginatedResponse = {
  data: [
    { id: "1", name: "User 1", email: "user1@example.com" },
    { id: "2", name: "User 2", email: "user2@example.com" },
  ],
  success: true,
  pagination: {
    page: 1,
    limit: 10,
    total: 100,
    totalPages: 10,
  },
}
```

---

### 8.2 새 타입 추가 패턴

```typescript
// types/index.ts에 추가

// 비즈니스 엔티티
export interface Product {
  id: string
  name: string
  price: number
  description?: string
  categoryId: string
  createdAt: Date
  updatedAt: Date
}

// 폼 데이터
export interface ProductFormData {
  name: string
  price: number
  description?: string
  categoryId: string
}

// 필터 파라미터
export interface ProductFilters {
  categoryId?: string
  minPrice?: number
  maxPrice?: string
  search?: string
}

// API 응답 타입 조합
export type ProductResponse = ApiResponse<Product>
export type ProductsResponse = PaginatedResponse<Product>
```

---

## 9. 폼 처리 패턴

### 9.1 React Hook Form + Zod

**설치**:
```bash
npm install react-hook-form zod @hookform/resolvers
```

**기본 패턴**:
```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// 1. Zod 스키마 정의
const formSchema = z.object({
  email: z.string().email("유효한 이메일을 입력하세요"),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
  name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다"),
})

// 2. 타입 추론
type FormData = z.infer<typeof formSchema>

// 3. 폼 컴포넌트
function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    console.log(data)
    // API 호출 등
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="text-red-500">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          {...form.register("password")}
        />
        {form.formState.errors.password && (
          <p className="text-red-500">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "제출 중..." : "제출"}
      </Button>
    </form>
  )
}
```

### 9.2 폼 컴포넌트 재사용 패턴

```typescript
// components/forms/form-field.tsx
interface FormFieldProps {
  name: string
  label: string
  type?: string
  placeholder?: string
  register: any
  error?: string
}

export function FormField({
  name,
  label,
  type = "text",
  placeholder,
  register,
  error,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

// 사용
<FormField
  name="email"
  label="이메일"
  type="email"
  placeholder="example@email.com"
  register={form.register("email")}
  error={form.formState.errors.email?.message}
/>
```

---

## 10. 커스텀 훅 작성 패턴

### 10.1 기본 패턴

```typescript
// hooks/use-example.ts
import { useState, useEffect } from "react"

export function useExample(initialValue: string) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    // 사이드 이펙트
  }, [value])

  return { value, setValue }
}

// 사용
function Component() {
  const { value, setValue } = useExample("initial")
}
```

### 10.2 API 호출 훅

```typescript
// hooks/use-api.ts
import { useState, useEffect } from "react"

interface UseApiOptions<T> {
  url: string
  initialData?: T
}

interface UseApiReturn<T> {
  data: T | undefined
  loading: boolean
  error: Error | undefined
  refetch: () => void
}

export function useApi<T>({
  url,
  initialData,
}: UseApiOptions<T>): UseApiReturn<T> {
  const [data, setData] = useState<T | undefined>(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch(url)
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [url])

  return { data, loading, error, refetch: fetchData }
}

// 사용
function Component() {
  const { data, loading, error } = useApi<User[]>({
    url: "/api/users",
  })

  if (loading) return <LoadingSpinner />
  if (error) return <div>Error: {error.message}</div>

  return <div>{/* data 렌더링 */}</div>
}
```

---

**문서 끝**

작성자: Claude Code Architecture Agent
최종 수정: 2026-01-27
