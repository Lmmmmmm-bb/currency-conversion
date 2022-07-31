<script setup lang="ts">
import { NSpace, NIcon } from 'naive-ui';
import { LogoGithub } from '@vicons/carbon';
import styles from './index.module.scss';

const GITHUB_REPO_LINK = 'https://github.com/Lmmmmmm-bb/currency-conversion/';
</script>

<template>
  <n-space :class="styles.wrapper">
    <a
      title="GitHub"
      target="_blank"
      :class="styles.logo"
      :href="GITHUB_REPO_LINK"
    >
      <n-icon :size="24">
        <logo-github />
      </n-icon>
    </a>
  </n-space>
</template>
