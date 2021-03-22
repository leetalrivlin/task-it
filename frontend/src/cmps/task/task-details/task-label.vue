<template>
  <section class="d-desc task-label">
    <div class="d-content">
      <p>Labels</p>
      <ul class="clean-list">
        <li class="list-item" v-for="label in taskLabels" :key="label.id">
          <span :style="{ backgroundColor: label.color }">
            {{ label.title }}
          </span>
        </li>
        <li class="list-item" @click="isLabel = !isLabel">
          <span :style="{ backgroundColor: '#E5E6EA' }"
            ><i class="el-icon-plus">
              <popup v-if="isLabel" @closePopup="isLabel = false">
                <template v-slot:title>
                  <p>Labels</p>
                </template>
                <label-popup
                  :labels="labels"
                  :taskLableIds="task.labelIds"
                  @labelPicked="addLabel"
                />
              </popup> </i
          ></span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import popup from './popup.vue';
import labelPopup from './label-popup.vue';

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

