<script setup lang="ts">
import ExternalLink from '../components/external-link';
import styles from './index.module.scss';
</script>

<template>
  <div :class="styles.wrapper">
    <div :class="styles.main">Hello</div>
    <external-link :class="styles.externalLink" />
  </div>
</template>
