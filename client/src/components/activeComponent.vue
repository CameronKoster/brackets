<template>
  <div class="active-component">

    <!-- v-for="tournament in tournaments" -->
    <div class="card border-dark mb-3 col-12 tournamentCard">
      <div class="titles name"> Name:</div>
      <div class="tournamentTitle">
        {{tournament.title}}
      </div>
      <div class="card-body">
        <div class="titles type"> Type:</div>
        <div class="card-title mt-3">{{tournament.style}}</div>
        <div class="titles desc"> Description:</div>
        <p class="card-text mt-2">{{tournament.description}}</p>
        <router-link :to="{name: 'testBracket', params: {tId: tournament._id}}"><button v-if="tournament.style == 'Single-Elimitation' || tournament.style == 'Double-Elimination'"
            type="button" class="btn btn-outline-primary view">View
            Bracket</button></router-link>
      </div>
      <button type="button" class="btn btn-outline-primary tournamentButtons" v-if="user._id == tournament.owner"
        @click="deleteTournament">Delete Bracket</button>
      <button type="button" class="btn btn-outline-primary tournamentButtons" @click="archive" v-if="user._id == tournament.owner && !tournament.archived">Archive
        Bracket</button>
    </div>
    <div class="dropdown">
      <!-- <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
        Change Tournament Name
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <form @submit.prevent="editTournament">
          <input type="text" v-model="editTournament.title" placeholder="New Tournament Name"></form>
      </div> -->
    </div>
  </div>
</template>
<script>
  export default {
    name: 'active-component',
    data() {
      return {

      }
    },
    computed: {
      tournament() {
        console.log(this.$store.state.tournament)
        return this.$store.state.tournament
      },
      user() {
        return this.$store.state.user
      },
      getArchive() {
        console.log(this.$store.state.archived)
        return this.$store.state.archived
      }
    },
    methods: {
      deleteTournament() {

        this.$store.dispatch('deleteTournament', this.tournament._id)

      },
      editTournament() {
        this.$store.dispatch('editTournament', { tournament: this.title })
      },
      archive() {
        this.$store.dispatch('archiveTournament', this.tournament._id)
      }
    },
    components: {},
    props: [],
    mounted() {
      // debugger
    }
  }

</script>

<style>
  .tournamentCard {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tournamentTitle {
    font-size: 25px;
  }

  .card-title {
    font-size: 25px;
  }

  .tournamentButtons {
    margin-bottom: 8px;
    font-size: 15px;
  }

  .titles {
    font-size: 40px;
    color: black;
  }

  .card-text {
    font-size: 25px;
    margin-bottom: 30px;
  }

  .view {
    margin-bottom: -11px;
  }

  .name {
    margin-bottom: -3px;
  }

  .desc {
    margin-bottom: -10px;
  }

  .type {
    margin-top: -10px;
    margin-bottom: -13px;
  }
</style>