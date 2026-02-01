<script setup lang="ts">
import {Form} from "vee-validate";
import Input from "../../../components/form/input/input.vue";
import Button from "../../../components/button/button.vue";
import {validation} from './common/validations.ts'
import {search} from "./api/search.ts";
import type {ZipCodeApi} from "./common/types/zip-code-api.ts";
import type {ZipCodeDto} from "./common/types/zip-code-dto.ts";

defineOptions({
  name: 'ZipCodeSearcher',
})

const submit = async (values: {zipCode: number}) => {
  const response = await search<ZipCodeApi, ZipCodeDto>(values.zipCode)
}

</script>

<template>
  <Form :validation-schema="validation" @submit="submit" id="zip-code-searcher-form">
    <Input name="zipCode" placeholder="Enter zip code" type="text" />
    <Button text="Search" type="submit" form="zip-code-searcher-form" />
  </Form>
</template>

<style scoped>

</style>