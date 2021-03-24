
<script>
import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  props: {
    chartData: {
      type: Array,
    },
    label: {
      type: String,
    },
    Option: {
      type: Object,
    },
  },

  computed:{
    title(){
       return this.chartData.map((group) => {
      return group.title
      });
    },
      length(){
        return this.chartData.map((group) => {
      return group.length
      });
    }
  },
  mounted() {
    this.renderChart({
      label: this.title,
      datasets: [
        {
          backgroundColor: ['#8790b9', '#7c4d7a', 'f9b9bb', '#f5d993'],
          data: this.length,
        },
      ],
    });
  },
};
</script>

