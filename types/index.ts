// 공통 타입 정의

// 네비게이션 아이템 타입
export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: React.ComponentType<{ className?: string }>
  label?: string
}

// 사이드바 네비게이션 아이템 타입
export interface SidebarNavItem extends NavItem {
  items?: SidebarNavItem[]
}

// 사용자 타입
export interface User {
  id: string
  name: string
  email: string
  image?: string
  role?: "admin" | "user"
}

// API 응답 타입
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

// 페이지네이션 타입
export interface PaginationParams {
  page: number
  limit: number
  total?: number
}

// 페이지네이션 응답 타입
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
