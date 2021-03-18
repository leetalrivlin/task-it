<template>
  <section v-if="task" class="task-details">
    <section v-if="cover" class="details-layout cover-container">
      <el-button class="cover-btn el-btn">Cover</el-button>
    </section>
    <section class="details-grid">
      <header class="d-header">
          <i class="el-icon-share d-icon"></i>
          <div class="d-content">
            <h1>{{ task.title }}</h1>
            <p>In list <a href="#" class="task-list-link">List name</a></p>
          </div>
      </header>
      <nav class="d-cntrlr">
        <el-button>Members</el-button>
        <el-button>Labels</el-button>
        <el-button>Checklist</el-button>
      </nav>
      <div class="d-desc">
        <i class="el-icon-edit d-icon"></i>
        <div class="d-content">
          <h1>Description</h1>
          <p v-if="task.description">{{task.description}}</p>
          <textarea v-else name="" id="" cols="20" rows="5"></textarea>
        </div>
      </div>
      <div class="d-checklist">
        <i class="el-icon-edit d-icon"></i>
        <div class="d-content">
          <h1>Cecklist</h1>
          <ul>
            <li>Add chart</li>
            <li>Manage service support</li>
          </ul>
        </div>
      </div>
      <el-button
        class="el-close"
        icon="el-icon-close"
        circle
        @click="closeDetails"
      ></el-button>
    </section>
  </section>
</template>

<script>
export default {
  name: 'taskDetails',
  data() {
    return {
      cover: true
    };
  },
  computed: {
    task() {
      return this.$store.getters.task;
    }
  },
  methods: {
    closeDetails() {
      const boardId = this.$route.params.boardId;
      this.$router.push(`/board/${boardId}`);
    }
  },
  created() {
    const taskId = this.$route.params.taskId;
    this.$store.commit({ type: 'setTaskById', taskId });
  }
};
</script>
