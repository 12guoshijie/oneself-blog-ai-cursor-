<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { Sunny, Moon, Search, Menu } from '@element-plus/icons-vue'
import AiChatPanel from './components/AiChatPanel.vue'
import AiSettingsDialog from './components/AiSettingsDialog.vue'
import { useTheme } from './composables/useTheme'

const route = useRoute()
const router = useRouter()
const { theme, toggle: toggleTheme } = useTheme()

const activeMenu = computed(() => {
  if (route.name === 'home') return 'home'
  if (route.name === 'posts' || route.name === 'post-detail') return 'posts'
  if (route.name === 'tags') return 'tags'
  if (route.name === 'archive') return 'archive'
  if (route.name === 'about') return 'about'
  if (route.name === 'ai-lab') return 'ai-lab'
  return ''
})

const handleSelect = (key: string) => {
  if (key === 'home') router.push('/')
  if (key === 'posts') router.push('/posts')
  if (key === 'tags') router.push('/tags')
  if (key === 'archive') router.push('/archive')
  if (key === 'about') router.push('/about')
  if (key === 'ai-lab') router.push('/ai-lab')
}

const searchKeyword = ref('')
function doSearch() {
  const q = searchKeyword.value.trim()
  if (q) router.push({ path: '/posts', query: { q } })
  else router.push('/posts')
}

const aiSettingsVisible = ref(false)
const navDrawerVisible = ref(false)
</script>

<template>
  <div class="app-root">
    <el-container class="layout-container">
      <el-header class="layout-header">
        <router-link to="/" class="logo">oneself.dev</router-link>
        <el-menu
          mode="horizontal"
          :default-active="activeMenu"
          @select="handleSelect"
          class="nav-menu"
        >
          <el-menu-item index="home">首页</el-menu-item>
          <el-menu-item index="posts">文章</el-menu-item>
          <el-menu-item index="tags">标签</el-menu-item>
          <el-menu-item index="archive">归档</el-menu-item>
          <el-menu-item index="about">关于我</el-menu-item>
          <el-menu-item index="ai-lab">AI 实验室</el-menu-item>
        </el-menu>
        <el-button class="nav-toggle" type="primary" text @click="navDrawerVisible = true">
          <el-icon><Menu /></el-icon>
        </el-button>
        <el-drawer
          v-model="navDrawerVisible"
          direction="ttb"
          size="auto"
          title="菜单"
          class="nav-drawer"
        >
          <el-menu
            :default-active="activeMenu"
            @select="(key: string) => { handleSelect(key); navDrawerVisible = false }"
          >
            <el-menu-item index="home">首页</el-menu-item>
            <el-menu-item index="posts">文章</el-menu-item>
            <el-menu-item index="tags">标签</el-menu-item>
            <el-menu-item index="archive">归档</el-menu-item>
            <el-menu-item index="about">关于我</el-menu-item>
            <el-menu-item index="ai-lab">AI 实验室</el-menu-item>
          </el-menu>
        </el-drawer>
        <div class="header-actions">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索文章"
            clearable
            class="search-input"
            @keyup.enter="doSearch"
          >
            <template #append>
              <el-button :icon="Search" @click="doSearch">搜索</el-button>
            </template>
          </el-input>
          <el-button type="primary" text @click="toggleTheme">
            <el-icon><Moon v-if="theme === 'light'" /><Sunny v-else /></el-icon>
            {{ theme === 'light' ? '深色' : '浅色' }}
          </el-button>
          <el-button type="primary" @click="aiSettingsVisible = true">
            AI 设置
          </el-button>
        </div>
      </el-header>

      <el-main class="layout-main">
        <router-view />
      </el-main>

      <footer class="layout-footer">
        <span>© {{ new Date().getFullYear() }} oneself.dev</span>
        <span class="footer-dot">·</span>
        <span>Vue 3 + Element Plus + 豆包</span>
      </footer>
    </el-container>

    <AiSettingsDialog v-model="aiSettingsVisible" />
    <AiChatPanel />
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100vh;
  background: var(--el-bg-color);
  color: var(--el-text-color-primary);
}

.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid var(--el-border-color-light);
}

.logo {
  font-size: 20px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  text-decoration: none;
}

.logo:hover {
  color: var(--el-color-primary);
}

.layout-footer {
  padding: 16px 24px;
  text-align: center;
  font-size: 13px;
  color: var(--el-text-color-secondary);
  border-top: 1px solid var(--el-border-color-lighter);
}

.footer-dot {
  margin: 0 8px;
}

.nav-menu {
  flex: 1;
  margin-left: 40px;
  border-bottom: none;
}

.nav-toggle {
  display: none;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-input {
  width: 180px;
}

.layout-main {
  flex: 1;
  padding: 32px 24px;
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  .nav-toggle {
    display: inline-flex;
  }
  .search-input {
    display: none;
  }
  .layout-header {
    padding: 0 12px;
  }
  .layout-main {
    padding: 16px 12px;
  }
}
</style>
