<script setup lang="ts">
import dayjs from 'dayjs';
import Chart from 'chart.js/auto';
import { NSpin, useMessage } from 'naive-ui';
import { computed, ref, shallowRef, watchEffect } from 'vue';
import { useLocation } from '~/common/hooks';
import { fetchTimeSeries, ITimeSeriesOptions } from '~/services';
import styles from './index.module.scss';
import { transformChartData } from './utils';

const message = useMessage();
const location = useLocation();
const chartRef = shallowRef<Chart>();
const canvasRef = ref<HTMLCanvasElement>();
const canvasWrapperRef = ref<HTMLDivElement>();
const isSpinning = ref(false);
const fetchOptions = computed<ITimeSeriesOptions>(() => ({
  base: location.search.value.from,
  symbols: location.search.value.to,
  start_date: dayjs().subtract(30, 'd').format('YYYY-MM-DD'),
  end_date: dayjs().format('YYYY-MM-DD')
}));

const setupChart = async () => {
  if (canvasRef.value) {
    isSpinning.value = true;
    const { rates } = await fetchTimeSeries(fetchOptions.value);
    const chartData = transformChartData(rates);
    if (chartRef.value) {
      chartRef.value.data.datasets[0].data = chartData.data;
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
              backgroundColor: '#6e91aa'
            }
          ]
        },
        options: {
          responsive: true,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            title: {
              display: true,
              text: `${fetchOptions.value.start_date} ~ ${fetchOptions.value.end_date} Exchagne Rate`
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

const handleFullScreen = () => {
  document.fullscreenElement
    ? document.exitFullscreen()
    : canvasWrapperRef.value?.requestFullscreen().catch(() => {
        message.error('Failed to enter fullscreen');
      });
};

watchEffect(() => setupChart());
</script>

<template>
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
</template>
