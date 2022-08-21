<script setup lang="ts">
import dayjs from 'dayjs';
import { multiply, divide } from 'mathjs';
import { ArrowsHorizontal } from '@vicons/carbon';
import { h, computed, ref, onMounted, watchEffect, watch } from 'vue';
import {
  NButton,
  NSpace,
  NTooltip,
  NIcon,
  useLoadingBar,
  NDatePicker,
  NEllipsis,
  useMessage,
  MessageReactive
} from 'naive-ui';
import { numberRound } from '~/common/utils';
import { ISOCodeEnum } from '~/common/models';
import { useTitle, useSmallScreen, useLocation } from '~/common/hooks';
import { fetchHistorical, fetchLatest, ISymbol } from '~/services';
import ConvertInputGroup, {
  RenderOption,
  SelectOptionType
} from '~/components/convert-input-group';
import styles from './index.module.scss';
import { disablePreviousDate } from './utils';

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
    description
  }))
);

const renderTooltipOption: RenderOption = ({ node, option }) =>
  h(
    NTooltip,
    { placement: 'right', class: styles.tooltip },
    {
      trigger: () => node,
      default: () => (option as SelectOptionType).description
    }
  );

const rates = ref<{ [key in ISOCodeEnum]: number }>();
const info = ref({
  from: { code: location.search.value.from, amount: 100 },
  to: { code: location.search.value.to, amount: 0 }
});

const currentRate = computed(() => rates.value?.[info.value.to.code] ?? 0);

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
  async ([newFromCode, newToCode], [oldFromCode]) => {
    location.replace({ from: newFromCode, to: newToCode });
    newFromCode !== oldFromCode && (await onFetchRates());
    info.value.to.amount = numberRound(
      multiply(info.value.from.amount, currentRate.value)
    );
  }
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
    messageInstances.value.length === 3 &&
      messageInstances.value.shift()?.destroy();
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
      multiply(info.value.from.amount, currentRate.value)
    );
  }
);
</script>

<template>
  <n-space vertical>
    <n-space
      justify="space-between"
      :align="isSmallScreen ? 'start' : 'center'"
      :vertical="isSmallScreen"
    >
      <n-ellipsis :class="styles.ellipsis">
        {{ `1 ${info.from.code} ≈ ${currentRate} ${info.to.code}` }}
      </n-ellipsis>
      <n-space :size="19">
        <n-date-picker
          v-model:value="selectDate"
          :class="styles.picker"
          size="small"
          :is-date-disabled="disablePreviousDate"
        />
        <n-button
          size="small"
          type="primary"
          quaternary
          @click="handleDateChange"
        >
          Query
        </n-button>
      </n-space>
    </n-space>
    <n-space size="large" align="center" :vertical="isSmallScreen">
      <convert-input-group
        v-model:select="info.from.code"
        :options="options"
        :placeholder="info.from.code"
        :input-value="info.from.amount"
        :render-option="renderTooltipOption"
        @input-change="handleFromAmountChange"
      />
      <n-button quaternary title="Switch Group" @click="handleSwitchGroup">
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
        :options="options"
        :placeholder="info.to.code"
        :input-value="info.to.amount"
        :render-option="renderTooltipOption"
        @input-change="handleToAmountChange"
      />
    </n-space>
  </n-space>
</template>
