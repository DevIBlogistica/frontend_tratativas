import { ref } from 'vue';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  duration?: number;
}

const notifications = ref<Notification[]>([]);
let notificationId = 0;

export function useNotification() {
  function show(message: string, type: NotificationType = 'info', duration = 5000) {
    const id = ++notificationId;
    
    const notification: Notification = {
      id,
      type,
      message,
      duration
    };
    
    notifications.value.push(notification);
    
    if (duration > 0) {
      setTimeout(() => {
        remove(id);
      }, duration);
    }
    
    return id;
  }
  
  function remove(id: number) {
    const index = notifications.value.findIndex(n => n.id === id);
    if (index > -1) {
      notifications.value.splice(index, 1);
    }
  }
  
  function success(message: string, duration?: number) {
    return show(message, 'success', duration);
  }
  
  function error(message: string, duration?: number) {
    return show(message, 'error', duration);
  }
  
  function warning(message: string, duration?: number) {
    return show(message, 'warning', duration);
  }
  
  function info(message: string, duration?: number) {
    return show(message, 'info', duration);
  }
  
  return {
    notifications,
    show,
    remove,
    success,
    error,
    warning,
    info
  };
} 