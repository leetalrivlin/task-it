<template>
  <section v-if="task" class="task-desc-container d-desc">
    <!-- <i class="el-icon-s-unfold d-icon task-details-icon"></i> -->
    <font-awesome-icon class="d-icon" icon="stream" />
    <div class="d-content">
      <h1 class="task-details-header">Description</h1>
      <a v-if="!isAddDesc" class="emptyDesc" :class="descStyle" @click="addDesc">{{
        descriptionTxt
      }}</a>
      <form v-else >
        <textarea
          class="textarea"
          @keyup.enter.exact="saveDesc"
          @keydown.enter.exact.prevent
          ref="descInput"
          cols="20"
          rows="5"
          v-model="task.description"
        ></textarea>
        <div class="btn-container">
          <el-button class="task-details-btn" type="info" @click.prevent="saveDesc">Save</el-button>
          <i class="el-icon-close x-btn" @click="isAddDesc = false"></i>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStream } from '@fortawesome/free-solid-svg-icons';

library.add(faStream);

export default {
  props: {
    task: {
      type: Object
    }
  },
  data() {
    return {
      isAddDesc: false,
    };
  },
  computed: {
    descriptionTxt() {
      return this.task.description
        ? this.task.description
        : 'Add a more detailed description...';
    },
    descStyle() {
       const className = (this.task.description) ? 'fullDesc' : 'emptyDesc';
       return className
    }
  },

  methods: {
    addDesc() {
      this.isAddDesc = true;
      if (!this.task.description) this.task.description = '';
      this.$nextTick(() => {
        this.$refs.descInput.focus()
      });
    },
    saveDesc() {
      this.$emit('saveDescription', this.task);
      this.isAddDesc = false;
    },
  },
  created() {}
};
</script>
