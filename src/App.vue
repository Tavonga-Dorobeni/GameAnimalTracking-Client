<template>
  <router-view />
</template>

<script>

export default {

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  methods: {
    Cron(){
      this.$store.dispatch('getAllAnimalLocations')
      this.$emitter.emit("CronJob", {})
    }
  },

  mounted() {
    // setInterval(
    //   this.Cron, 5000
    // )
  }
};
</script>
<style></style>
