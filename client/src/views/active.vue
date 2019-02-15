<template>
  <div>
    <navbar />
    <div class="active container-fluid home">
      <singleElimination v-if="tournament.style == 'Single-Elimination'" />
      <roundRobin v-if="tournament.style == 'Round-Robin'" />
      <activeComponent class="row"></activeComponent>
    </div>
    <chat />
  </div>
</template>

<script>
  import navbar from "@/components/navbar"
  import activeComponent from "@/components/activeComponent"
  import roundRobin from "@/components/roundRobin"
  import roundRobinSplit from "@/components/roundRobinSplit"
  import singleElimination from "@/components/singleElimination"
  import Chat from "@/components/Chat"

  export default {
    name: 'active',
    data() {
      return {

      }
    },
    mounted() {
      this.$store.dispatch("getSchedule", this.$route.params.tournamentId)
    },
    computed: {
      tournament() {
        return this.$store.state.tournament
      },
      schedule() {
        return this.$store.state.tournament
      }
    },
    methods: {},
    components: {
      activeComponent,
      roundRobin,
      roundRobinSplit,
      singleElimination,
      navbar,
      Chat
    },
    props: [],
  }

</script>

<style>
  .card-header {
    width: 100vw;
  }
</style>