<script setup lang="ts">
import { NInputGroup, NInputNumber, NSelect } from 'naive-ui';
import { ISOCodeEnum } from '~/common/models';
import styles from './index.module.scss';
import { RenderOption, SelectOptionType } from './types';

const props = withDefaults(
  defineProps<{
    select: ISOCodeEnum;
    inputValue: number;
    options: SelectOptionType[];
    renderOption: RenderOption;
    placeholder?: string;
  }>(),
  { placeholder: '' }
);

const emits = defineEmits<{
  (e: 'inputChange', value: number | null): void;
  (e: 'update:select', value: ISOCodeEnum): void;
}>();

const handleInputChange = (value: number | null) => emits('inputChange', value);

const handleSelectChange = (value: ISOCodeEnum) =>
  emits('update:select', value);
</script>

<template>
  <n-input-group>
    <n-input-number
      :class="styles.inputNumber"
      :value="props.inputValue"
      size="large"
      :placeholder="props.placeholder"
      :show-button="false"
      @update:value="handleInputChange"
    />
    <n-select
      :class="styles.selector"
      :value="props.select"
      :options="props.options"
      size="large"
      filterable
      :render-option="props.renderOption"
      @update:value="handleSelectChange"
    />
  </n-input-group>
</template>
