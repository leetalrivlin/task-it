<template>
  <li class="d-todos">
      <!-- <span type="checkbox" class="d-todo-icon checkbox" @click="isDone" :class="completed"></span> -->
    <input
      type="checkbox"
      v-model="checked"
      class="d-todo-icon"
      @click="isDone"
    />
    <!-- <el-checkbox
      @click="isDone"
      v-model="checked"
      class="d-todo-icon"
    ></el-checkbox> -->
    <label class="d-todo-content" for="checkbox-item" :class="isDone">{{ todo.txt }}</label>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object
    }
  },
  data() {
    return {
      checked: false
    };
  },
  computed: {
completed() {
    return (this.checked) ? 'done' : '';
}
  },
  methods: {
    isDone() {
      this.checked = !this.checked;
      this.todo.isDone = this.checked;
      console.log('this.todo.isDone', this.todo.isDone);
    }
  }
};
</script>
