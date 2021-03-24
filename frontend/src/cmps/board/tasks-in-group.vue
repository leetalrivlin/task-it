<template>
  <section class="tasks-users">
    <tasks-in-group-chart
      v-if="chartData"
      :chartData="chartData"
      label=" tasks per group"
      :optains="options"
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
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scaleFontColor: '#FFFFFF',

        legend: {
          fontColor: '#fff',
          labels: {
            fontColor: 'white',
            fontSize: 20,
          },
        },
      },
    };
  },
  created() {
	  var groupToShow={}
     this.board.groups.foreach((group) => {
		 var groupTitle = group.title
      groupToShow.groupTitle= group.tasks.length;
    });
    this.chartData = tasksAmount;

  },
  components: {
    tasksInGroupChart,
  },
};
</script>
