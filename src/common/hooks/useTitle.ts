import { ref, watch } from 'vue';

/**
 * Hook to set the document title.
 * @param title init document title
 * @returns {Ref<string>} htmlTitle
 */
export const useTitle = (title?: string) => {
  const htmlTitle = ref(title || document.title);
  watch(
    () => htmlTitle.value,
    (newTitle) => {
      document.title = newTitle;
    },
    { immediate: true },
  );
  return htmlTitle;
};
