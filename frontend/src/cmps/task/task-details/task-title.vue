<template>
  <section class="d-header header-container">
    <font-awesome-icon class="d-icon" icon="columns" />
    <div class="d-content task-title-container">
      <input
        type="text"
        class="flex align-center title-input"
        v-model="task.title"
        @change="updateTaskTitle"
        @keyup.enter.exact="updateTaskTitle"
      />
      <p>In list
        <a class="task-list-link" @click="isMoveTask = true"
          >{{ groupName }}
          <popup v-if="isMoveTask" @closePopup="isMoveTask = false">
            <template v-slot:title>
              <p>Move card</p>
            </template>
            <move-task-popup
              :groups="groups"
              :groupId="group.id"
              :taskId="task.id"
              @updateTaskPos="updateTaskPos"
              @closePopup="isMoveTask = false"
            />
          </popup>
        </a>
      </p>
    </div>
  </section>
</template>

<script>
import popup from '../../popup.vue';
import moveTaskPopup from '../task-details/details-popup/move-task-popup.vue';
export default {
  components: {
    popup,
    moveTaskPopup
  },
  props: {
    groups: {
      type: Array
    },
    group: {
      type: Object
    },
    task: {
      type: Object
    }
  },
  data() {
    return {
      isMoveTask: false
    };
  },
  computed: {
    groupName() {
      return this.group.title;
    }
  },
  methods: {
    updateTaskTitle() {
      this.$emit('updateTask', this.task);
    },
    updateTaskPos(updatedGroup) {
      this.$emit('updateTaskPos', updatedGroup);
    }
  }
};
</script>
