<template>
  <section v-if="task" class="task-desc-container d-desc">
    <i class="el-icon-s-unfold d-icon task-details-icon"></i>
    <div class="d-content">
      <h1 class="task-details-header">Description</h1>
      <a v-if="!isAddDesc" class="emptyDesc" href="#" @click="addDesc">{{
        descriptionTxt
      }}</a>
      <form v-else action="">
        <textarea
          class="textarea"
          @keyup.enter.exact="saveDesc"
          @keydown.enter.exact.prevent
          name=""
          id=""
          cols="20"
          rows="5"
          v-model="task.description"
        ></textarea>
        <div class="btn-container">
          <el-button type="info" @click.prevent="saveDesc">Save</el-button>
          <i class="el-icon-close" @click="isAddDesc = false"></i>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
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
    }
  },
  methods: {
    addDesc() {
      this.isAddDesc = true;
      if (!this.task.description) this.task.description = '';
    },
    saveDesc() {
      this.$emit('saveDescription', this.task);
      this.isAddDesc = false;
    }
  },
  created() {}
};
</script>
