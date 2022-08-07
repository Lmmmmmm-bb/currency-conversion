<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NLoadingBarProvider } from 'naive-ui';
import { fetchSymbols, ISymbol } from '~/services';
import ConvertGroup from '~/components/convert-group';
import ExternalLink from '~/components/external-link';
import { getLocalItem, setLocalItem, StorageKeyEnum } from '~/common/utils';
import styles from './index.module.scss';

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
  <n-loading-bar-provider>
    <div :class="styles.wrapper">
      <div :class="styles.main">
        <convert-group :symbols="symbolList" />
      </div>
      <external-link :class="styles.externalLink" />
    </div>
  </n-loading-bar-provider>
</template>
