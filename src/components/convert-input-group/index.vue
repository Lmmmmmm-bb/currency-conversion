<script setup lang="ts">
import { NInputGroup, NInputNumber, NSelect } from 'naive-ui';
import styles from './index.module.scss';
import type { RenderOption, SelectOptionType } from './types';
import type { ISOCodeEnum } from '~/common/models';

const props = withDefaults(
  defineProps<{
    select: ISOCodeEnum;
    inputValue: number;
    options: SelectOptionType[];
    renderOption: RenderOption;
    placeholder?: string;
  }>(),
  { placeholder: '' },
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
  <NInputGroup>
    <NInputNumber
      :class="styles.inputNumber"
      :value="props.inputValue"
      size="large"
      :placeholder="props.placeholder"
      :show-button="false"
      @update:value="handleInputChange"
    />
    <NSelect
      :class="styles.selector"
      :value="props.select"
      :options="props.options"
      size="large"
      filterable
      :render-option="props.renderOption"
      @update:value="handleSelectChange"
    />
  </NInputGroup>
</template>
