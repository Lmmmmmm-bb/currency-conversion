<script setup lang="ts">
import {
  NSpace,
  NConfigProvider,
  NMessageProvider,
  NLoadingBarProvider
} from 'naive-ui';
import { onMounted, ref } from 'vue';
import Convert from '~/layouts/convert';
import TimeSeries from '~/layouts/time-series';
import { fetchSymbols, ISymbol } from '~/services';
import ExternalLink from '~/components/external-link';
import ShareLink from '~/components/share-link';
import { getLocalItem, setLocalItem, StorageKeyEnum } from '~/common/utils';
import { themeOverrides } from './config';
import styles from './index.module.scss';

const canShare = !!navigator.share;

const initSymbolList = getLocalItem(StorageKeyEnum.Symbols);

const symbolList = ref<ISymbol[]>(
  initSymbolList ? JSON.parse(initSymbolList) : []
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
  <n-config-provider :theme-overrides="themeOverrides" style="height: 100%">
    <n-loading-bar-provider>
      <n-message-provider>
        <div :class="styles.wrapper">
          <n-space :class="styles.main" align="center" vertical size="large">
            <convert :symbols="symbolList" />
            <time-series />
          </n-space>
          <n-space :class="styles.externalLinkWrapper">
            <external-link />
            <share-link v-if="canShare" />
          </n-space>
        </div>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
