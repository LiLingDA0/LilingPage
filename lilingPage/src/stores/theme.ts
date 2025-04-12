// stores/theme.ts
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        theme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' as 'light' | 'dark',
        systemWatch: null as MediaQueryList | null
    }),
    actions: {
        // 初始化系统主题监听（在App组件挂载后调用）
        initSystemThemeListener() {
            if (this.systemWatch) return
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            // const handler = (e: MediaQueryListEvent) => {
            //     this.theme = e.matches ? 'dark' : 'light'
            //     localStorage.setItem('user-theme', this.theme)
            //     document.documentElement.setAttribute('user-theme', this.theme)
            // }

            // mediaQuery.addEventListener('change', handler)
            this.theme = mediaQuery.matches ? 'dark' : 'light'
            this.systemWatch = mediaQuery
            localStorage.setItem('user-theme', this.theme)
            document.documentElement.setAttribute('user-theme', this.theme)
        },

        // 用户主动切换主题
        toggleTheme() {
            this.theme = this.theme === 'dark' ? 'light' : 'dark'
            localStorage.setItem('user-theme', this.theme)
            document.documentElement.setAttribute('user-theme', this.theme)
        },

        handleThemeChange() {

        },
    },
    getters: {
        isDark: (state) => state.theme === 'dark'
    }
})