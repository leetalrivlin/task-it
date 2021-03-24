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
      chartData: {},
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
    var groupToShow = {};
    this.board.groups.forEach((group) => {
      var title = group.title;
      groupToShow[title] = group.tasks.length;
    });
    this.chartData.lengthGroup = Object.values(groupToShow);
    this.chartData.title = Object.keys(groupToShow);
    console.log(this.chartData);
  },
  components: {
    tasksInGroupChart,
  },
};
</script>

  let groupMap = {};
            this.board.groups.forEach(group => {
                let groupTitle = group.title
                groupMap[groupTitle] = group.tickets.length
            });
            this.chartData.groupTitle = Object.keys(groupMap)
            this.chartData.ticketCount = Object.values(groupMap)