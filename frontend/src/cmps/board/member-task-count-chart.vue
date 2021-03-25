<script>
import { Bar } from 'vue-chartjs';

Chart.defaults.global.defaultFontColor = '#faf3e0';
Chart.defaults.global.elements.point.radius = 3;

export default {
  extends: Bar,
  props: {
    label: {
      type: String,
    },
    chartData: {
      type: Object,
    },
    options: {
      type: Object,
    },
  },
  mounted() {
    // console.log(this.chartData.tasksCount);
    // console.log(this.chartData.fullname);

    this.renderChart(
      {
        labels: this.chartData.fullname,
        datasets: [
          {
            label: this.label,
            data: this.chartData.tasksCount,
            backgroundColor: this.chartData.colors,
            borderColor: this.chartData.colors,
          },
        ],
      },
      this.options
    );
  },
};
</script>