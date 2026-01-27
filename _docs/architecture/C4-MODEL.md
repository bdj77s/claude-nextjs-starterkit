# C4 모델 - 시스템 다이어그램

C4 모델은 소프트웨어 아키텍처를 4가지 레벨(Context, Container, Component, Code)로 시각화하는 방법론입니다.

---

## Level 1: System Context Diagram (시스템 컨텍스트 다이어그램)

시스템의 전체적인 맥락과 외부 엔티티와의 관계를 보여줍니다.

```mermaid
graph TB
    subgraph External
        User[사용자<br/>웹 애플리케이션 사용자]
        Admin[관리자<br/>시스템 관리자]
    end

    subgraph System["Next.js Starter Kit"]
        WebApp[웹 애플리케이션<br/>Next.js 16 + React 19]
    end

    subgraph "External Systems (Future)"
        Auth[인증 서비스<br/>NextAuth / Auth0]
        DB[(데이터베이스<br/>PostgreSQL / MySQL)]
        Storage[파일 스토리지<br/>S3 / Cloudinary]
        Email[이메일 서비스<br/>SendGrid / Resend]
    end

    User -->|대시보드 조회, 문서 관리| WebApp
    Admin -->|사용자 관리, 설정| WebApp

    WebApp -.->|인증/인가<br/>향후 연동| Auth
    WebApp -.->|데이터 저장/조회<br/>향후 연동| DB
    WebApp -.->|파일 업로드<br/>향후 연동| Storage
    WebApp -.->|알림 전송<br/>향후 연동| Email

    style User fill:#08427b
    style Admin fill:#08427b
    style WebApp fill:#1168bd
    style Auth fill:#999
    style DB fill:#999
    style Storage fill:#999
    style Email fill:#999
```

**주요 사용자**:
- **일반 사용자**: 대시보드 조회, 문서 관리, 분석 데이터 확인
- **관리자**: 사용자 관리, 역할/권한 설정, 시스템 설정

**외부 시스템** (향후 연동 예정):
- **인증 서비스**: NextAuth.js, Auth0, Clerk 등
- **데이터베이스**: PostgreSQL, MySQL, MongoDB 등
- **파일 스토리지**: AWS S3, Cloudinary, Vercel Blob 등
- **이메일 서비스**: SendGrid, Resend 등

---

## Level 2: Container Diagram (컨테이너 다이어그램)

시스템을 구성하는 주요 컨테이너(애플리케이션, 데이터베이스 등)를 보여줍니다.

```mermaid
graph TB
    User[사용자]
    Admin[관리자]

    subgraph "Next.js Application"
        subgraph "Client Side"
            Browser[웹 브라우저<br/>React 19 + TypeScript]
        end

        subgraph "Server Side"
            NextServer[Next.js Server<br/>App Router + RSC]
            APIRoutes[API Routes<br/>향후 구현]
        end

        subgraph "Static Assets"
            StaticFiles[정적 파일<br/>이미지, 폰트, CSS]
        end
    end

    subgraph "State & Cache"
        LocalStorage[(로컬 스토리지<br/>Zustand Persist)]
        SessionStorage[(세션 스토리지<br/>테마 설정)]
    end

    subgraph "External Services"
        Fonts[Google Fonts<br/>Geist Sans/Mono]
        CDN[CDN<br/>Vercel Edge Network]
    end

    User --> Browser
    Admin --> Browser

    Browser <-->|SSR/Hydration| NextServer
    Browser <-->|API Calls<br/>향후 구현| APIRoutes
    Browser -->|로드| StaticFiles
    Browser <-->|상태 저장/복원| LocalStorage
    Browser <-->|테마 저장| SessionStorage

    NextServer -->|폰트 최적화| Fonts
    StaticFiles -->|배포| CDN

    style Browser fill:#438dd5
    style NextServer fill:#438dd5
    style APIRoutes fill:#999
    style LocalStorage fill:#85bbf0
    style SessionStorage fill:#85bbf0
```

**컨테이너 설명**:

### 클라이언트 사이드
- **웹 브라우저**: React 19 기반 SPA, TypeScript로 작성
  - 라우팅: Next.js App Router
  - 스타일링: Tailwind CSS 4
  - 상태 관리: Zustand + React State
  - UI 컴포넌트: shadcn/ui (Radix UI)

### 서버 사이드
- **Next.js Server**: SSR, RSC 처리
  - App Router 기반 라우팅
  - React Server Components
  - 향후: Middleware 인증 처리

- **API Routes**: RESTful API 엔드포인트 (향후 구현)
  - `/api/v1/users`
  - `/api/v1/auth`
  - `/api/v1/documents`

### 상태 및 캐시
- **로컬 스토리지**: Zustand persist를 통한 상태 저장
  - 사이드바 상태
  - 사용자 설정
- **세션 스토리지**: 테마 설정 (next-themes)

### 외부 서비스
- **Google Fonts**: next/font를 통한 최적화된 폰트 로딩
- **CDN**: Vercel Edge Network (배포 시)

---

## Level 3: Component Diagram (컴포넌트 다이어그램)

애플리케이션 내부의 주요 컴포넌트와 그들 간의 관계를 보여줍니다.

### 3.1 전체 컴포넌트 구조

```mermaid
graph TB
    subgraph "Presentation Layer"
        subgraph "Pages"
            P1[HomePage]
            P2[DashboardPage]
            P3[UsersPage]
            P4[LoginPage]
        end

        subgraph "Layouts"
            L1[RootLayout]
            L2[MainLayout]
            L3[AuthLayout]
        end

        subgraph "Layout Components"
            LC1[AppSidebar]
            LC2[Header]
            LC3[Footer]
            LC4[MobileNav]
            LC5[ThemeToggle]
        end

        subgraph "Common Components"
            CC1[Logo]
            CC2[LoadingSpinner]
        end
    end

    subgraph "UI Components Layer"
        subgraph "shadcn/ui Components"
            UI1[Button]
            UI2[Card]
            UI3[Dialog]
            UI4[Input]
            UI5[Sidebar]
            UI6[DropdownMenu]
            UI7[Tooltip]
            UI8[...25+ components]
        end
    end

    subgraph "Business Logic Layer"
        subgraph "Stores (Zustand)"
            ST1[SidebarStore]
            ST2[FutureStores...]
        end

        subgraph "Custom Hooks"
            H1[usehooks-ts]
            H2[Custom Hooks<br/>향후 추가]
        end
    end

    subgraph "Data Layer"
        subgraph "API (Future)"
            API1[User API]
            API2[Auth API]
            API3[Document API]
        end
    end

    subgraph "Utility Layer"
        U1[cn utility<br/>클래스명 병합]
        U2[Constants]
        U3[Types]
    end

    subgraph "Providers"
        PR1[ThemeProvider]
        PR2[SidebarProvider]
    end

    %% 관계
    L1 --> PR1
    L2 --> PR2
    L2 --> LC1
    L2 --> LC2
    L2 --> LC5

    P2 --> L2
    P3 --> L2
    P4 --> L3

    LC1 --> UI5
    LC1 --> ST1
    LC5 --> UI6

    UI1 --> U1
    UI2 --> U1
    LC1 --> U2

    P2 -.-> API1
    P3 -.-> API1
```

### 3.2 레이아웃 컴포넌트 상세

```mermaid
graph TB
    subgraph "RootLayout (app/layout.tsx)"
        RL[전역 레이아웃<br/>HTML/Body 구조]
        RL_TP[ThemeProvider]
        RL_Toast[Toaster]
    end

    subgraph "MainLayout (app/(main)/layout.tsx)"
        ML[메인 레이아웃]
        ML_SP[SidebarProvider]
        ML_Sidebar[AppSidebar]
        ML_Header[Header with<br/>SidebarTrigger + ThemeToggle]
        ML_Content[Main Content Area]
    end

    subgraph "AuthLayout (app/(auth)/layout.tsx)"
        AL[인증 레이아웃<br/>중앙 정렬 구조]
    end

    RL --> RL_TP
    RL --> RL_Toast
    RL --> ML
    RL --> AL

    ML --> ML_SP
    ML_SP --> ML_Sidebar
    ML_SP --> ML_Header
    ML_SP --> ML_Content

    ML_Sidebar --> SidebarStore
    ML_Header --> ThemeToggle
```

### 3.3 사이드바 컴포넌트 구조

```mermaid
graph TB
    subgraph "AppSidebar Component"
        AS[AppSidebar]

        subgraph "Sidebar Parts"
            SH[SidebarHeader<br/>로고]
            SC[SidebarContent<br/>메뉴 그룹]
            SF[SidebarFooter<br/>버전 정보]
        end

        subgraph "Menu Groups"
            MG1[메인 그룹<br/>홈, 대시보드, 분석]
            MG2[관리 그룹<br/>사용자, 문서]
            MG3[기타 그룹<br/>설정, 도움말]
        end

        subgraph "Menu Items"
            MI1[SidebarMenuItem]
            MI2[SidebarMenuSubItem<br/>Collapsible]
        end
    end

    subgraph "Dependencies"
        D1[usePathname<br/>현재 경로]
        D2[Lucide Icons]
        D3[Sidebar UI Components<br/>Radix Collapsible]
    end

    AS --> SH
    AS --> SC
    AS --> SF

    SC --> MG1
    SC --> MG2
    SC --> MG3

    MG1 --> MI1
    MG2 --> MI2
    MG3 --> MI1

    AS --> D1
    AS --> D2
    MI2 --> D3
```

### 3.4 상태 관리 흐름

```mermaid
graph LR
    subgraph "UI Components"
        Trigger[SidebarTrigger<br/>버튼 클릭]
        Sidebar[Sidebar<br/>UI 업데이트]
    end

    subgraph "Zustand Store"
        Store[useSidebarStore]
        State[State:<br/>isOpen, isCollapsed]
        Actions[Actions:<br/>toggle, setOpen, setCollapsed]
    end

    subgraph "Persistence"
        LS[(로컬 스토리지<br/>sidebar-storage)]
    end

    Trigger -->|toggle 호출| Actions
    Actions -->|상태 변경| State
    State -->|상태 구독| Sidebar
    State <-->|persist| LS
```

---

## Level 4: Code Diagram (코드 다이어그램)

주요 컴포넌트의 내부 구조를 보여줍니다.

### 4.1 useSidebarStore 구현 구조

```mermaid
classDiagram
    class SidebarState {
        +boolean isOpen
        +boolean isCollapsed
        +toggle() void
        +setOpen(open: boolean) void
        +setCollapsed(collapsed: boolean) void
    }

    class ZustandStore {
        <<interface>>
        +create()
        +persist()
    }

    class LocalStorage {
        <<external>>
        +getItem(key: string)
        +setItem(key: string, value: string)
    }

    ZustandStore <|-- SidebarState : implements
    SidebarState --> LocalStorage : persists to
```

**코드 예시**:
```typescript
interface SidebarState {
  isOpen: boolean
  isCollapsed: boolean
  toggle: () => void
  setOpen: (open: boolean) => void
  setCollapsed: (collapsed: boolean) => void
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: true,
      isCollapsed: false,
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      setOpen: (open) => set({ isOpen: open }),
      setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
    }),
    { name: 'sidebar-storage' }
  )
)
```

### 4.2 AppSidebar 컴포넌트 구조

```mermaid
classDiagram
    class AppSidebar {
        +render() JSX.Element
        -renderMainNav() JSX.Element
        -renderManagementNav() JSX.Element
        -renderOtherNav() JSX.Element
    }

    class SidebarNavItem {
        +string title
        +string href
        +Icon icon
        +SubItem[] subItems?
    }

    class Hooks {
        +usePathname() string
    }

    class SidebarUI {
        <<component>>
        +Sidebar
        +SidebarContent
        +SidebarMenu
        +Collapsible
    }

    AppSidebar --> Hooks : uses
    AppSidebar --> SidebarNavItem : renders
    AppSidebar --> SidebarUI : uses
    SidebarNavItem --> SidebarNavItem : has subItems
```

### 4.3 ThemeProvider 구조

```mermaid
classDiagram
    class ThemeProvider {
        +attribute: string
        +defaultTheme: string
        +enableSystem: boolean
        +render() JSX.Element
    }

    class NextThemes {
        <<external>>
        +ThemeProvider
        +useTheme()
    }

    class ThemeToggle {
        +render() JSX.Element
        -handleThemeChange() void
    }

    class LocalStorage {
        <<external>>
        +theme: string
    }

    ThemeProvider --|> NextThemes : extends
    ThemeProvider --> LocalStorage : persists theme
    ThemeToggle --> NextThemes : useTheme()
```

---

## 데이터 흐름 다이어그램

### 페이지 로딩 시퀀스

```mermaid
sequenceDiagram
    participant U as User
    participant B as Browser
    participant NS as Next.js Server
    participant RSC as React Server Components
    participant Client as Client Components
    participant Store as Zustand Store
    participant LS as Local Storage

    U->>B: URL 입력 (예: /dashboard)
    B->>NS: HTTP GET 요청
    NS->>RSC: 서버 컴포넌트 렌더링
    RSC-->>NS: HTML 반환
    NS-->>B: 초기 HTML 응답

    B->>B: HTML 파싱 및 표시

    B->>Client: Hydration 시작
    Client->>LS: Zustand persist 로드
    LS-->>Store: 저장된 상태 복원
    Store-->>Client: 상태 적용

    Client->>Client: 인터랙티브 활성화
    Client-->>B: 렌더링 완료

    U->>Client: UI 인터랙션
    Client->>Store: 상태 업데이트
    Store->>LS: 상태 저장
    Client-->>B: UI 업데이트
```

### 사이드바 토글 시퀀스

```mermaid
sequenceDiagram
    participant U as User
    participant T as SidebarTrigger
    participant S as useSidebarStore
    participant LS as Local Storage
    participant Sidebar as Sidebar Component

    U->>T: 버튼 클릭
    T->>S: toggle() 호출
    S->>S: isOpen = !isOpen
    S->>LS: 상태 저장 (persist)
    S-->>Sidebar: 상태 변경 알림 (subscribe)
    Sidebar->>Sidebar: 리렌더링
    Sidebar-->>U: 사이드바 열림/닫힘 애니메이션
```

### 테마 전환 시퀀스

```mermaid
sequenceDiagram
    participant U as User
    participant TT as ThemeToggle
    participant TP as ThemeProvider
    participant LS as Local Storage
    participant HTML as HTML Element

    U->>TT: 테마 선택 (예: dark)
    TT->>TP: setTheme('dark')
    TP->>LS: 테마 저장
    TP->>HTML: className='dark' 추가
    HTML->>HTML: CSS 변수 업데이트
    HTML-->>U: 다크 모드 UI 표시
```

---

## 배포 아키텍처

### Vercel 배포 구조

```mermaid
graph TB
    subgraph "User Devices"
        Desktop[Desktop Browser]
        Mobile[Mobile Browser]
    end

    subgraph "Vercel Edge Network"
        Edge[Edge Functions<br/>전 세계 CDN]
    end

    subgraph "Vercel Platform"
        Build[Build Process<br/>next build]
        Static[Static Assets<br/>/_next/static/]
        Server[Serverless Functions<br/>API Routes]
    end

    subgraph "External"
        Fonts[Google Fonts]
    end

    Desktop --> Edge
    Mobile --> Edge
    Edge --> Static
    Edge --> Server

    Build --> Static
    Build --> Server

    Server --> Fonts

    style Edge fill:#85bbf0
    style Static fill:#438dd5
    style Server fill:#438dd5
```

**배포 프로세스**:
1. **git push** → Vercel 자동 빌드 트리거
2. **빌드**: `next build` 실행
   - 정적 페이지 생성
   - 클라이언트 번들 최적화
   - 서버 컴포넌트 번들
3. **배포**: Edge Network에 분산
4. **캐싱**: CDN 캐싱 전략 적용

---

## 확장 시나리오

### 인증 시스템 추가 시

```mermaid
graph TB
    subgraph "Frontend"
        Pages[Pages]
        AuthGuard[Auth Guard<br/>Middleware]
        LoginPage[Login Page]
    end

    subgraph "Backend"
        APIAuth[API /api/auth]
        NextAuth[NextAuth.js]
    end

    subgraph "External"
        OAuth[OAuth Providers<br/>Google, GitHub]
        DB[(Database<br/>사용자 정보)]
    end

    Pages --> AuthGuard
    AuthGuard -->|미인증| LoginPage
    AuthGuard -->|인증됨| Pages

    LoginPage --> APIAuth
    APIAuth --> NextAuth
    NextAuth --> OAuth
    NextAuth --> DB

    style AuthGuard fill:#ff9999
    style NextAuth fill:#99ccff
```

### 데이터베이스 연동 시

```mermaid
graph TB
    subgraph "API Layer"
        API[API Routes]
    end

    subgraph "Data Access Layer"
        Prisma[Prisma Client]
        Models[Models & Schema]
    end

    subgraph "Database"
        PG[(PostgreSQL)]
    end

    subgraph "Pages"
        RSC[React Server Components]
    end

    RSC --> Prisma
    API --> Prisma
    Prisma --> Models
    Models --> PG
```

---

**문서 끝**

작성자: Claude Code Architecture Agent
최종 수정: 2026-01-27
