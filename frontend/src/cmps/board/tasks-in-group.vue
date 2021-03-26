<template>
  <section class="tasks-users">
    <tasks-in-group-chart
      v-if="chartData"
      :chartData="chartData"
      :options="options"
    />
  </section>
</template>

 

<script>
import tasksInGroupChart from './tasks-in-group-chart.vue';
Chart.defaults.global.defaultFontColor = 'white';
export default {
  props: {
    board: {
      type: Object,
    },
  },
  data() {
    return {
      chartData: {
        borderWidth: 4,
        borderColor: 'black',
      },
      options: {
        title: {
          display: true,
          text: 'Tasks per group',
          fontSize: 25,
        },
      },
      legend: {
        position: 'left',
      },
    };
  },
  methods: {
    calcTasksPerGroup() {
      var groupToShow = {};
      this.board.groups.forEach((group) => {
        var title = group.title;
        groupToShow[title] = group.tasks.length;
      });
      this.chartData.lengthGroup = Object.values(groupToShow);
      this.chartData.title = Object.keys(groupToShow);
    },
    colors() {
      var colors = [
        'rgb(170, 79, 77)',
        '#4d96c9',
        '#D8DA7C',
        'rgb(141 87 148 / 89%)',
        '#85B1B3',
        '#763857',
        '#f7d9d9',
      ];

      this.chartData.colors = colors;
      this.showChart = true;
    },
  },
  created() {
    this.calcTasksPerGroup();
    this.colors();
  },
  components: {
    tasksInGroupChart,
  },
};
</script>