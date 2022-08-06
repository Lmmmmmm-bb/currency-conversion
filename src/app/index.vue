<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchSymbols, ISymbol } from '~/services';
import ConvertGroup from '~/components/convert-group';
import ExternalLink from '~/components/external-link';
import { getLocalItem, setLocalItem, StorageKeyEnum } from '~/common/utils';
import styles from './index.module.scss';

const symbolList = ref<ISymbol[]>([]);
onMounted(async () => {
  const localSymbols = getLocalItem(StorageKeyEnum.Symbols);
  if (!localSymbols) {
    const { symbols } = await fetchSymbols();
    const symbolsToArray = Object.values(symbols);
    setLocalItem(StorageKeyEnum.Symbols, JSON.stringify(symbolsToArray));
    symbolList.value = symbolsToArray;
  } else {
    symbolList.value = JSON.parse(localSymbols);
  }
});
</script>

<template>
  <div :class="styles.wrapper">
    <div :class="styles.main">
      <convert-group :symbols="symbolList" />
    </div>
    <external-link :class="styles.externalLink" />
  </div>
</template>
