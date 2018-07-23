<template>
  <div class="hello">
    <h2>Load</h2>
    <h3>{{ item.title }}</h3>
    <p>{{ item.body }}</p>
    <router-link to="/">Home</router-link>
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    await store.dispatch('fetchItems');
  },
  computed: {
    item() {
      const [item] = this.$store.state.items.slice(0, 1);
      return item;
    }
  }
};
</script>

<style>

</style>
