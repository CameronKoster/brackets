<template>
  <div class="team-entry">
    <!-- team entry -->
    <form @submit.prevent="createEntry" v-if="$route.params.tournamentId">
      <div class="form-group">
        <label for="playersearch">Search For Players:</label>
        <input placeholder="Add Player" name="playersearch" type="text" v-model="playerName">
      </div>
      <div v-for="player in playersToAdd">
        <p @click="addPlayer(player)">{{player.name}}</p>
      </div>
      <div class="form-group">
        <label for="teamname">Team Name:</label>
        <input placeholder="Team Name" type="text" v-model="newEntry.name">
      </div>
      <h3>Your Team Members</h3>
      <div v-if="playerName.length > 0">
        <p v-for="member in newEntry.members">{{member.name}}</p>
      </div>
      <button type="submit">Submit</button>
    </form>
    <div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'team',
    data() {
      return {
        newEntry: {
          name: "",
          tournamentId: this.$route.params.tournamentId,
          members: []
        },
        playerName: ""
      }
    },
    computed: {
      profiles() {
        return this.$store.state.profiles
      },
      playersToAdd() {
        var keyword = this.playerName
        var temp = this.profiles
        var players = []
        for (var i = 0; i < temp.length; i++) {
          var player = temp[i]
          var value = player.name.toLowerCase()
          var term = keyword.toLowerCase()
          if (value.indexOf(term) !== -1 && players.length < 20) {
            players.push(player)
          }
        }
        return players
      }
    },
    methods: {
      addPlayer(player) {
        this.newEntry.members.push(player)
        this.playerName = ""
      },
      createEntry() {
        this.$store.dispatch('createEntry', this.newEntry)
      }
    }
  }

</script>

<style>


</style>