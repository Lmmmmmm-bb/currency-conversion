<script setup lang="ts">
import {
  NConfigProvider,
  NLoadingBarProvider,
  NMessageProvider,
  NSpace,
} from 'naive-ui';
import { onMounted, ref } from 'vue';
import Convert from '~/layouts/convert';
import TimeSeries from '~/layouts/time-series';
import type { ISymbol } from '~/services';
import { fetchSymbols } from '~/services';
import ExternalLink from '~/components/external-link';
import ShareLink from '~/components/share-link';
import { StorageKeyEnum, getLocalItem, setLocalItem } from '~/common/utils';
import styles from './index.module.scss';
import { themeOverrides } from './config';

const canShare = !!navigator.share;

const initSymbolList = getLocalItem(StorageKeyEnum.Symbols);

const symbolList = ref<ISymbol[]>(
  initSymbolList ? JSON.parse(initSymbolList) : [],
);

onMounted(async () => {
  if (!initSymbolList) {
    const { symbols } = await fetchSymbols();
    const symbolsToArray = Object.values(symbols);
    setLocalItem(StorageKeyEnum.Symbols, JSON.stringify(symbolsToArray));
    symbolList.value = symbolsToArray;
  }
});
</script>

<template>
  <NConfigProvider :theme-overrides="themeOverrides" style="height: 100%">
    <NLoadingBarProvider>
      <NMessageProvider>
        <div :class="styles.wrapper">
          <NSpace :class="styles.main" align="center" vertical size="large">
            <Convert :symbols="symbolList" />
            <TimeSeries />
          </NSpace>
          <NSpace :class="styles.externalLinkWrapper">
            <ExternalLink />
            <ShareLink v-if="canShare" />
          </NSpace>
        </div>
      </NMessageProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>
