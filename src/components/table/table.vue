<script setup lang="ts">
import type { Column } from './types/column.ts';
import {
  FwbButton,
  FwbPagination,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
} from 'flowbite-vue';
import type { PaginateResponse } from './types/paginate-response.ts';
import { computed } from 'vue';
import type { Ref } from 'vue';

defineOptions({
  name: 'Table',
});

const props = defineProps<{
  columns: Column[];
  controller: {
    response: Ref<PaginateResponse | undefined>;
    page: Ref<number>;
    perPage: Ref<number>;
    totalPages: Ref<number>;
    fetch: () => Promise<void>;
    nextPage: () => Promise<void>;
    prevPage: () => Promise<void>;
  };
}>();

const columnsActionsExclused = computed(() =>
  props.columns.filter(column => column.field !== 'actions'),
);

const actionField = computed(() =>
  props.columns.find(column => column.field === 'actions'),
);

const rows = computed(() => {
  return props.controller.response.value?.data ?? [];
});

const pageChanged = async (page: number) => {
  props.controller.page.value = page;
  await props.controller.fetch();
};
</script>

<template>
  <div class="space-y-2">
    <fwb-table>
      <fwb-table-head>
        <fwb-table-head-cell v-for="column in columns">{{
          column.name
        }}</fwb-table-head-cell>
      </fwb-table-head>
      <fwb-table-body>
        <fwb-table-row v-for="row in rows">
          <fwb-table-cell v-for="column in columnsActionsExclused">{{
            row[column.field]
          }}</fwb-table-cell>
          <fwb-table-cell class="space-x-1">
            <fwb-button
              size="xs"
              v-for="action in actionField?.actions"
              @click="action.onClick(row)"
              :color="action.color"
            >
              {{ action.text }}
            </fwb-button>
          </fwb-table-cell>
        </fwb-table-row>
      </fwb-table-body>
    </fwb-table>
    <div class="w-full flex justify-end">
      <fwb-pagination
        v-model="controller.page.value"
        :totalPages="controller.totalPages.value"
        :perPage="controller.perPage.value"
        @pageChanged="pageChanged"
      />
    </div>
  </div>
</template>

<style scoped></style>
