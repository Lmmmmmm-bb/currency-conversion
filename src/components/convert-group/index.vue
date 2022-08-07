<script setup lang="ts">
import { multiply, divide, round } from 'mathjs';
import { ArrowsHorizontal } from '@vicons/carbon';
import { h, computed, ref, onMounted, watch, watchEffect } from 'vue';
import {
  NButton,
  NSpace,
  NSelect,
  NInputGroup,
  NInputNumber,
  NTooltip,
  NIcon,
  useLoadingBar
} from 'naive-ui';
import { ISOCodeEnum } from '~/common/models';
import { fetchLatest, ISymbol } from '~/services';
import { useTitle, useSmallScreen } from '~/common/hooks';
import styles from './index.module.scss';
import type { RenderOption, SelectOptionType } from './types';

const props = defineProps<{
  symbols: ISymbol[];
}>();

const htmlTitle = useTitle();
const loadingBar = useLoadingBar();
const isSmallScreen = useSmallScreen();

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

const rates = ref<{ [key in ISOCodeEnum]: number }>();
const info = ref({
  from: { code: ISOCodeEnum.CNY, amount: 100 },
  to: { code: ISOCodeEnum.USD, amount: 0 }
});

const currentRate = computed(() => rates.value?.[info.value.to.code] ?? 0);

const onFetchRates = async () => {
  loadingBar.start();
  const response = await fetchLatest({ base: info.value.from.code });
  rates.value = response.rates;
  loadingBar.finish();
};

onMounted(async () => {
  await onFetchRates();
  info.value.to.amount = round(
    multiply(info.value.from.amount, currentRate.value),
    2
  );
});

watchEffect(() => {
  const { from, to } = info.value;
  htmlTitle.value = `1 ${from.code} to ${currentRate.value} ${to.code}`;
});

const handleFromAmountChange = (amount: number | null) => {
  if (amount === null) return;
  info.value.from.amount = amount;
  info.value.to.amount = round(multiply(amount, currentRate.value), 2);
};

const handleToAmountChange = (amount: number | null) => {
  if (amount === null) return;
  info.value.to.amount = amount;
  info.value.from.amount = round(divide(amount, currentRate.value), 2);
};

watch(
  () => [info.value.from.code, info.value.to.code],
  async ([newFromCode], [oldFromCode]) => {
    newFromCode !== oldFromCode && (await onFetchRates());
    info.value.to.amount = multiply(info.value.from.amount, currentRate.value);
  }
);

const handleSwitchGroup = () => {
  const { from, to } = info.value;
  info.value.from = { ...to };
  info.value.to = { ...from };
  onFetchRates();
};
</script>

<template>
  <n-space size="large" align="center" :vertical="isSmallScreen">
    <n-input-group>
      <n-input-number
        :value="info.from.amount"
        size="large"
        :placeholder="info.from.code"
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
    <n-button quaternary title="Switch Gourp" @click="handleSwitchGroup">
      <template #icon>
        <n-icon
          :class="styles.icon"
          :style="{ transform: `rotate(${isSmallScreen ? 90 : 0}deg)` }"
        >
          <arrows-horizontal />
        </n-icon>
      </template>
    </n-button>
    <n-input-group>
      <n-input-number
        :value="info.to.amount"
        size="large"
        :placeholder="info.to.code"
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
