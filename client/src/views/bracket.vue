<template>
  <div>
    <navbar />
    <div class="container-fluid">
      <activeComponent class="row"></activeComponent>
      <singleElimination v-if="tournament.style == 'Single-Elimitation'"></singleElimination>
      <roundRobin v-if="tournament.style == 'Round-Robin'"></roundRobin>
      <ownerEntries v-if="tournament.owner == user._id"></ownerEntries>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 Teams">
          </div>
        </div>
      </div>
      <!-- <playerPool> </playerPool> -->
    </div>
    <Chat />
  </div>
</template>

<script>
  import ownerEntries from "@/components/ownerEntries"
  import navbar from "@/components/navbar"
  import playerPool from '@/components/playerPool'
  import activeComponent from "@/components/activeComponent"
  import roundRobin from "@/components/roundRobin"
  import roundRobinSplit from "@/components/roundRobinSplit"
  import singleElimination from "@/components/singleElimination"
  import Chat from "@/components/Chat"

  export default {
    name: 'bracket',
    data() {
      return {

      }
    },
    components: {
      playerPool,
      navbar,
      activeComponent,
      roundRobin,
      roundRobinSplit,
      singleElimination,
      Chat,
      ownerEntries
    },
    computed: {
      tournament() {
        return this.$store.state.tournament
      },
      schedule() {
        return this.$store.state.schedule
      },
      user() {
        return this.$store.state.user
      },
    },
    mounted() {
      if (this.$store.state.tournament) {
        this.$store.dispatch("getTournamentById", this.$route.params.tId)
        // debugger
        this.$store.dispatch("getSchedule", this.$route.params.tId)
      }
    },
  }
</script>

<style>
</style>