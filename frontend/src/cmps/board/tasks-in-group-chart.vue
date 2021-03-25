
<script>
import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  props: {
    chartData: {
      type: Object,
    },
    label: {
      type: String,
    },
    options: {
      type: Object,
    },
  },

  mounted() {
    this.renderChart(
      {
        labels: this.chartData.title,
        datasets: [
          {
            label: this.chartData.title,
            data: this.chartData.lengthGroup,
            backgroundColor:this.chartData.colors,
           borderColor:this.chartData.colors,
           
          },
        ],
      },
      this.options
    );
  },
};
</script>

