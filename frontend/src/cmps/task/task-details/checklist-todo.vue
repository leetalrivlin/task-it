<template>
  <li
    class="d-todos todo-item"
    @mouseover="todoOnFocus = true"
    @mouseleave="hideIcon"
  >
    <input
      type="checkbox"
      v-model="isDone"
      @change="toggleTodo"
      class="d-todo-icon"
    />
    <!-- <el-checkbox
      v-model="isDone"
      @input="toggleTodo"
      class="d-todo-icon"
    ></el-checkbox> -->
    <div class="d-todo-content flex align-center justify-center">
      <span>{{ todo.txt }}</span>
      <i v-if="todoOnFocus" class="el-icon-more more-btn" @click="isOpenMenu = !isOpenMenu">
        <popup v-if="isOpenMenu" @closePopup="isOpenMenu = false">
          <template v-slot:title>
            <p>Item Actions</p>
          </template>
          <todo-popup @deleteTodo="deleteTodo" />
        </popup>
      </i>
    </div>
  </li>
</template>

<script>
import popup from './popup.vue';
import todoPopup from './todo-popup.vue';
export default {
  props: {
    todo: {
      type: Object
    }
  },
  components: {
    todoPopup,
    popup
  },
  data() {
    return {
      isDone: this.todo.isDone,
      isOpenMenu: false,
      todoOnFocus: false
    };
  },

  methods: {
    toggleTodo() {
      this.todo.isDone = this.isDone;
      this.$emit('updateTodo', this.todo);
    },
    deleteTodo() {
      this.$emit('deleteTodo', this.todo.id);
    },
    hideIcon() {
      this.todoOnFocus = (this.isOpenMenu) ? true : false;
    }
  }
};
</script>
