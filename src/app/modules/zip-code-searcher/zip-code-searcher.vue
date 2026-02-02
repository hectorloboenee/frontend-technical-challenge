<script setup lang="ts">
import { Form } from 'vee-validate';
import Input from '../../../components/form/input/input.vue';
import Button from '../../../components/button/button.vue';
import { searchValidation, userValidation } from './common/validations.ts';
import { search } from './api/search.ts';
import type { ZipCodeApi } from './common/types/zip-code-api.ts';
import type { ZipCodeDto } from './common/types/zip-code-dto.ts';
import { useUserStore } from '../user/store/user-store.ts';
import Card from '../../../components/card/card.vue';
import { ref } from 'vue';
import {
  statusCodes,
  useStatusCode,
} from '../../http/interceptors/status-code.ts';
import ErrorHandler from '../../../components/error-handler/error-handler.vue';
import Modal from '../../../components/modal/modal.vue';
import { createUser } from '../user/api/create-user.ts';
import { UserResponseDto } from '../user/common/types/user-response-dto.ts';

defineOptions({
  name: 'ZipCodeSearcher',
});

const userStore = useUserStore();
const nameForm = 'zip-code-searcher-form';
const createUserNameForm = 'create-user-name-form';
const createZipCodeForm = 'create-zip-code-form';
const data = ref<ZipCodeDto | undefined>(undefined);
const { statusCode } = useStatusCode();
const openCreateUser = ref<boolean>(false);
const openCreateZipCode = ref<boolean>(false);

const searchZipCode = async (values: { zipCode: number }) => {
  data.value = await search<ZipCodeApi, ZipCodeDto>(values.zipCode);
};

const saveZipCode = event => {
  event.preventDefault();
  if (userStore.user.id == null) {
    openCreateUserModal();
  }
};

const closeCreateUserModal = () => {
  openCreateUser.value = false;
};
const openCreateUserModal = () => {
  openCreateUser.value = true;
};

const createUserOnSubmit = async (values: { name: string }) => {
  const response = await createUser<UserResponseDto>(values.name);
  userStore.createUser({
    id: response.id,
    name: response.name,
    uuid: response.uuid,
  });
  closeCreateUserModal();
};

const closeCreateZipCodeModal = () => {
  openCreateZipCode.value = false;
};
const openCreateZipCodeModal = () => {
  openCreateZipCode.value = true;
};

const createZipCodeOnSubmit = async (values: any) => {
  console.log(values);
};
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center space-y-6">
    <div class="w-full grid grid-cols-12 gap-6">
      <div
        class="col-span-12 md:col-span-4 md:col-start-5 lg:col-span-4 lg:col-start-5"
      >
        <Form
          :validation-schema="searchValidation"
          @submit="searchZipCode"
          :id="nameForm"
        >
          <div class="flex flex-row space-x-4">
            <div class="basis-3/3">
              <Input name="zipCode" placeholder="Enter zip code" type="text" />
            </div>
            <div class="basis-0/3">
              <Button text="Search" type="submit" :form="nameForm" />
            </div>
          </div>
        </Form>
      </div>

      <div
        class="col-span-12 md:col-span-4 md:col-start-5 lg:col-span-4 lg:col-start-5"
      >
        <ErrorHandler :statusCode="statusCode" />
        <Card v-if="data && !statusCodes.includes(statusCode)">
          <div>
            <div class="p-5 space-y-6">
              <h5
                class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                Zip Code: {{ data.postCode }}
              </h5>
              <p class="font-normal text-gray-700 dark:text-gray-400">
                <strong>City: </strong>{{ data.places[0].placeName }}<br />
                <strong>State: </strong>{{ data.places[0].state }}<br />
                <strong>Country: </strong>{{ data.country }}<br />
                <strong>Latitude: </strong>{{ data.places[0].latitude }}<br />
                <strong>Longitude: </strong>{{ data.places[0].longitude }}<br />
              </p>
              <div class="flex justify-end">
                <Button text="Add" @click="saveZipCode" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>

  <Modal
    :close="closeCreateUserModal"
    :show="openCreateUserModal"
    :open="openCreateUser"
    :nameForm="createUserNameForm"
    actionLabel="Add"
    title="Create user"
  >
    <Form
      :validation-schema="userValidation"
      @submit="createUserOnSubmit"
      :id="createUserNameForm"
    >
      <div class="flex flex-row space-x-4">
        <div class="basis-3/3">
          <Input name="name" placeholder="Enter your name" type="text" />
        </div>
      </div>
    </Form>
  </Modal>

  <Modal
    title="Add zip code"
    :close="closeCreateZipCodeModal"
    :show="openCreateZipCodeModal"
    :name-form="createZipCodeForm"
    action-label="Add"
  >
    <Form
      :validation-schema="userValidation"
      @submit="createZipCodeOnSubmit"
      :id="createZipCodeForm"
    >
      <div class="flex flex-row space-x-4">
        <div class="basis-3/3">
          <Input name="name" placeholder="Enter your name" type="text" />
        </div>
      </div>
    </Form>
  </Modal>
</template>

<style scoped></style>
