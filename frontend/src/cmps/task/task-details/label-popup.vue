<template>
  <section class="label-popup" @click.stop>
    <p>Labels</p>
    <ul class="clean-list flex column labels-container">
      <li
        class="flex align-center list-item"
        v-for="(color, idx) in colors"
        :key="idx"
      >
        <span @click="labelPicked(color)" :class="'bclr' + idx" :style="{ backgroundColor: color }">
            <!-- <i v-if="isLabel" class="el-icon-check"></i> -->
        </span>
        <a><i class="el-icon-edit"></i></a>
      </li>
    </ul>
  </section>
</template>

<script>
import { boardService } from '../../../services/board.service';
export default {
  name: 'labelPopup',
  data() {
    return {
      colors: [
        '#60BD4F',
        '#F2D600',
        '#ff9f1a',
        '#eb5a46',
        '#c377e0',
        '#0079bf',
      ],
    };
  },
    methods:{
        labelPicked(color){
            const emptyLabel = boardService.getEmptyLabel();
            emptyLabel.color = color;
            this.$emit('labelPicked', emptyLabel)
        }
    },
};
</script>
