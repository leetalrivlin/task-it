<template>
  <section class="label-popup" @click.stop>
    <p>Labels</p>
    <ul class="clean-list flex column labels-container">
      <li
        class="flex align-center list-item"
        v-for="(label, idx) in labels"
        :key="label.id"
      >
        <span
          @click="labelPicked(label)"
          :class="'bclr' + idx"
          :style="{ backgroundColor: label.color }"
        >
          <div class="flex align-center space-between label-details">
            <div v-if="!isEdit">{{ label.title }}</div>
            <input
              ref="input"
              v-else
              type="text"
              @keyup.enter.stop="title"
              v-model="labelTitle"
            />
            <i class="el-icon-check" v-if="taskLables.includes(label.id)"></i>
          </div>
        </span>
        <a @click="editTitle"><i class="el-icon-edit"></i></a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'labelPopup',
  props: {
    labels: {
      type: Array,
    },
    taskLableIds: {
      type: Array,
    },
  },
  data() {
    return {
      isEdit: false,
      labelTitle: '',
    };
  },
  methods: {
    labelPicked(label) {
      this.$emit('labelPicked', label);
    },
    title() {
      console.log(this.labelTitle);
    },
    editTitle() {
      this.isEdit = !this.isEdit;
      // this.$refs.input.focus();
    },
  },
  computed: {
    taskLables() {
      return this.taskLableIds ? this.taskLableIds : [];
    },
  },
};
</script>
