<script setup>
import { computed, ref } from "vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import api from "@/lib/axios";
import TaskItem from "@/components/TaskItem.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

const queryClient = useQueryClient();
const showConfirmDialog = ref(false);

const openTasks = computed(() => props.tasks.filter((task) => !task.completed));

const completedTasks = computed(() =>
  props.tasks.filter((task) => task.completed)
);

const deleteAllTasksMutation = useMutation({
  mutationFn: () => api.delete("/todos/delete-all"),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
    showConfirmDialog.value = false;
  },
});
</script>

<template>
  <v-container>
    <v-row v-if="props.tasks.length" class="my-2 justify-end align-center mx-1">
      <span
        class="cursor-pointer text-decoration-underline"
        @click="showConfirmDialog = true"
      >
        {{ t("taskList.deleteAll") }}
      </span>
    </v-row>
    <!-- Open Tasks -->
    <div v-if="openTasks.length">
      <p class="mb-2">{{ t("taskList.open") }}</p>
      <TaskItem v-for="task in openTasks" :key="task.id" :task="task" />
    </div>

    <!-- Completed Tasks -->
    <div v-if="completedTasks.length">
      <p class="mt-6 mb-2">{{ t("taskList.completed") }}</p>
      <TaskItem v-for="task in completedTasks" :key="task.id" :task="task" />
    </div>
    <!-- Confirm Delete Dialog -->
    <v-dialog v-model="showConfirmDialog" max-width="400px">
      <v-card>
        <v-card-text>{{ t("taskList.deleteModalText") }}</v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="showConfirmDialog = false">{{
            t("cancel")
          }}</v-btn>
          <v-btn color="red" @click="deleteAllTasksMutation.mutate()">{{
            t("delete")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
