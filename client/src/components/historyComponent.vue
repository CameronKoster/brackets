<template>
  <div class="historyComponent">
    <div class="container-fluid">
      <div class="row">
        <div class="col-3"></div>
        <div class="col-9">

          <h3>Bracket History</h3>
          <table class="table table-hover">
            <thead>

              <tr>
                <th style="text-align:center" class="header" scope="col">Type</th>
                <th style="text-align:center" class="header" scope="col">Title</th>
                <th style="text-align:center" class="header" scope="col"># of Entrants</th>
                <th style="text-align:center" class="header" scope="col">Status</th>
                <th style="text-align:center" class="header">Managed Brackets</th>

              </tr>
            </thead>
            <tbody>
              <tr v-for="tournament in archivedTournaments" class=" rows">
                <th class="colors" scope="row">{{tournament.style}}</th>
                <td class="colors">{{tournament.title}}</td>
                <td class="colors">{{tournament.entries.length}}</td>
                <td class="colors">{{tournament.archived ? "Finished" : "Ongoing"}}</td>
                <td class="colors">
                  <router-link :to="{name: 'bracket', params: {tId: tournament._id}}"><button type="button" class="btn btn-outline-primary">View</button></router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <ul>
        <li v-for="tournament in getTournaments">{{tournament.title}}</li>
      </ul> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'historyComponent',
    data() {
      return {

      }
    },
    computed: {
      archivedTournaments() {
        return this.$store.state.ownedTournaments.filter(t => t.archived)
      }
    },
    methods: {
    }
  }

</script>

<style>
  .colors {
    background-color: white;
  }

  .header {
    background-color: black;
    color: white;

  }
</style>