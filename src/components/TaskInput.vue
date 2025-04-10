<script setup>
import { ref, computed } from "vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiSendVariantOutline } from "@mdi/js";
import api from "@/lib/axios";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const taskTitle = ref("");
const queryClient = useQueryClient();

const {
  mutate: addTaskMutation,
  isError,
  error,
} = useMutation({
  mutationFn: async (newTask) => {
    const res = await api.post("/todos", newTask);
    return res.data;
  },
  onSuccess: () => {
    taskTitle.value = "";
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  },
});

// Extract readable error message
const errorMessage = computed(() => {
  if (!error.value) return "";
  const err = error.value;

  // Axios error structure
  if (err.response && err.response.data) {
    const data = err.response.data;
    // Show detailed errors if available
    if (data.errors && typeof data.errors === "object") {
      return Object.values(data.errors).flat().join(" ");
    }
    // Fallback to general message
    return data.message || "An error occurred";
  }

  return err.message || "An unknown error occurred";
});

const addTask = () => {
  if (taskTitle.value.trim()) {
    addTaskMutation({ title: taskTitle.value, completed: false });
  }
};
</script>

<template>
  <v-row class="pa-7 pb-0 d-flex align-center">
    <v-text-field
      v-model="taskTitle"
      :label="t('taskInput.label')"
      variant="outlined"
      density="comfortable"
      :hide-details="true"
    />
    <svg-icon
      class="text-indigo-accent-1 cursor-pointer ms-2"
      type="mdi"
      :path="mdiSendVariantOutline"
      :size="32"
      @click="addTask"
    >
    </svg-icon>
  </v-row>
  <v-row v-if="isError">
    <p class="text-caption text-red-accent-4 px-7">
      {{ errorMessage }}
    </p>
  </v-row>
</template>
