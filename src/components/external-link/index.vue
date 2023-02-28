<script setup lang="ts">
import { NIcon } from 'naive-ui';
import { LogoGithub } from '@vicons/carbon';
import styles from './index.module.scss';

const GITHUB_REPO_LINK = 'https://github.com/Lmmmmmm-bb/currency-conversion/';
</script>

<template>
  <a
    title="GitHub"
    target="_blank"
    :class="styles.logo"
    :href="GITHUB_REPO_LINK"
  >
    <NIcon :size="24">
      <LogoGithub />
    </NIcon>
  </a>
</template>
