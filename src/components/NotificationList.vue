<script setup lang="ts">
import { useNotification } from '@/composables/useNotification';
import type { Notification } from '@/composables/useNotification';
import { TransitionGroup } from 'vue';

const { notifications, remove } = useNotification();

function getIcon(type: Notification['type']) {
  switch (type) {
    case 'success':
      return '✅';
    case 'error':
      return '❌';
    case 'warning':
      return '⚠️';
    case 'info':
      return 'ℹ️';
    default:
      return 'ℹ️';
  }
}
</script>

<template>
  <TransitionGroup
    tag="div"
    class="notification-list"
    name="notification"
    @before-leave="(el: HTMLElement) => el.style.height = el.scrollHeight + 'px'"
  >
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="notification"
      :class="`notification--${notification.type}`"
      @click="remove(notification.id)"
    >
      <span class="notification__icon">{{ getIcon(notification.type) }}</span>
      <span class="notification__message">{{ notification.message }}</span>
    </div>
  </TransitionGroup>
</template>

<style scoped>
.notification-list {
  position: fixed;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  z-index: var(--z-modal);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  max-width: 400px;
  width: calc(100% - var(--spacing-lg) * 2);
}

.notification {
  background: var(--card-bg);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.notification:hover {
  transform: translateX(-4px);
}

.notification__icon {
  font-size: 1.25rem;
}

.notification__message {
  flex: 1;
  font-size: 0.875rem;
}

.notification--success {
  border-left: 4px solid var(--success-color);
}

.notification--error {
  border-left: 4px solid var(--danger-color);
}

.notification--warning {
  border-left: 4px solid var(--warning-color);
}

.notification--info {
  border-left: 4px solid var(--primary-color);
}

/* Transition animations */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
  max-height: 100px;
  opacity: 1;
  transform: translateX(0);
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
  max-height: 0;
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
  max-height: 0;
}
</style> 