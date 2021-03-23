<template>
  <section class="tasks-users ">
    <tasks-in-group-chart
      v-if="chartData"
      :chartData="chartData"
      class="chart"
    />
  </section>
</template>

<script>
import tasksInGroupChart from './tasks-in-group-chart.vue';
export default {
  props: {
    board: {
      type: Object,
    },
  },
  data() {
    return {
      chartData: null,
    };
  },
  created() {
    const tasksAmount = this.board.groups.map((group) => {
     return group.tasks.length;
    });
    console.log(tasksAmount);
    this.chartData = tasksAmount;
  },
  components: {
    tasksInGroupChart,
  },
};
</script>
