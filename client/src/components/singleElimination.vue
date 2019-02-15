<template>
  <div class="container-fluid">
    <u class="mb-1 titles">Competitors</u>
    <div class="row">
      <div v-for="entry in schedule" class="card competitors col-2 mb-3">
        <h2 class="card-title mt-1">{{entry.name}}</h2>
        <!-- <h4>W-L</h4> -->
        <h4 class="card-text"> Wins: {{entry.winMatches.length}}</h4>
        <h4>Losses: {{entry.lossMatches.length}}</h4>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'singleElimination',
    computed: {
      schedule() {
        return this.$store.state.schedule
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
      },


    },

  }

</script>

<style scoped>
  .competitors {
    padding-left: 30px;
    transition: .3s linear;
    box-shadow: 1px 2px black;
    border-radius: 5px 5px;
    border-color: black;
  }

  .competitors:hover {
    box-shadow: 4px 4px black;
    transform: scale(1.02);
  }
</style>