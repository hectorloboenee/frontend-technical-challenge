<script setup lang="ts">
import {Form} from "vee-validate";
import Input from "../../../components/form/input/input.vue";
import Button from "../../../components/button/button.vue";
import {validation} from './common/validations.ts'
import {search} from "./api/search.ts";
import type {ZipCodeApi} from "./common/types/zip-code-api.ts";
import type {ZipCodeDto} from "./common/types/zip-code-dto.ts";
import {useUserStore} from "../user/store/user-store.ts";
import Card from "../../../components/card/card.vue";
import {ref} from "vue";
import {statusCodes, useStatusCode} from "../../http/interceptors/status-code.ts";
import ErrorHandler from "../../../components/error-handler/error-handler.vue";

defineOptions({
  name: 'ZipCodeSearcher',
})

const userStore = useUserStore();
const nameForm = 'zip-code-searcher-form';
const data = ref<ZipCodeDto | undefined>(undefined);
const {statusCode} = useStatusCode();

const createUser = () => {
  userStore.createUser({
    id: 'user-1',
    name: 'Hector'
  })
}

const submit = async (values: {zipCode: number}) => {
  data.value = await search<ZipCodeApi, ZipCodeDto>(values.zipCode)
  // createUser()
}

const saveZipCode = (event) => {
  event.preventDefault();
  if (userStore.user.id == null) {
    alert('User ID is missing')
  }
}
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center space-y-6">
    <div class="w-full grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-8 md:col-start-4 lg:col-span-8 lg:col-start-4">
        <Form :validation-schema="validation" @submit="submit" :id="nameForm">
          <div class="flex flex-row space-x-4">
            <div class="basis-2/3">
              <Input name="zipCode" placeholder="Enter zip code" type="text" />
            </div>
            <div class="basis-1/3">
              <Button text="Search" type="submit" :form="nameForm" />
            </div>
          </div>
        </Form>
      </div>


      <div class="col-span-12 md:col-span-8 md:col-start-4 lg:col-span-8 lg:col-start-4">
        <ErrorHandler :statusCode="statusCode" />
        <Card v-if="data && !statusCodes.includes(statusCode)">
          <div>
            <div class="p-5 space-y-6">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{data.postCode}}</h5>
              <p class="font-normal text-gray-700 dark:text-gray-400">
                <strong>City: {{data.places[0].placeName}}</strong><br />
                <strong>State: {{data.places[0].state}}</strong><br />
                <strong>Country: {{data.country}}</strong><br />
                <strong>Country: {{data.places[0].latitude}}</strong><br />
                <strong>Country: {{data.places[0].longitude}}</strong><br />
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

<!--  <div class="w-full flex flex-col justify-center items-center">-->
<!--    -->
<!--  </div>-->
</template>

<style scoped>

</style>