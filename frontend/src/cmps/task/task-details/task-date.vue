<template>
  <section class="due-date">
    <p class="title">Due Date</p>
    <div class="flex align-center date-container">
      <el-checkbox v-model="checked"></el-checkbox>
      <div class="flex align-center date-txt-container">
        <p>{{ date }}</p>
        <span v-if="tag" :style="theme" class="tag">{{ txt }}</span>
        <i @click="openDatePopup" class="el-icon-arrow-down open"></i>
        <el-date-picker
          ref="datePickerInput"
          class="date-picker-btn"
          type="datetime"
          placeholder="Pick a day"
          v-model="newDueDate"
          value-format="timestamp"
          @change="setDueDate"
        ></el-date-picker>
      </div>
      <i @click="removeDueDate" class="delete el-icon-delete"></i>
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
      newDueDate: '',
    };
  },
  methods: {
    openDatePopup() {
      this.$refs.datePickerInput.focus();
    },
    setDueDate() {
      console.log(this.newDueDate);
      this.$emit('setDueDate', this.newDueDate);
    },
    removeDueDate() {
      this.$emit('removeDueDate');
    },
  },
  computed: {
    date() {
      const date = new Date(this.dueDate);
      const dateStr = `${this.$dayjs(date).format('MMM DD')} at ${this.$dayjs(date).format(
        'h:mm A'
      )}`;
      return dateStr;
    },
    tag() {
      if (Date.now() > this.dueDate || this.checked) return true;
      else return false;
    },
    txt() {
      return this.checked ? 'completed' : 'overdue';
    },
    theme() {
      return this.checked
        ? { backgroundColor: '#60BD4F' }
        : { backgroundColor: '#ec9488' };
    },
  },
};
</script>

