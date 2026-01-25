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
