
<script>
import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  props: {
    chartData: {
      type: Array,
    },
  },
  mounted() {
    this.renderChart({
      labels: Object.keys(this.chartData),
      datasets: [
        {
          label: ['title' , 'group1' , 'group3' , 'group4'],
          backgroundColor: ['#8790b9', '#7c4d7a','f9b9bb' , '#f5d993'],
          data: Object.values(this.chartData),
        },
      ],
    });
  },
};
</script>

