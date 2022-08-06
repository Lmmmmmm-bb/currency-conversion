<script setup lang="ts">
import { multiply, divide } from 'mathjs';
import { h, computed, ref, onMounted, watch } from 'vue';
import { NSpace, NSelect, NInputGroup, NInputNumber, NTooltip } from 'naive-ui';
import { fetchLatest, ISymbol } from '~/services';
import { ISOCodeEnum } from '~/common/models';
import styles from './index.module.scss';
import { RenderOption, SelectOptionType } from './types';

const props = defineProps<{
  symbols: ISymbol[];
}>();

const options = computed<SelectOptionType[]>(() =>
  props.symbols.map(({ code, description }) => ({
    label: code,
    value: code,
    description
  }))
);

const renderTooltipOption: RenderOption = ({ node, option }) =>
  h(
    NTooltip,
    { placement: 'right', class: styles.tooltip },
    {
      trigger: () => node,
      default: () => (<SelectOptionType>option).description
    }
  );

const isLoading = ref(false);
const rates = ref<{ [key in ISOCodeEnum]: number }>();
const info = ref({
  from: { code: ISOCodeEnum.CNY, amount: 100 },
  to: { code: ISOCodeEnum.USD, amount: 0 }
});

const currentRate = computed(() => rates.value?.[info.value.to.code] ?? 0);

const onFetchRates = async () => {
  isLoading.value = true;
  const response = await fetchLatest({ base: info.value.from.code });
  rates.value = response.rates;
  isLoading.value = false;
};

onMounted(async () => {
  await onFetchRates();
  info.value.to.amount = multiply(info.value.from.amount, currentRate.value);
});

const handleFromAmountChange = (amount: number | null) => {
  if (amount === null) return;
  info.value.from.amount = amount;
  info.value.to.amount = multiply(amount, currentRate.value);
};

const handleToAmountChange = (amount: number | null) => {
  if (amount === null) return;
  info.value.to.amount = amount;
  info.value.from.amount = divide(amount, currentRate.value);
};

watch(
  () => [info.value.from.code, info.value.to.code],
  async ([newFromCode], [oldFromCode]) => {
    newFromCode !== oldFromCode && (await onFetchRates());
    info.value.to.amount = multiply(info.value.from.amount, currentRate.value);
  }
);
</script>

<template>
  <n-space size="large">
    <n-input-group>
      <n-input-number
        :value="info.from.amount"
        size="large"
        :show-button="false"
        @update:value="handleFromAmountChange"
      />
      <n-select
        v-model:value="info.from.code"
        :class="styles.selector"
        :options="options"
        size="large"
        filterable
        :render-option="renderTooltipOption"
      />
    </n-input-group>

    <n-input-group>
      <n-input-number
        :loading="isLoading"
        :value="info.to.amount"
        size="large"
        :show-button="false"
        @update:value="handleToAmountChange"
      />
      <n-select
        v-model:value="info.to.code"
        :class="styles.selector"
        :options="options"
        size="large"
        filterable
        :render-option="renderTooltipOption"
      />
    </n-input-group>
  </n-space>
</template>
