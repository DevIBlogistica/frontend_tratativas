<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { theme, toggleTheme } = useTheme();
</script>

<template>
  <button
    class="theme-toggle"
    :class="{ 'theme-toggle--dark': theme === 'dark' }"
    @click="toggleTheme"
    aria-label="Toggle theme"
  >
    <span class="theme-toggle__icon">{{ theme === 'dark' ? '🌙' : '☀️' }}</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background: var(--bg-light);
}

.theme-toggle__icon {
  font-size: 1.25rem;
  line-height: 1;
}

.theme-toggle--dark {
  color: var(--text-primary);
}
</style> 