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
          <div v-if="taskLables.includes(label.id)" class="flex align-center space-between label-details">
            <div>{{ label.title }}</div>
            <i class="el-icon-check"></i>
          </div>
        </span>
        <!-- <input v-else type="text" :class="'bclr' + idx"
          :style="{ backgroundColor: label.color }" /> -->
        <a @click="isEdit = !isEdit"><i class="el-icon-edit"></i></a>
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
      // isEdit : false,
    };
  },
  methods: {
    labelPicked(label) {
      this.$emit('labelPicked', label);
    },
  },
  computed:{
    taskLables(){
      return this.taskLableIds ? this.taskLableIds : [];
    }
  }
};
</script>
