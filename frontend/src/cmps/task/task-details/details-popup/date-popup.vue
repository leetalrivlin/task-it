<template>
  <section class="date-popup flex column" @click.stop>
    <div class="block">
      <span class="demonstration">Default</span>
      <el-date-picker v-model="value1" type="date" placeholder="Pick a day">
      </el-date-picker>
    </div>
  </section>
</template>

<script>
export default {
  name: 'datePopup',
  data() {
    return {
      value1: '',
    };
  },
};
</script>

