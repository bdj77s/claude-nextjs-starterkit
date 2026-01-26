---
description: "일관된 구조의 React 컴포넌트를 빠르게 생성합니다"
allowed-tools: ["Write", "Read", "Glob"]
---

# Claude 명령어: New Component

일관된 구조의 React 컴포넌트를 빠르게 생성합니다.

## 사용법

```
/nextjs:new-component <컴포넌트명> [--type=<타입>]
/nextjs:new-component UserCard --type=common
/nextjs:new-component DataTable --type=ui
```

## 인자

$ARGUMENTS - 컴포넌트명과 옵션
- 컴포넌트명: PascalCase 또는 kebab-case (자동 변환)
- --type: 컴포넌트 타입 (기본값: common)

## 컴포넌트 타입

| 타입 | 경로 | 용도 |
|------|------|------|
| `ui` | `components/ui/` | shadcn/ui 스타일 기본 UI 컴포넌트 |
| `common` | `components/common/` | 재사용 가능한 공통 컴포넌트 |
| `layout` | `components/layout/` | 레이아웃 관련 컴포넌트 |
| `feature` | `components/feature/` | 특정 기능 전용 컴포넌트 |

## 프로세스

1. 인자에서 컴포넌트명과 타입 추출
2. 타입에 따른 템플릿 선택
3. 해당 경로에 컴포넌트 파일 생성

## 생성 템플릿

### UI 컴포넌트 (forwardRef 패턴)

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface 컴포넌트Props extends React.HTMLAttributes<HTMLDivElement> {
  // Props 정의
}

const 컴포넌트 = React.forwardRef<HTMLDivElement, 컴포넌트Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("", className)}
        {...props}
      />
    );
  }
);
컴포넌트.displayName = "컴포넌트";

export { 컴포넌트 };
```

### Common/Layout/Feature 컴포넌트

```tsx
import { cn } from "@/lib/utils";

interface 컴포넌트Props {
  className?: string;
  children?: React.ReactNode;
}

export function 컴포넌트({ className, children }: 컴포넌트Props) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}
```

### CVA 변형 템플릿 (UI 컴포넌트 옵션)

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const 컴포넌트Variants = cva(
  "기본 스타일",
  {
    variants: {
      variant: {
        default: "",
        secondary: "",
      },
      size: {
        default: "",
        sm: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface 컴포넌트Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof 컴포넌트Variants> {}

const 컴포넌트 = React.forwardRef<HTMLDivElement, 컴포넌트Props>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(컴포넌트Variants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
컴포넌트.displayName = "컴포넌트";

export { 컴포넌트, 컴포넌트Variants };
```

## 네이밍 규칙

- 파일명: kebab-case (예: `user-card.tsx`)
- 컴포넌트명: PascalCase (예: `UserCard`)
- Props 인터페이스: 컴포넌트명 + Props (예: `UserCardProps`)

## 참고사항

- 기존 파일이 있으면 덮어쓰지 않고 경고
- `cn` 유틸리티 함수 사용 (`@/lib/utils`)
- TypeScript 타입 안전성 보장
- any 타입 사용 금지
