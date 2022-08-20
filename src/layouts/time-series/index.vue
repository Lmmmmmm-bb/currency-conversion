<script setup lang="ts">
import dayjs from 'dayjs';
import Chart from 'chart.js/auto';
import { useMessage } from 'naive-ui';
import { computed, ref, watchEffect } from 'vue';
import { useLocation } from '~/common/hooks';
import { fetchTimeSeries, ITimeSeriesOptions } from '~/services';
import styles from './index.module.scss';
import { transformChartData } from './utils';

const message = useMessage();
const location = useLocation();
const chartRef = ref<Chart>();
const canvasWrapperRef = ref<HTMLDivElement>();
const canvasRef = ref<HTMLCanvasElement>();
const fetchOptions = computed<ITimeSeriesOptions>(() => ({
  base: location.search.value.from,
  symbols: location.search.value.to,
  start_date: dayjs().subtract(30, 'd').format('YYYY-MM-DD'),
  end_date: dayjs().format('YYYY-MM-DD')
}));

const setupChart = async () => {
  const { rates } = await fetchTimeSeries(fetchOptions.value);
  const chartData = transformChartData(rates);
  if (canvasRef.value) {
    chartRef.value?.destroy();
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
        plugins: {
          title: {
            display: true,
            text: `${fetchOptions.value.start_date} ~ ${fetchOptions.value.end_date} Exchagne Rate`
          }
        },
        interaction: { mode: 'index', intersect: false }
      }
    });
  }
};

const handleFullScreen = () => {
  const isFullScreen = document.fullscreenElement;
  isFullScreen
    ? document.exitFullscreen()
    : canvasWrapperRef.value?.requestFullscreen().catch(() => {
        message.error('Failed to enter fullscreen');
      });
};

watchEffect(() => {
  setupChart();
});
</script>

<template>
  <div
    ref="canvasWrapperRef"
    :class="styles.wrapper"
    @dblclick="handleFullScreen"
  >
    <canvas ref="canvasRef" />
  </div>
</template>
