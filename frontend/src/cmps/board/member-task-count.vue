<template>
  <section>
    <member-task-count-chart
      v-if="chartData"
      :chartData="chartData"
      label=" tasks per member"
      :options="options"
    />
  </section>
</template>

 

<script>
import memberTaskCountChart from './member-task-count-chart.vue';
export default {
  props: {
    board: {
      type: Object,
    },
  },
  data() {
    return {
      chartData: {
        fullname: [],
        tasksCount: [],
        borderWidth: 1,
        hoverBorderColor: '#777',
        hoverBorderWidth: 3,

      },
      options: {
        title: {
          display: true,
          text: 'Tasks per member',
          fontSize: 25,
        },
        legend: {
          display: false,
        },
      },
    };
  },
  created() {
    var tasksToShow = [];
    var membersPerTask = {};
    this.board.groups.forEach((group) => {
      group.tasks.forEach((task) => {
        if (!task.members || !task.members.length) return;
        tasksToShow.push(task);
      });
    });
    console.log(tasksToShow);
    tasksToShow.forEach((task) => {
      task.members.forEach((member) => {
        if (!membersPerTask.hasOwnProperty(member._id)) {
          membersPerTask[member._id] = {
            fullname: member.fullname,
            tasksCount: 1,
          };
        } else {
          membersPerTask[member._id].tasksCount++;
        }
      });
    });

    for (const member in membersPerTask) {
      this.chartData.fullname.push(membersPerTask[member].fullname);
      this.chartData.tasksCount.push(membersPerTask[member].tasksCount);
    }

    console.log(this.chartData.fullname);

    var colors = [
      'rgb(170, 79, 77)',
      '#4d96c9',
      '#D8DA7C',
      'rgb(141 87 148 / 89%)',
      '#85B1B3',
      '#763857',
      '#f7d9d9',
      '#763857',
      '#f7d9d9',
    ];

    this.chartData.colors = colors;
    this.showChart = true;
  },
  components: {
    memberTaskCountChart,
  },
};
</script>