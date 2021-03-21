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
      //  colors: [
      //   'rgb(0, 121, 191)',
      //   'rgb(210, 144, 52)',
      //   'rgb(81, 152, 57)',
      //   'rgb(176, 70, 50)',
      //   'rgb(137, 96, 158)',
      //   'rgb(205, 90, 145)',
      //   '#d0be1a',
      //   'rgb(0, 174, 204)',
      //   'rgb(131, 140, 145)',
        
      // ],
    };
  },
  methods: {
    changeColor(color) {
      console.log(color , 'color');
      this.$emit('colorPicked', color);
    },
  },
};
</script>

