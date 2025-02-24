<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import NotificationList from './components/NotificationList.vue'
</script>

<template>
  <div class="app">
    <Sidebar />
    <main class="main">
      <RouterView />
    </main>
    <NotificationList />
  </div>
</template>

<style>
:root {
  /* Colors */
  --primary-color: #000;
  --secondary-color: #666;
  --accent-color: #007bff;
  --success-color: #28a745;
  --warning-color: #ffc107;
  --danger-color: #dc3545;
  --text-color: #333;
  --text-light: #666;
  --background-color: #f5f5f5;
  --border-color: #ddd;
  --white: #fff;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Typography */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;

  /* Border Radius */
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 1rem;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

  /* Layout */
  --sidebar-width: 250px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background: var(--background-color);
}

.app {
  min-height: 100vh;
  display: flex;
}

.main {
  flex: 1;
  padding: var(--spacing-lg);
  margin-left: var(--sidebar-width);
}

@media (max-width: 768px) {
  .main {
    margin-left: 0;
    max-width: 100%;
  }
}
</style>
