<template>
  <div>
    <h1>Home</h1>
    <div v-for="item in items" :key="item.id">
      <h2>{{ item.title }}</h2>
      <p>{{ item.body }}</p>
    </div>
    <router-link to="/load">Load</router-link>
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    await store.dispatch('fetchItems');
    console.log('Server side rendered');
  },
  computed: {
    items() {
      return this.$store.state.items.slice(0, 3);
    },
  },
  beforeMount() {
    console.log('Client side rendered');
  },
  mounted() {
    console.log('Client side rendered 2');
  },
};
</script>

<style>
</style>
