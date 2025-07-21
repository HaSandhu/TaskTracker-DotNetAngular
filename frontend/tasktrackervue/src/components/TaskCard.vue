<!-- src/components/TaskCard.vue -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'; // ADDED: ref, computed, onMounted
import type { Task } from '../models/task.model'; // CORRECTED: Typo 'Tas' to 'Task'
import { TaskStatus } from '../models/task.model'; // ADDED: Import TaskStatus enum for clarity

// --- PROPS ---
// CORRECTED: defineProps should use type-based syntax for TypeScript
const props = defineProps<{
  taskData: Task; // The input task object from the parent
}>();

// --- EMITS ---
// ADDED: defineEmits to declare the custom event for parent communication
const emit = defineEmits<{
  (e: 'delete-this-task', task: Task): void; // Event for when the task should be deleted
}>();

// --- REACTIVE STATE ---
// CORRECTED: Angular signal 'delete' converted to Vue ref 'showDeleteConfirm'
const showDeleteConfirm = ref(false); // Controls visibility of the delete confirmation popup

// --- COMPUTED PROPERTIES ---
// ADDED: Computed property for tooltip text, reacts to changes in taskData
const tooltipText = computed(() => {
  let text = `Status: ${TaskStatus[props.taskData.status]}`; // Use enum for readable status
  if (props.taskData.status === TaskStatus.Blocked && props.taskData.blockedDesc) { // Use enum for comparison
    text += ` - Reason: ${props.taskData.blockedDesc}`;
  }
  return text;
});

// --- METHODS ---
// ADDED: Utility function for date formatting (Vue doesn't have built-in pipes like Angular)
const formatDate = (dateString: string | undefined, format: 'mediumDate' | 'short'): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ''; // Handle invalid date strings

  const options: Intl.DateTimeFormatOptions = {};
  if (format === 'mediumDate') {
    options.year = 'numeric';
    options.month = 'short';
    options.day = 'numeric';
  } else if (format === 'short') {
    options.year = '2-digit';
    options.month = 'numeric';
    options.day = 'numeric';
    options.hour = 'numeric';
    options.minute = 'numeric';
    options.hour12 = true; // Use 12-hour format with AM/PM
  }
  return new Intl.DateTimeFormat(navigator.language, options).format(date);
};

// Method to get the image source for the task status icon
const getStatusImg = (): string | null => {
  // Assuming images are in the 'public' folder and served from the root
  const basePath = 'status_icons/';
  switch (props.taskData.status) {
    case TaskStatus.ToDo:
      return basePath + 'todo-icon.jpg';
    case TaskStatus.InProgress:
      return basePath + 'pending-icon.png';
    case TaskStatus.Blocked:
      return basePath + 'blocked-icon.png';
    case TaskStatus.Done:
      return basePath + 'done-icon.png';
    case TaskStatus.Deleted:
      return basePath + 'delete-icon.png';
    default:
      return null;
  }
};

// Method to get the image source for the task priority icon
const getPriorityImg = (): string | null => {
  const basePath = 'priority_icons/';
  switch (props.taskData.taskPriority) { // CORRECTED: Use taskPriority from props.taskData
    case 'high':
      return basePath + 'red-icon.png';
    case 'medium':
      return basePath + 'yellow-icon.png';
    case 'low':
      return basePath + 'green-icon.png';
    default:
      return null;
  }
};

// Method to emit the delete event to the parent
const sendDeleteTask = (): void => {
  console.log("Emitting task from card:", props.taskData.title);
  emit('delete-this-task', props.taskData); // Emit the event with the task data
  showDeleteConfirm.value = false; // Hide the confirmation popup after emitting
};

// --- LIFECYCLE HOOKS ---
// Equivalent to Angular's ngOnInit
onMounted(() => {
  // You can perform initial setup here if needed
  // For example, if tooltipText needed to be set initially based on data
  // (though computed property handles reactivity automatically)
});
</script>

<template>
  <div class="task-card">
    <!-- Card Header: Title, Description, Status Icon, Due Date -->
    <div class="card-header">
      <div class="title-description">
        <h3 class="task-title">{{ taskData.title }}</h3>
        <p class="task-description">{{ taskData.description }}</p>
      </div>

      <div class="status-date">
        <div class="status-icon-container">
          <!-- CORRECTED: :alt binding, :src binding, :title binding -->
          <img :src="getStatusImg()" :alt="taskData.status + ' status icon'" class="status-icon" :title="tooltipText" />
        </div>

        <!-- Due Date -->
        <div class="due-date" v-if="taskData.dueDate">
          <!-- CORRECTED: v-if instead of *ngIf, using formatDate function -->
          Due: {{ formatDate(taskData.dueDate, 'mediumDate') }}
        </div>
      </div>
    </div>

    <!-- Info Bar: Priority, User, Last Updated, Tags, Delete Button -->
    <div class="info-bar">
      <!-- Priority Indicator (using image now) -->
      <div class="priority-indicator" v-if="taskData.taskPriority">
        <!-- CORRECTED: v-if, :src, :alt -->
        <span><img :src="getPriorityImg()" :alt="taskData.taskPriority + ' priority icon'" /></span>
      </div>

      <!-- User Name -->
      <span class="info-item" v-if="taskData.userName">
        <!-- CORRECTED: v-if -->
        Assigned: {{ taskData.userName }}
      </span>

      <!-- Last Updated Date -->
      <span class="info-item" v-if="taskData.updatedDate">
        <!-- CORRECTED: v-if, using formatDate function -->
        Last Updated: {{ formatDate(taskData.updatedDate, 'short') }}
      </span>

      <!-- Tags -->
      <div class="tags-container">
        <!-- CORRECTED: v-for instead of *ngFor, no slice pipe (use JS slice directly) -->
        <span class="tag-bubble" v-for="tag in taskData.tags?.slice(0, 3)" :key="tag">
          {{ tag }}
        </span>
        <!-- CORRECTED: v-if -->
        <span class="tag-bubble more-tags" v-if="taskData.tags && taskData.tags.length > 3">...</span>
      </div>

      <!-- Delete Button -->
      <div class="deleteButton">
        <!-- CORRECTED: @click instead of (click) -->
        <button @click="showDeleteConfirm = true">
          <!-- You might want a delete icon here -->
          Delete
        </button>
      </div>
    </div>

    <!-- Delete Confirmation Popup -->
    <div class="delete-confirmation-overlay" v-if="showDeleteConfirm">
      <!-- CORRECTED: v-if instead of *ngIf, using ref.value -->
      <div class="delete-confirmation-card">
        <h1>Are you sure you would like to delete this Task?</h1>
        <div class="confirmation-buttons">
          <button @click="sendDeleteTask()">Yes</button>
          <button @click="showDeleteConfirm = false">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Placeholder for component-specific styles -->
<!-- The actual CSS will be provided in the next section -->
<style scoped>
/* Styles for TaskCard.vue */
/* Will be provided in the next section */
</style>