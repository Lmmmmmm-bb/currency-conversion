import { ref, watch } from 'vue';

export const useTitle = (title?: string) => {
  const htmlTitle = ref(title || document.title);
  watch(
    () => htmlTitle.value,
    (newTitle) => {
      document.title = newTitle;
    },
    { immediate: true }
  );
  return htmlTitle;
};
