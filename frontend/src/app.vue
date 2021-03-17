<template>
  <div id="app" class="main-app">
    <main-header />
    <router-view/>
  </div>
</template>

<script>

import mainHeader from './cmps/main-header'

export default {
  components: {
    mainHeader
  }
}
</script>

