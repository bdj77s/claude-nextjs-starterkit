# Next.js 스타터킷 구현 계획서

## 개요

모던 웹 개발을 위한 Next.js 스타터킷입니다. Tailwind CSS, shadcn/ui, Zustand 등 최신 기술 스택을 활용하여 빠르게 프로젝트를 시작할 수 있습니다.

---

## 기술 스택

| 분류 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | Next.js | 16.1.4 |
| UI 라이브러리 | React | 19.2.3 |
| 언어 | TypeScript | 5.x |
| CSS | Tailwind CSS | 4.x |
| UI 컴포넌트 | shadcn/ui (Radix UI 기반) | - |
| 상태 관리 | Zustand | 5.x |
| 폼 처리 | React Hook Form + Zod | 7.x / 3.x |
| 테마 | next-themes | 0.4.x |
| 토스트 | Sonner | 1.x |
| 유틸리티 훅 | usehooks-ts | 3.x |

---

## 디렉토리 구조

```
claude-nextjs-starterkit/
├── app/
│   ├── (auth)/                    # 인증 라우트 그룹
│   │   ├── login/
│   │   │   └── page.tsx           # 로그인 페이지
│   │   └── layout.tsx             # 인증 레이아웃 (중앙 카드)
│   ├── (main)/                    # 메인 라우트 그룹
│   │   ├── dashboard/
│   │   │   └── page.tsx           # 대시보드 페이지
│   │   └── layout.tsx             # 메인 레이아웃 (사이드바)
│   ├── globals.css                # 전역 스타일 (CSS 변수)
│   ├── layout.tsx                 # 루트 레이아웃
│   └── page.tsx                   # 랜딩 페이지
├── components/
│   ├── ui/                        # shadcn/ui 컴포넌트
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── sonner.tsx
│   │   ├── switch.tsx
│   │   ├── textarea.tsx
│   │   └── tooltip.tsx
│   ├── layout/                    # 레이아웃 컴포넌트
│   │   ├── app-sidebar.tsx        # 앱 사이드바
│   │   ├── footer.tsx             # 푸터
│   │   ├── header.tsx             # 헤더
│   │   ├── mobile-nav.tsx         # 모바일 네비게이션
│   │   └── theme-toggle.tsx       # 테마 토글 버튼
│   ├── common/                    # 공통 컴포넌트
│   │   ├── loading-spinner.tsx    # 로딩 스피너
│   │   └── logo.tsx               # 로고
│   └── providers/                 # Context Providers
│       └── theme-provider.tsx     # 테마 Provider
├── hooks/
│   └── index.ts                   # usehooks-ts 재export
├── stores/
│   └── use-sidebar-store.ts       # Zustand 사이드바 스토어
├── lib/
│   ├── constants.ts               # 상수 정의
│   └── utils.ts                   # 유틸리티 함수 (cn)
├── types/
│   └── index.ts                   # 공통 타입 정의
└── package.json
```

---

## 컴포넌트 계층 구조

### Level 1: Primitives (기본 요소)
shadcn/ui 기반의 원자적 컴포넌트

| 컴포넌트 | 설명 | 의존성 |
|---------|------|--------|
| Button | 버튼 | @radix-ui/react-slot |
| Input | 입력 필드 | - |
| Label | 라벨 | @radix-ui/react-label |
| Badge | 뱃지 | - |
| Separator | 구분선 | @radix-ui/react-separator |
| Skeleton | 스켈레톤 로딩 | - |

### Level 2: Molecules (조합 요소)
여러 기본 요소를 조합한 컴포넌트

| 컴포넌트 | 설명 | 의존성 |
|---------|------|--------|
| Card | 카드 | - |
| Dialog | 모달 다이얼로그 | @radix-ui/react-dialog |
| DropdownMenu | 드롭다운 메뉴 | @radix-ui/react-dropdown-menu |
| Toast (Sonner) | 토스트 알림 | sonner |
| Avatar | 아바타 | @radix-ui/react-avatar |
| Tooltip | 툴팁 | @radix-ui/react-tooltip |
| Select | 선택 박스 | @radix-ui/react-select |
| Checkbox | 체크박스 | @radix-ui/react-checkbox |
| Switch | 스위치 | @radix-ui/react-switch |
| Textarea | 텍스트 영역 | - |
| ScrollArea | 스크롤 영역 | @radix-ui/react-scroll-area |
| Sheet | 시트 (사이드 패널) | @radix-ui/react-dialog |

### Level 3: Organisms (복합 요소)
비즈니스 로직을 포함한 복합 컴포넌트

| 컴포넌트 | 설명 | 위치 |
|---------|------|------|
| Header | 상단 헤더 | components/layout/header.tsx |
| Footer | 하단 푸터 | components/layout/footer.tsx |
| AppSidebar | 앱 사이드바 | components/layout/app-sidebar.tsx |
| MobileNav | 모바일 네비게이션 | components/layout/mobile-nav.tsx |
| ThemeToggle | 테마 전환 버튼 | components/layout/theme-toggle.tsx |

### Level 4: Templates (레이아웃)
페이지 구조를 정의하는 레이아웃

| 레이아웃 | 설명 | 위치 |
|---------|------|------|
| RootLayout | 루트 레이아웃 | app/layout.tsx |
| AuthLayout | 인증 페이지 레이아웃 | app/(auth)/layout.tsx |
| MainLayout | 메인 페이지 레이아웃 | app/(main)/layout.tsx |

---

## 라우트 구조

```
/                    → 랜딩 페이지 (app/page.tsx)
/login               → 로그인 페이지 (app/(auth)/login/page.tsx)
/dashboard           → 대시보드 (app/(main)/dashboard/page.tsx)
```

### 라우트 그룹 설명

#### (auth) 그룹
- **용도**: 인증 관련 페이지 (로그인, 회원가입, 비밀번호 찾기)
- **레이아웃 특징**:
  - 중앙 정렬된 카드 형태
  - 그리드 패턴 배경
  - 테마 토글만 표시

#### (main) 그룹
- **용도**: 인증된 사용자를 위한 메인 앱 페이지
- **레이아웃 특징**:
  - 사이드바 네비게이션
  - 상단 헤더 바
  - 반응형 (모바일에서 시트 오버레이)

---

## 테마 시스템

### CSS 변수 기반 테마
`app/globals.css`에서 다크/라이트 모드 CSS 변수 정의

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  --primary: oklch(0.21 0.006 285.885);
  /* ... */
}

.dark {
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.92 0 0);
  /* ... */
}
```

### 테마 전환
- `next-themes` 라이브러리 사용
- `ThemeProvider`로 앱 래핑
- `ThemeToggle` 컴포넌트로 전환

---

## 상태 관리

### Zustand 스토어

#### useSidebarStore
사이드바 상태 관리

```typescript
interface SidebarState {
  isOpen: boolean
  isCollapsed: boolean
  toggle: () => void
  setOpen: (open: boolean) => void
  setCollapsed: (collapsed: boolean) => void
}
```

- `persist` 미들웨어로 로컬스토리지 연동
- 키보드 단축키 (Ctrl/Cmd + B) 지원

---

## 유틸리티 훅

### usehooks-ts 재export
`hooks/index.ts`에서 자주 사용하는 훅 재export

| 훅 | 용도 |
|----|------|
| `useMediaQuery` | 반응형 조건부 렌더링 |
| `useLocalStorage` | 로컬스토리지 상태 |
| `useDebounce` | 디바운스 처리 |
| `useCopyToClipboard` | 클립보드 복사 |
| `useOnClickOutside` | 외부 클릭 감지 |
| `useToggle` | 불린 토글 |
| `useWindowSize` | 윈도우 크기 |
| `useEventListener` | 이벤트 리스너 |

---

## 폼 처리

### React Hook Form + Zod
타입 안전한 폼 검증

```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  email: z.string().email("올바른 이메일을 입력하세요"),
  password: z.string().min(8, "최소 8자 이상 입력하세요"),
})

type FormData = z.infer<typeof schema>

const form = useForm<FormData>({
  resolver: zodResolver(schema),
})
```

---

## 확장 가이드

### 새 페이지 추가

1. **인증 페이지** (로그인, 회원가입 등)
```
app/(auth)/[페이지명]/page.tsx
```

2. **메인 앱 페이지** (대시보드, 설정 등)
```
app/(main)/[페이지명]/page.tsx
```

### 새 컴포넌트 추가

1. **UI 컴포넌트**: `components/ui/`에 추가
2. **레이아웃 컴포넌트**: `components/layout/`에 추가
3. **공통 컴포넌트**: `components/common/`에 추가

### 새 Zustand 스토어 추가
```typescript
// stores/use-[name]-store.ts
import { create } from "zustand"

interface State {
  // 상태 정의
}

export const useNameStore = create<State>()((set) => ({
  // 초기 상태 및 액션
}))
```

---

## 실행 방법

### 개발 서버
```bash
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
npm start
```

### 타입 체크
```bash
npx tsc --noEmit
```

### 린트
```bash
npm run lint
```

---

## 주요 URL

| 경로 | 설명 |
|------|------|
| http://localhost:3000 | 랜딩 페이지 |
| http://localhost:3000/login | 로그인 페이지 |
| http://localhost:3000/dashboard | 대시보드 |

---

## 권장 추가 라이브러리

### 서버 상태 관리
```bash
npm install @tanstack/react-query
```

### HTTP 클라이언트
```bash
npm install ky
# 또는
npm install axios
```

### 날짜 처리
```bash
npm install date-fns
```

### 테이블
```bash
npm install @tanstack/react-table
```

### 차트
```bash
npm install recharts
```

### 애니메이션
```bash
npm install motion
```

---

## 라이선스

MIT License
