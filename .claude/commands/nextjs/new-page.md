---
description: "Next.js App Router 기반 새 페이지를 빠르게 생성합니다"
allowed-tools: ["Write", "Read", "Glob"]
---

# Claude 명령어: New Page

Next.js App Router 기반 새 페이지를 빠르게 생성합니다.

## 사용법

```
/nextjs:new-page <페이지경로>
/nextjs:new-page products
/nextjs:new-page settings/profile
```

## 인자

$ARGUMENTS - 생성할 페이지 경로 (예: products, settings/profile)

## 프로세스

1. 인자로 받은 페이지 경로 분석
2. 사용자에게 옵션 확인:
   - 라우트 그룹 선택: `(main)` 또는 `(auth)` (기본값: `(main)`)
   - 추가 파일 생성 여부: `loading.tsx`, `error.tsx`
3. 해당 경로에 파일 생성

## 생성 파일

### page.tsx (필수)

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "페이지 제목",
  description: "페이지 설명",
};

export default function 페이지명Page() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold">페이지 제목</h1>
    </div>
  );
}
```

### loading.tsx (선택)

```tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );
}
```

### error.tsx (선택)

```tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <h2 className="text-xl font-semibold">문제가 발생했습니다</h2>
      <Button onClick={reset}>다시 시도</Button>
    </div>
  );
}
```

## 네이밍 규칙

- 경로: kebab-case (예: `user-profile`)
- 컴포넌트명: PascalCase + Page 접미사 (예: `UserProfilePage`)
- 파일 위치: `app/(라우트그룹)/경로/page.tsx`

## 참고사항

- 기존 파일이 있으면 덮어쓰지 않고 경고
- 중첩 경로 자동 생성 (예: `settings/profile` → `settings/profile/page.tsx`)
- 한국어 메타데이터 기본 적용
