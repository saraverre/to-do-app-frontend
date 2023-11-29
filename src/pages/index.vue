<script setup>
import placeholder from "@/assets/sw-horizontal-color-black.svg"
import { useQuery } from "@tanstack/vue-query";

const { isLoading, isFetching, isError, data, error } = useQuery({
  queryKey: ['todos']
})

</script>

<template>
  <main class="d-flex flex-column pa-2 ga-4">
    <VImg
        :src="placeholder"
        width="200px"
    />
    <h1 class="sw-large-title-bold">
      Hello world!
    </h1>
  </main>
</template>