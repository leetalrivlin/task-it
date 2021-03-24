
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
    Option: {
      type: Object,
    },
  },
  mounted() {
    this.renderChart({
      labels: Object.keys(this.chartData.title),
      datasets: [
        {
          backgroundColor: ['#8790b9', '#7c4d7a', 'f9b9bb', '#f5d993'],
          data: Object.values(this.chartData.len),
        },
      ],
    });
  },
};
</script>

