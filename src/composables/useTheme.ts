import { ref, watch } from 'vue'

const STORAGE_KEY = 'blog_theme'

type Theme = 'light' | 'dark'

function getStored(): Theme {
  try {
    const v = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (v === 'dark' || v === 'light') return v
  } catch {
    // ignore
  }
  return 'light'
}

function applyTheme(theme: Theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const theme = ref<Theme>(getStored())

export function useTheme() {
  watch(
    theme,
    (val) => {
      applyTheme(val)
      try {
        localStorage.setItem(STORAGE_KEY, val)
      } catch {
        // ignore
      }
    },
    { immediate: true },
  )

  const toggle = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return { theme, toggle }
}
