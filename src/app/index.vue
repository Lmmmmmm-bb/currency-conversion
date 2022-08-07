<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NLoadingBarProvider, NMessageProvider } from 'naive-ui';
import Convert from '~/layouts/convert';
import { fetchSymbols, ISymbol } from '~/services';
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
    <n-message-provider>
      <div :class="styles.wrapper">
        <div :class="styles.main">
          <convert :symbols="symbolList" />
        </div>
        <external-link :class="styles.externalLink" />
      </div>
    </n-message-provider>
  </n-loading-bar-provider>
</template>
