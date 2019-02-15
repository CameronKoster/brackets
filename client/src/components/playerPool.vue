<template>
  <div>
    <ownerEntries v-if="tournament.owner == user._id"></ownerEntries>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 Teams">
          <h1>Competitors</h1>
        </div>
      </div>
      <div class="row">
        <div v-for="entry in schedule.entries" class="card col-2">
          <h2>{{entry.name}}</h2>
          <h4>{{entry.wins}}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ownerEntries from "@/components/ownerEntries"
  export default {
    name: 'playerPool',
    computed: {
      schedule() {
        return this.$store.state.schedule
      },
      tournament() {
        return this.$store.state.tournament
      },
      user() {
        return this.$store.state.user
      }
    },
    data() {
      return {

      }
    },
    methods: {
      findEntry(match, entry) {
        var valid = false
        match.forEach(element => {
          if (element._id == entry._id) {
            valid = true
            return
          }
        })
        return valid
      }
    },
    components: {
      ownerEntries
    }
  }
</script>

<style>
  .Teams {
    display: flex;
    justify-content: center;
    font-size: 25px;
  }
</style>