import {ref} from 'vue'

const isLoading = ref<boolena>(false);

export function useIsLoading() {
    return {isLoading};
}