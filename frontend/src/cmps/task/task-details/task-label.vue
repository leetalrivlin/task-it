<template>
  <section class="task-label flex column">
    <p class="task-details-title">Labels</p>
    <ul class="clean-list flex">
      <li class="list-item" v-for="label in taskLabels" :key="label.id">
        <span :style="{ backgroundColor: label.color }">
          {{ label.title }}
        </span>
      </li>
      <li class="list-item" @click="isLabel = !isLabel">
        <span class="flex align-center justify-center" :style="{ backgroundColor: '#E5E6EA' }"
          ><i class="el-icon-plus">
            <popup v-if="isLabel" @closePopup="isLabel = false">
              <template v-slot:title>
                <p>Labels</p>
              </template>
              <label-popup
                :labels="labels"
                :taskLableIds="task.labelIds"
                @labelPicked="addLabel"
                @boardLabelupdated="updateLabel"
              />
            </popup> </i
        ></span>
      </li>
    </ul>
  </section>
</template>

<script>
import popup from '../../popup.vue';
import labelPopup from '../task-details/details-popup/label-popup.vue';

export default {
  name: 'task-label',
  props: {
    task: {
      type: Object,
    },
    labels: {
      type: Array,
    },
  },
  data() {
    return {
      isLabel: false,
    };
  },
  methods: {
    addLabel(label) {
      this.$emit('addLabel', label);
    },
    updateLabel(updatedLabel) {
      this.$emit('updateLabel', updatedLabel);
    },
  },
  computed: {
    taskLabels() {
      return this.labels.filter((label) =>
        this.task.labelIds.includes(label.id)
      );
    },
  },
  components: {
    popup,
    labelPopup,
  },
};
</script>

