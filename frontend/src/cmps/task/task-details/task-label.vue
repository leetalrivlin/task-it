<template>
  <section class="d-desc task-label">
    <div class="d-content">
      <p>Labels</p>
      <ul class="clean-list">
        <li class="list-item" v-for="label in taskLabels" :key="label.id">
          <span :style="{ backgroundColor: label.color }">{{ label.name }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'task-label',
  props: {
    task: {
      type: Object,
    },
    labels: {
      type: Array,
    },
  },
  computed: {
    taskLabels() {
      return this.labels.filter((label) => this.task.labelIds.includes(label.id));
    },
  },
};
</script>

