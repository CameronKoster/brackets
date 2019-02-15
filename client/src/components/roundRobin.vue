<template>
  <div class="container-fluid">
    <div class="row">
      <div v-for="entry in schedule.entries" class="card">

        <div class="card-body">
          <div class="card-title w-18rem">
            <h2><u>{{entry.name}}</u></h2>
          </div>
          <div class="card-subtitle">
            <div class="row">
              <div class="col-12">
                <h6>W-</h6>
                <h6>L</h6>
              </div>
              <div class="col-12">
                <h6>{{entry.winMatches.length}}-</h6>
                <h6>{{entry.lossMatches.length}}</h6>
              </div>
            </div>
          </div>
          <div v-for="(round, key) in schedule.rounds">
            <div v-for="match in round">
              <div v-if="findEntry(match, entry)">
                {{key}}
                <h3>{{match[0].name}} vs {{match[1].name}}</h3>
                <h4>Winner: {{match[0].winMatches.indexOf(key) != -1 ? match[0].name : match[1].name}}</h4>
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    {{dropdownTitle}}
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <p @click="chooseWinner(key, match[0], match[1])">{{match[0].name}}</p>
                    <p @click="chooseWinner(key, match[1], match[0])">{{match[1].name}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>


  </div>

  </div>
</template>
<script>
  export default {
    name: 'roundRobin',
    computed: {
      schedule() {
        return this.$store.state.schedule
      }
    },
    data() {
      return {
        dropdownTitle: "Choose A Winner"
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
      },
      chooseWinner(round, winner, loser) {
        let wi = winner.winMatches.indexOf(round)
        let wil = winner.lossMatches.indexOf(round)
        if (wil != -1) {
          winner.lossMatches.splice(wil, 1)
        }
        if (wi == -1) {
          winner.winMatches.push(round)
        }

        let li = loser.lossMatches.indexOf(round)
        let liw = loser.winMatches.indexOf(round)
        if (li == -1) {
          loser.lossMatches.push(round)
        }
        if (liw != -1) {
          loser.winMatches.splice(liw, 1)
        }
        this.$store.dispatch('updateRecord', { Winner: winner, Loser: loser })
      }

    },

  }

</script>
<style scoped>
  .card {
    width: 18rem;
    flex-direction: column;
  }

  h6 {
    display: inline;
  }
</style>