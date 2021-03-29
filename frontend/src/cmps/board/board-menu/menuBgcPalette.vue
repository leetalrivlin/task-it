<template>
  <section class="palette-container">
  
    <ul class="clean-list">
      <li
        v-for="(color, idx) in colors"
        :key="idx"
        class="color-pick"
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
  name: 'coverColorBgc',
  data() {
    return {
      colors: [
        '#c49191e3',
        '#c4a691e3',
        '#c491b0e3',
        '#ac91c4e3',
        '#91a8c4e3',
        '#91c2c4e3',
        '#91c49ce3',
        '#c6be9b',
        
      ],
    };
  },
  methods: {
    changeColor(color) {
      console.log(color , 'color');
      this.$emit('colorPicked', {background:color});
    },
  },
};
</script>

