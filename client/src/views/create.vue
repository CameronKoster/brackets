<template>
  <div>
    <navbar />
    <div class="create home">
      <div class="containter-fluid">
        <form @submit.prevent="addTournament">
          <div class="form-group row">
            <div class="col-12">
              <label class="col-6 required name" for="title">Bracket Name: </label>
              <input v-model="newTournament.title" class="col-6" type="text" placeholder="Ex: MensBasketball2019" name="title">
            </div>
          </div>
          <div class="form-group row">
            <div class="col-12">
              <label class="col-6 required" for="description">Bracket Description: </label>
              <input v-model="newTournament.description" class="col-6" type="field" placeholder="Ex: Competitive 5-on-5 Men's League"
                name="description">
            </div>
          </div>
          <div class="form-group row">
            <div class="dropdown col-12 d-flex required">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                {{newTournament.style}}
                <!--Need to rename this^^^-->
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <h4 @click="setTournamentType('Single-Elimitation')" class="dropdown-item">Single-Elimination</h4>
                <h4 @click="setTournamentType('Double-Elimination')" class="dropdown-item">Double-Elimination</h4>
                <h4 @click="setTournamentType('Round-Robin')" class="dropdown-item">Round-Robin</h4>
                <h4 @click="setTournamentType('Round-Robin-Split')" class="dropdown-item">Round-Robin-Split</h4>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-12">
              <label class="col-6 required" for="title">Entry Code: </label>
              <input class="col-6" v-model="newTournament.entrycode" type="text" placeholder="Ex: EntryCode5">
            </div>
          </div>
          <button type="submit">Create Bracket</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import navbar from "@/components/navbar"
  export default {
    name: 'create',
    data() {
      return {
        newTournament: {
          title: '',
          description: '',
          style: 'Bracket Type',
          numberOfEntries: 0,
          entrycode: ''
        }

      }
    },
    computed: {},
    methods: {
      addTournament() {
        this.$store.dispatch("addTournament", this.newTournament)
      },
      setTournamentType(str) {
        this.newTournament.style = str
      }
    },
    components: {
      navbar
    },
    props: [],
  }

</script>

<style scoped>
  label {
    font-size: 1.75rem;
    color: black;
  }

  .dropdown {
    justify-content: center;
  }

  input {
    font-size: 1.25rem;
    margin-left: 10px;
  }

  .btn {
    font-size: 1.54rem;
    font-weight: 300;
    /* outline: 2px solid lightgrey; */
  }


  .required {
    /* content: " *";
    color: red; */
    color: black;
    font-size: 35px;
  }
</style>