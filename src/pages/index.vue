<script setup>
import logo from "@/assets/sw-horizontal-icon.svg";
import noTask from "@/assets/no_task_image.png";
import { useQuery } from "@tanstack/vue-query";
import api from "@/lib/axios";
import TaskList from "@/components/TaskList.vue";
import TaskInput from "@/components/TaskInput.vue";
import TaskItem from "@/components/TaskItem.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const {
  data: tasks,
  isError,
  isLoading,
  error,
} = useQuery({
  queryKey: ["tasks"],
  queryFn: () => api.get("/todos").then((res) => res.data),
});
</script>

<template>
  <v-app class="text-white bg-dark-grey-custom">
    <v-container>
      <div class="d-flex justify-center align-center mb-4">
        <v-img
          :src="logo"
          alt="Logo"
          height="32"
          width="auto"
          max-width="32"
          contain
          class="mr-2"
        />
        <h3>{{ t("title") }}</h3>
      </div>
      <TaskInput />
      <div v-if="isLoading" class="text-center">
        <v-progress-circular indeterminate color="blue-grey" />
      </div>
      <div v-else-if="isError">{{ error.message }}</div>
      <div v-else>
        <div v-if="tasks.length">
          <TaskList :tasks="tasks" />
        </div>
        <div v-else class="pa-4">
          <v-img :src="noTask" class="pa-lg-16" />
          <p class="text-center text-h5 mt-3">{{ t("noTasksText") }}</p>
        </div>
      </div>
    </v-container>
  </v-app>
</template>
