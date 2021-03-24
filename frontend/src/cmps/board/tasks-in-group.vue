<template>
  <section class="tasks-users ">
    <tasks-in-group-chart
      v-if="chartData"
      :chartData="chartData"
	  
    
    />
  </section>
  <!-- label=" tasks per group"
  :optains="options" -->
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
    this.chartData = tasksAmount;
  },
  components: {
    tasksInGroupChart,
  },
};
</script>
