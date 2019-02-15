<template>
  <div>
    <navbar />
    <div class="join home">
      <form @submit.prevent="getTournamentByEntryCode" v-if="!$route.params.tournamentId">
        <h1>Enter Your Bracket Code Below</h1>
        <input type="text" placeholder="Bracket Code" v-model="entryCode">
        <button type="submit">Submit</button>
      </form>
      <div class="jumbotron button" v-if="$route.params.tournamentId && showTeam">
        <h1 class="display-3">Team Entry</h1>
      </div>
      <div class="jumbotron button" v-if="$route.params.tournamentId && !showTeam">
        <h1 class="display-3">Single Entry</h1>
      </div>
      <single v-if="!showTeam && $route.params.tournamentId"></single>
      <team v-if="showTeam && $route.params.tournamentId"></team>
      <div v-if="$route.params.tournamentId && !showTeam">
        <p>Click here for team entry</p>
        <button type="button" class="btn btn-primary" @click="showTeam = true">Team Entry</button>
      </div>
      <div v-if="$route.params.tournamentId && showTeam">
        <p>Click here for single entry</p>
        <button type="button" class="btn btn-primary" @click="showTeam = false">Single Entry</button>
      </div>
    </div>
  </div>
</template>

<script>

  //@click="showTeam = true"
  import navbar from "@/components/navbar"
  import single from "@/components/singleEntry"
  import team from "@/components/teamEntry"
  export default {
    name: 'join',
    mounted() {
      this.$store.dispatch("getAllProfiles")
    },
    data() {
      return {
        entryCode: "",
        showTeam: false
      }
    },
    computed: {
      getUser() {
        return this.$store.state.user
      },
      // entry() {
      //   return this.$store.state.entry
      // }
    },
    methods: {

      getTournamentByEntryCode() {
        this.$store.dispatch('getTournamentByEntryCode', this.entryCode)
      }

    },
    components: {
      navbar,
      single,
      team
    },
    props: [],
  }

</script>

<style>
  .button {
    cursor: pointer;
    transition: 0.3s;
  }

  .button:hover {
    color: black
  }

  ::placeholder {
    text-align: center;
  }
</style>