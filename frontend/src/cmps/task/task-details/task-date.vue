<template>
  <section class="due-date">
    <p class="title">Due Date</p>
    <div class="flex align-center">
      <el-checkbox v-model="checked"></el-checkbox>
      <div class="flex align-center date-container">
        <p>{{ date }}</p>
        <span v-if="overdue" :style="theme" class="overdue">{{ txt }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'dueDate',
  props: {
    dueDate: {
      type: Number,
    },
  },
  data() {
    return {
      checked: false,
    };
  },
  computed: {
    date() {
      const date = new Date(this.dueDate);
      const dateStr = date.toString();
      const dateDetails = dateStr.split(' ');
      const formatDate = `${dateDetails[1]} ${dateDetails[2]} at ${dateDetails[4]}`;
      return formatDate;
    },
    txt() {
      return this.checked ? 'completed' : 'overdue';
    },
    theme() {
      return this.checked ? {backgroundColor: '#60BD4F'} : {backgroundColor: '#ec9488'};
    },
    overdue() {
      if(Date.now() > this.dueDate || this.checked) return true
      else return false
    },
  },
};
</script>

