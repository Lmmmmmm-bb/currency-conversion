<script setup lang="ts">
import dayjs from 'dayjs';
import Chart from 'chart.js/auto';
import { computed, ref, shallowRef, watchEffect } from 'vue';
import { NSpin, NSpace, NRadioGroup, NRadioButton, useMessage } from 'naive-ui';
import { useLocation } from '~/common/hooks';
import { fetchTimeSeries, ITimeSeriesOptions } from '~/services';
import styles from './index.module.scss';
import { radioConfig } from './config';
import { ChartRangeEnum } from './types';
import { transformChartData } from './utils';

const message = useMessage();
const location = useLocation();
const chartRef = shallowRef<Chart>();
const canvasRef = ref<HTMLCanvasElement>();
const canvasWrapperRef = ref<HTMLDivElement>();
const isSpinning = ref(false);
const selectedRange = ref<ChartRangeEnum>(ChartRangeEnum.Month);
const fetchOptions = computed<ITimeSeriesOptions>(() => ({
  base: location.search.value.from,
  symbols: location.search.value.to,
  start_date: dayjs().subtract(selectedRange.value, 'd').format('YYYY-MM-DD'),
  end_date: dayjs().format('YYYY-MM-DD')
}));

const setupChart = async () => {
  if (canvasRef.value) {
    isSpinning.value = true;
    const { rates } = await fetchTimeSeries(fetchOptions.value);
    const chartData = transformChartData(rates);
    // chartRef exist then update config & data
    if (chartRef.value) {
      chartRef.value.data.datasets[0].data = chartData.data;
      chartRef.value.data.datasets[0].label = `${location.search.value.from} to ${location.search.value.to}`;
      chartRef.value.data.labels = chartData.labels;
      if (
        chartRef.value.options.plugins &&
        chartRef.value.options.plugins.title
      ) {
        chartRef.value.options.plugins.title.text = `${fetchOptions.value.start_date} ~ ${fetchOptions.value.end_date} Exchange Rate`;
      }
      chartRef.value.update();
    } else {
      chartRef.value = new Chart(canvasRef.value, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [
            {
              cubicInterpolationMode: 'monotone',
              label: `${location.search.value.from} to ${location.search.value.to}`,
              data: chartData.data,
              borderColor: '#6e91aa',
              backgroundColor: '#6e91aa',
              pointRadius: 0
            }
          ]
        },
        options: {
          responsive: true,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            title: {
              display: true,
              text: `${fetchOptions.value.start_date} ~ ${fetchOptions.value.end_date} Exchange Rate`
            },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const {
                    dataIndex,
                    dataset: { data, label }
                  } = ctx;
                  return `${label} : ${data[dataIndex]}`;
                }
              }
            }
          }
        }
      });
    }
    isSpinning.value = false;
  }
};

watchEffect(() => setupChart());

const handleFullScreen = () => {
  if (!document.fullscreenEnabled) {
    message.error('Fullscreen is not supported');
  } else if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    canvasWrapperRef.value?.requestFullscreen().catch(() => {
      message.error('Failed to enter fullscreen, please try later');
    });
  }
};
</script>

<template>
  <n-space vertical align="center">
    <n-radio-group v-model:value="selectedRange" size="small">
      <n-radio-button
        v-for="radio in radioConfig"
        :key="radio.value"
        :value="radio.value"
        :title="radio.title"
      >
        {{ radio.label }}
      </n-radio-button>
    </n-radio-group>
    <n-spin :show="isSpinning">
      <div
        ref="canvasWrapperRef"
        :class="styles.wrapper"
        @dblclick="handleFullScreen"
      >
        <canvas ref="canvasRef" />
      </div>
      <template #description>Fetching Chart Data...</template>
    </n-spin>
  </n-space>
</template>
