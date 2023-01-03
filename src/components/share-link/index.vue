<script setup lang="ts">
import { NIcon } from 'naive-ui';
import { Share } from '@vicons/carbon';
import styles from './index.module.scss';

const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: 'Currency Conversion',
      text: 'Help you convert, powered by vue, conversion information provided by exchangerate.host.',
      url: 'https://convert.lmmmmmm.dev/'
    });
  }
};
</script>

<template>
  <a title="Share" :class="styles.logo" @click="handleShare">
    <n-icon :size="23">
      <share />
    </n-icon>
  </a>
</template>
