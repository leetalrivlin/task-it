<template>
  <section class="search-section">
    <div class="filter-text">
      <el-input
        type="text"
        @keyup.stop
        v-model="filterBy.txt"
        @input="filterBoard"
      >
      </el-input>
      <p class="desc-filter">Search by term, label, member, or due time.</p>
      <hr />
    </div>
    <div class="filter-lables">
      <ul class="clean-list flex column">
        <li
          v-for="label in labels"
          :key="label.id"
          class="flex align-center space-between list-item"
          @click="pickLabel(label.id)"
        >
          <div class="flex space-between align-center">
            <span :style="{ backgroundColor: label.color }"> </span>
            <p>{{ label.title }}</p>
          </div>
          <i
            v-if="filterBy.labels.includes(label.id)"
            class="el-icon-check check"
          >
          </i>
        </li>
      </ul>
      <hr />
    </div>
    <div class="filter-members">
      <ul class="clean-list flex column">
        <li
          v-for="member in members"
          :key="member._id"
          class="flex align-center space-between list-item"
          @click="pickMember(member._id)"
        >
          <div class="flex space-between align-center">
            <avatar
              class="avatar-item"
              :username="member.fullname"
              :src="member.imgUrl"
              color="white"
              :size="33"
            ></avatar>
            <p>{{ member.fullname }}</p>
          </div>
          <i
            v-if="filterBy.members.includes(member._id)"
            class="el-icon-check check"
          >
          </i>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import Avatar from 'vue-avatar';
export default {
  name: 'menuSearch',
  components: {
    Avatar,
  },
  props: {
    board: {
      type: Object,
    },
  },
  data() {
    return {
      filterBy: {
        txt: '',
        labels: [],
        members: [],
      },
    };
  },
  methods: {
    pickLabel(labelId) {
      const idx = this.filterBy.labels.findIndex((id) => id === labelId);
      if (idx >= 0) this.filterBy.labels.splice(idx, 1);
      else this.filterBy.labels.push(labelId);
      this.filterBoard();
    },
    pickMember(memberId) {
      const idx = this.filterBy.members.findIndex((id) => id === memberId);
      if (idx >= 0) this.filterBy.members.splice(idx, 1);
      else this.filterBy.members.push(memberId);
      this.filterBoard();
    },
    filterBoard() {
      console.log(this.filterBy);
      this.$emit('filterBoard', this.filterBy);
    },
  },
  computed: {
    labels() {
      return this.$store.getters.boardLabels;
    },
    members() {
      return this.board.members;
    },
  },
};
</script>

<style>
</style>