<template>
  <section class="label-popup">
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
            <div v-if="idx !== labelIdxToEdit">{{ label.title }}</div>
            <input
              v-else
              ref="labelTitleInput"
              type="text"
              @click.stop
              @blur="editTitle(null)"
              @keyup.enter.stop="title(label)"
              v-model="labelTitle"
            />
            <i
              class="el-icon-check"
              v-if="taskLableIds && taskLableIds.includes(label.id)"
            ></i>
          </div>
        </span>
        <a @click="editTitle(idx)"><i class="el-icon-edit"></i></a>
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
      labelIdxToEdit: null,
      labelTitle: '',
    };
  },
  methods: {
    labelPicked(label) {
      this.$emit('labelPicked', label);
    },
    title(label) {
      label.title = this.labelTitle.slice();
      this.$emit('boardLabelupdated', label);
      this.labelTitle = '';
      this.$refs.labelTitleInput[0].blur();
    },
    editTitle(idx) {
      if (this.labelIdxToEdit === idx) idx = null;
      this.labelIdxToEdit = idx;
      if (idx === null) return;
      this.$nextTick(() => this.$refs.labelTitleInput[0].focus());
    },
  },
  computed: {},
};
</script>
