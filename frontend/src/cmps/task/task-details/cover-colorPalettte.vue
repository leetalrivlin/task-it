<template>
  <section class="color-palette">
    <p>Colors</p>
    <ul class="clean-list">
      <li
        v-for="(color, idx) in colors"
        :key="idx"
        class="color-item"
        :style="{
          backgroundColor: color,
        }"
        @click="changeColor(color)"
      ></li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'coverColorPalette',
  data() {
    return {
      colors: [
        '#6FA765',
        '#F5DD2A',
        '#FFAF3E',
        '#EF7564',
        '#CD8DE5',
        '#5AA4CF',
        '#2BCCE5',
        '#6EECA9',
        '#FF8DD4',
        '#182B4D',
      ],
    };
  },
  methods: {
    changeColor(color) {
      this.$emit('colorPicked', color);
    },
  },
};
</script>

