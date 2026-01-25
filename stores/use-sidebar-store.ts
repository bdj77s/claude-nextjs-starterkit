import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SidebarState {
  isOpen: boolean
  isCollapsed: boolean
  toggle: () => void
  setOpen: (open: boolean) => void
  setCollapsed: (collapsed: boolean) => void
}

// 사이드바 상태 관리 스토어
export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: true,
      isCollapsed: false,
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      setOpen: (open) => set({ isOpen: open }),
      setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
    }),
    {
      name: "sidebar-storage",
    }
  )
)
