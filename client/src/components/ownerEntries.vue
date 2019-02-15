<template>
  <div>
    <div class="guest">Don't want to have everyone sign up? Use Guest Entries!</div>
    <div class="form-group">
      <form @submit.prevent="addNewOwnerEntry(this.newOwnerEntry)">
        <input class="form" type="text" name="entryName" placeholder="Entry Name" v-model="this.newOwnerEntry.entryName">
        <button class="form" type="submit">Create Guest Entry</button>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name: "ownerEntries",
    data() {
      return {
        newOwnerEntry: {
          entryName: "",
          tournamentId: this.$route.params.tournamentId,
          members: []
        }
      }
    },
    methods: {
      addNewOwnerEntry(entry) {
        this.$store.dispatch("addNewOwnerEntry", entry)
      }
    }
  }
</script>

<style>
  .guest {
    font-size: 25px;
    color: black;
    margin-bottom: 8px;
    margin-top: 20px;
  }

  .form {
    font-size: 17px;
    margin-bottom: 12px;
  }
</style>