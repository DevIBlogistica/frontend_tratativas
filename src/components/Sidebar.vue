<script setup lang="ts">
import { RouterLink } from 'vue-router';
import ThemeToggle from './ThemeToggle.vue';

const menuItems = [
    {
        name: 'Dashboard',
        path: '/',
        icon: '📊'
    },
    {
        name: 'Tratativas',
        path: '/tratativas',
        icon: '📝'
    }
];
</script>

<template>
    <aside class="sidebar">
        <div class="sidebar__header">
            <img src="@/assets/logo.svg" alt="IB Logística" class="sidebar__logo" />
        </div>

        <nav class="sidebar__nav">
            <RouterLink v-for="item in menuItems" :key="item.path" :to="item.path" class="sidebar__link"
                active-class="sidebar__link--active">
                <span class="sidebar__link-icon">{{ item.icon }}</span>
                <span class="sidebar__link-text">{{ item.name }}</span>
            </RouterLink>
        </nav>

        <div class="sidebar__footer">
            <ThemeToggle />
        </div>
    </aside>
</template>

<style scoped>
.sidebar {
    width: var(--sidebar-width);
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: var(--card-bg);
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    z-index: var(--z-sidebar);
}

.sidebar__header {
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: center;
    align-items: center;
}

.sidebar__logo {
    height: 32px;
    width: auto;
}

.sidebar__nav {
    flex: 1;
    padding: var(--spacing-md);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.sidebar__link {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    border-radius: var(--border-radius-md);
    color: var(--text-muted);
    text-decoration: none;
    transition: all 0.2s ease;
}

.sidebar__link:hover {
    background: var(--bg-light);
    color: var(--text-primary);
}

.sidebar__link--active {
    background: var(--primary-color-light);
    color: var(--primary-color);
}

.sidebar__link-icon {
    font-size: 1.25rem;
    line-height: 1;
}

.sidebar__link-text {
    font-size: 0.875rem;
    font-weight: 500;
}

.sidebar__footer {
    padding: var(--spacing-md);
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: center;
}
</style>