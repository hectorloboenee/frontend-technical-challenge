<script setup lang="ts">
import { onMounted } from 'vue';
import Table from '../../../../components/table/table.vue';
import type { Column } from '../../../../components/table/types/column.ts';
import { useUserStore } from '../../user/store/user-store.ts';
import { useRetriveZipCodes } from './api/use-retrive-zip-codes.ts';

defineOptions({
  name: 'ZipCodes',
});

const userStore = useUserStore();
const actions = [
  {
    text: 'Edit',
    color: 'default',
    onClick: (data: any) => {
      console.log(data);
    },
  },

  {
    text: 'Delete',
    color: 'red',
    onClick: (data: any) => {
      console.log(data);
    },
  },
];
const columns: Column[] = [
  {
    name: 'Zip codes',
    field: 'zipCode',
  },
  {
    name: 'Country',
    field: 'country',
  },
  {
    name: 'State',
    field: 'state',
  },
  {
    name: 'City',
    field: 'city',
  },
  {
    name: 'Latitude',
    field: 'latitude',
  },
  {
    name: 'Longitude',
    field: 'longitude',
  },
  {
    name: 'Observations',
    field: 'observations',
  },
  {
    name: 'Actions',
    field: 'actions',
    actions: actions,
  },
];

const controller = useRetriveZipCodes(userStore.user.id as number);

onMounted(() => {
  controller.fetch();
});
</script>

<template>
  <Table :columns="columns" :controller="controller" />
</template>

<style scoped></style>
