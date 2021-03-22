<template>
  <section class="due-date">
    <p class="title">Due Date</p>
    <p class="date-container">{{ date }}</p>
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
  computed: {
    date() {
      const date = new Date(this.dueDate);
      const dateStr = date.toString();
      const dateDetails = dateStr.split(' ');
      const formatDate = `${dateDetails[1]} ${dateDetails[2]} at ${dateDetails[4]}`;
      return formatDate;
    },
  },
};
</script>

