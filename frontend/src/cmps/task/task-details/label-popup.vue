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
          <!-- <i v-if="isLabel" class="el-icon-check"></i> -->
        </span>
        <a><i class="el-icon-edit"></i></a>
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
  },
  methods: {
    labelPicked(label) {
      this.$emit('labelPicked', label);
    },
  },
};
</script>
