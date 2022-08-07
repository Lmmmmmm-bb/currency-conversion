import { onMounted, ref } from 'vue';

/**
 * Hook to listen to the window width is small or not, based max width 768px.
 * @returns {boolean}
 */
export const useSmallScreen = () => {
  const isSmallScreen = ref(false);
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  const handleMediaQueryChange = () => {
    isSmallScreen.value = mediaQuery.matches;
  };

  onMounted(() => {
    handleMediaQueryChange();
    mediaQuery.addEventListener('change', handleMediaQueryChange);
  });

  return isSmallScreen;
};
