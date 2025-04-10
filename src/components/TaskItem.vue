<script setup>
import { ref, watch, computed } from "vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiTrashCanOutline, mdiCircleOutline, mdiCheckCircle } from "@mdi/js";
import { useDateFormat } from "@/composables/useDateFormat";
import api from "@/lib/axios";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  task: Object,
});

const queryClient = useQueryClient();

const { formatDate } = useDateFormat();

const toggleTaskStatusMutation = useMutation({
  mutationFn: async (task) => {
    const res = await api.put(`/todos/${task.id}`, {
      completed: !task.completed,
    });

    return res.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["tasks"]);
  },
});

const toggleTaskStatus = () => {
  toggleTaskStatusMutation.mutate({
    id: props.task.id,
    completed: props.task.completed,
  });
};

const statusIcon = computed(() =>
  props.task.completed ? mdiCheckCircle : mdiCircleOutline
);
const deleteTaskMutation = useMutation({
  mutationFn: (id) => api.delete(`/todos/${id}`),
  onSuccess: () => {
    queryClient.invalidateQueries(["tasks"]);
  },
});

const deleteTask = () => {
  deleteTaskMutation.mutate(props.task.id);
};
</script>

<template>
  <v-card class="mb-3 bg-grey-darken-3">
    <v-card-text class="px-2">
      <v-row align="center">
        <v-col cols="1">
          <svg-icon
            type="mdi"
            :path="statusIcon"
            @click="toggleTaskStatus"
            class="cursor-pointer"
            :class="
              task.completed ? 'text-indigo-accent-1' : 'text-grey-lighten-2'
            "
          ></svg-icon>
        </v-col>
        <v-col cols="9" class="align-center ps-sm-0">
          <p class="mb-2">{{ task.title }}</p>
          <div class="text-grey-lighten-2 text-caption">
            {{ formatDate(task.created_at) }}
          </div>
        </v-col>
        <v-col cols="2" class="text-end">
          <svg-icon
            type="mdi"
            :path="mdiTrashCanOutline"
            @click="deleteTask"
            class="cursor-pointer me-sm-2"
          >
          </svg-icon>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
