<script setup lang="ts">
import { RouterLink } from 'vue-router';

const menuItems = [
    {
        name: 'Dashboard',
        path: '/',
        icon: 'home'
    },
    {
        name: 'Agendamentos',
        path: '/agendamentos',
        icon: 'calendar'
    },
    {
        name: 'Arquivos',
        path: '/arquivos',
        icon: 'file'
    }
];
</script>

<template>
    <aside class="sidebar">
        <div class="sidebar__header">
            <div class="logo">IB Logística</div>
            <button class="menu-toggle">
                <span class="material-icons">menu</span>
            </button>
        </div>

        <nav class="sidebar__nav">
            <RouterLink v-for="item in menuItems" :key="item.path" :to="item.path" class="sidebar__link"
                active-class="sidebar__link--active">
                <span class="material-icons">{{ item.icon }}</span>
                <span class="sidebar__link-text">{{ item.name }}</span>
            </RouterLink>
        </nav>

        <div class="sidebar__footer">
            <RouterLink to="/configuracoes" class="sidebar__link">
                <span class="material-icons">settings</span>
                <span class="sidebar__link-text">Configurações</span>
            </RouterLink>
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
    display: flex;
    flex-direction: column;
}

.sidebar__header {
    height: var(--header-height);
    padding: 0 var(--spacing-md);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-color);
}

.menu-toggle {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-color);
    padding: var(--spacing-xs);
}

.sidebar__nav {
    flex: 1;
    padding: var(--spacing-sm) 0;
}

.sidebar__link {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-sm) var(--spacing-md);
    color: var(--text-muted);
    text-decoration: none;
    font-size: var(--font-size-md);
}

.sidebar__link:hover,
.sidebar__link--active {
    color: var(--text-color);
    background: var(--background-color);
}

.material-icons {
    font-size: 20px;
}

.sidebar__footer {
    padding: var(--spacing-sm) 0;
    border-top: 1px solid var(--border-color);
}
</style>