<template>
  <li
    class="d-todos todo-item flex align-center"
    @mouseover="todoOnFocus = true"
    @mouseleave="hideIcon"
  >
    <el-checkbox
      v-model="isDone"
      @input="toggleTodo"
      class="todo-checkbox-icon"
    ></el-checkbox>
    <div>
      <span class="todo" :class="isTodoDone">{{ todo.txt }}</span>
      <i
        v-if="todoOnFocus"
        class="el-icon-more more-btn"
        @click="isOpenMenu = !isOpenMenu"
      >
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
import popup from '../../popup.vue';
import todoPopup from './details-popup/todo-popup.vue';
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
  computed: {
    isTodoDone() {
      return this.isDone ? 'checked' : '';
    }
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
      this.todoOnFocus = this.isOpenMenu ? true : false;
    }
  }
};
</script>
