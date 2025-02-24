import { ref, watch } from 'vue';
import { useStorage } from '@vueuse/core';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const HTML_ELEMENT = document.documentElement;

export function useTheme() {
  const theme = useStorage<Theme>(STORAGE_KEY, 'light');
  const systemDarkMode = ref(window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Watch for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    systemDarkMode.value = e.matches;
  });

  // Apply theme
  function applyTheme(newTheme: Theme) {
    HTML_ELEMENT.classList.remove('light', 'dark');
    HTML_ELEMENT.classList.add(newTheme);
    theme.value = newTheme;
  }

  // Toggle theme
  function toggleTheme() {
    const newTheme = theme.value === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  }

  // Initialize theme
  watch(theme, (newTheme) => {
    applyTheme(newTheme);
  }, { immediate: true });

  return {
    theme,
    systemDarkMode,
    toggleTheme
  };
} 