<script>
import { Bar } from 'vue-chartjs';

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