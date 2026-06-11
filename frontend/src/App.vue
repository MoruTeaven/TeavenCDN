<template>
  <n-message-provider>
    <n-notification-provider>
      <n-layout has-sider position="absolute">
        <n-layout-sider
          content-style="padding: 24px;"
          :native-scrollbar="false"
        >
          <n-menu
            :options="menuOptions"
            :value="activeMenu"
            @update:value="handleMenuUpdate"
          />
        </n-layout-sider>
        <n-layout content-style="padding: 24px;">
          <n-layout-header
            content-style="padding: 0 24px; height: 64px; display: flex; align-items: center; justify-content: space-between;"
          >
            <h2 style="margin: 0;">CDN 管理系统</h2>
            <n-input
              v-model:value="authToken"
              type="password"
              placeholder="管理 Token"
              clearable
              style="width: 240px;"
            />
          </n-layout-header>
          <n-layout-content>
            <router-view />
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-notification-provider>
  </n-message-provider>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { MenuOption } from 'naive-ui'

const router = useRouter()
const route = useRoute()
const adminTokenKey = 'admin_token'

const activeMenu = ref(route.name as string)
const authToken = ref(localStorage.getItem(adminTokenKey) || '')

const menuOptions: MenuOption[] = [
  {
    label: '首页',
    key: 'Dashboard',
  },
  {
    label: '搜索资源',
    key: 'Search',
  },
  {
    label: '我的资源',
    key: 'Packages',
  }
]

function handleMenuUpdate(key: string) {
  router.push({ name: key })
}

watch(() => route.name, (name) => {
  activeMenu.value = name as string
})

watch(authToken, (token) => {
  const value = token.trim()

  if (value) {
    localStorage.setItem(adminTokenKey, value)
  } else {
    localStorage.removeItem(adminTokenKey)
  }
})
</script>
