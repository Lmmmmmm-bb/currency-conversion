<script setup lang="ts">
import { multiply, divide } from 'mathjs';
import { ArrowsHorizontal } from '@vicons/carbon';
import { h, computed, ref, onMounted, watchEffect, watch } from 'vue';
import { NButton, NSpace, NTooltip, NIcon, useLoadingBar } from 'naive-ui';
import { numberRound } from '~/common/utils';
import { ISOCodeEnum } from '~/common/models';
import { fetchLatest, ISymbol } from '~/services';
import { useTitle, useSmallScreen } from '~/common/hooks';
import ConvertInputGroup, {
  RenderOption,
  SelectOptionType
} from '~/components/convert-input-group';
import styles from './index.module.scss';

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
  info.value.to.amount = numberRound(
    multiply(info.value.from.amount, currentRate.value)
  );
});

watchEffect(() => {
  const { from, to } = info.value;
  htmlTitle.value = `1 ${from.code} to ${currentRate.value} ${to.code}`;
});

const handleFromAmountChange = (amount: number | null) => {
  if (amount === null) return;
  info.value.from.amount = amount;
  info.value.to.amount = numberRound(multiply(amount, currentRate.value));
};

const handleToAmountChange = (amount: number | null) => {
  if (amount === null) return;
  info.value.to.amount = amount;
  info.value.from.amount = numberRound(divide(amount, currentRate.value));
};

const handleSwitchGroup = () => {
  const { from, to } = info.value;
  info.value.from = { ...to };
  info.value.to = { ...from };
};

watch(
  () => [info.value.from.code, info.value.to.code],
  async ([newFromCode], [oldFromCode]) => {
    newFromCode !== oldFromCode && (await onFetchRates());
    info.value.to.amount = numberRound(
      multiply(info.value.from.amount, currentRate.value)
    );
  }
);
</script>

<template>
  <n-space size="large" align="center" :vertical="isSmallScreen">
    <convert-input-group
      v-model:select="info.from.code"
      :input-value="info.from.amount"
      :placeholder="info.from.code"
      :options="options"
      :render-option="renderTooltipOption"
      @input-change="handleFromAmountChange"
    />
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
    <convert-input-group
      v-model:select="info.to.code"
      :input-value="info.to.amount"
      :placeholder="info.to.code"
      :options="options"
      :render-option="renderTooltipOption"
      @input-change="handleToAmountChange"
    />
  </n-space>
</template>
