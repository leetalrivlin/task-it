<template>
  <li>
      {{activity.txt}}
  </li>
</template>

<script>
export default {
  name: 'menuActivity',
  props: {
    activity: {
      type: Object
    }
  }
};
</script>
