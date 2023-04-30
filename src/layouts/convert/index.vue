<script setup lang="ts">
import dayjs from 'dayjs';
import { divide, multiply } from 'mathjs';
import { ArrowsHorizontal } from '@vicons/carbon';
import { computed, h, onMounted, ref, watch, watchEffect } from 'vue';
import type { MessageReactive } from 'naive-ui';
import {
  NButton,
  NDatePicker,
  NEllipsis,
  NIcon,
  NSpace,
  NTooltip,
  useLoadingBar,
  useMessage,
} from 'naive-ui';
import { numberRound } from '~/common/utils';
import type { ISOCodeType } from '~/common/models';
import { useLocation, useSmallScreen, useTitle } from '~/common/hooks';
import type { ISymbol } from '~/services';
import { fetchHistorical, fetchLatest } from '~/services';
import type {
  RenderOption,
  SelectOptionType,
} from '~/components/convert-input-group';
import ConvertInputGroup from '~/components/convert-input-group';
import { disablePreviousDate } from './utils';
import styles from './index.module.scss';

const props = defineProps<{ symbols: ISymbol[] }>();

const message = useMessage();
const htmlTitle = useTitle();
const location = useLocation();
const loadingBar = useLoadingBar();
const isSmallScreen = useSmallScreen();
const messageInstances = ref<MessageReactive[]>([]);

const options = computed<SelectOptionType[]>(() =>
  props.symbols.map(({ code, description }) => ({
    label: code,
    value: code,
    description,
  })),
);

const renderTooltipOption: RenderOption = ({ node, option }) =>
  h(
    NTooltip,
    { placement: 'right', class: styles.tooltip },
    {
      trigger: () => node,
      default: () => (option as SelectOptionType).description,
    },
  );

const rates = ref<ISOCodeType>();
const info = ref({
  from: { code: location.search.value.from, amount: 100 },
  to: { code: location.search.value.to, amount: 0 },
});

const currentRate = computed(() => rates.value?.[info.value.to.code] ?? 0);

onMounted(async () => {
  await onFetchRates();
  info.value.to.amount = numberRound(
    multiply(info.value.from.amount, currentRate.value),
  );
});

watchEffect(() => {
  const { from, to } = info.value;
  htmlTitle.value = `1 ${from.code} to ${currentRate.value} ${to.code}`;
});

const handleFromAmountChange = (amount: number | null) => {
  if (amount === null) {
    return;
  }
  info.value.from.amount = amount;
  info.value.to.amount = numberRound(multiply(amount, currentRate.value));
};

const handleToAmountChange = (amount: number | null) => {
  if (amount === null) {
    return;
  }
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
  async ([newFromCode, newToCode], [oldFromCode]) => {
    location.replace({ from: newFromCode, to: newToCode });
    newFromCode !== oldFromCode && (await onFetchRates());
    info.value.to.amount = numberRound(
      multiply(info.value.from.amount, currentRate.value),
    );
  },
);

const selectDate = ref(dayjs().startOf('d').valueOf());
// record latest selected date, unfetch if date not changed
const selectDateRef = ref(selectDate.value);

async function onFetchRates() {
  loadingBar.start();
  const base = info.value.from.code;
  const today = dayjs().format('YYYY-MM-DD');
  const selectedDay = dayjs(selectDate.value).format('YYYY-MM-DD');
  const type = selectedDay === today ? 'latest' : 'historical';
  const response = await (type === 'latest'
    ? fetchLatest({ base })
    : fetchHistorical(selectedDay, { base }));
  rates.value = response.rates;
  selectDateRef.value = selectDate.value;
  loadingBar.finish();
}

const handleDateChange = () => {
  if (selectDate.value === selectDateRef.value) {
    // if message instance has 3 instances, remove the first one
    messageInstances.value.length === 3
      && messageInstances.value.shift()?.destroy();
    const instance = message.success('Rate already up to date');
    messageInstances.value.push(instance);
    return;
  }
  onFetchRates();
};

watch(
  () => rates.value,
  () => {
    info.value.to.amount = numberRound(
      multiply(info.value.from.amount, currentRate.value),
    );
  },
);
</script>

<template>
  <NSpace vertical>
    <NSpace
      justify="space-between"
      :align="isSmallScreen ? 'start' : 'center'"
      :vertical="isSmallScreen"
    >
      <NEllipsis :class="styles.ellipsis">
        {{ `1 ${info.from.code} ≈ ${currentRate} ${info.to.code}` }}
      </NEllipsis>
      <NSpace :size="19">
        <NDatePicker
          v-model:value="selectDate"
          :class="styles.picker"
          size="small"
          :is-date-disabled="disablePreviousDate"
        />
        <NButton
          size="small"
          type="primary"
          quaternary
          @click="handleDateChange"
        >
          Query
        </NButton>
      </NSpace>
    </NSpace>
    <NSpace size="large" align="center" :vertical="isSmallScreen">
      <ConvertInputGroup
        v-model:select="info.from.code"
        :options="options"
        :placeholder="info.from.code"
        :input-value="info.from.amount"
        :render-option="renderTooltipOption"
        @input-change="handleFromAmountChange"
      />
      <NButton quaternary title="Switch Group" @click="handleSwitchGroup">
        <template #icon>
          <NIcon
            :class="styles.icon"
            :style="{ transform: `rotate(${isSmallScreen ? 90 : 0}deg)` }"
          >
            <ArrowsHorizontal />
          </NIcon>
        </template>
      </NButton>
      <ConvertInputGroup
        v-model:select="info.to.code"
        :options="options"
        :placeholder="info.to.code"
        :input-value="info.to.amount"
        :render-option="renderTooltipOption"
        @input-change="handleToAmountChange"
      />
    </NSpace>
  </NSpace>
</template>
