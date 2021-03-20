<template>
  <li class="d-todos">
      <el-checkbox
        @click="checked = !checked"
        v-model="checked"
        class="d-todo-icon"
        name="checkbox-item"
      ></el-checkbox>
      <label class="d-todo-content" for="checkbox-item"
        >{{todo}}</label
      >
  </li>
</template>

<script>
export default {
    props: {
        todo: {
            type: String
        }
    },
    data() {
    return {
      checked: false
    };
  },

}
</script>
