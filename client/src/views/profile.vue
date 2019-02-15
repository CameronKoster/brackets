<template>
  <div>
    <navbar />
    <div class="profile container-fluid">
      <profileComponent></profileComponent>
      <historyComponent></historyComponent>
    </div>
  </div>
</template>

<script>
  import navbar from "@/components/navbar"
  import profileComponent from "@/components/profileComponent"
  import historyComponent from "@/components/historyComponent"
  export default {
    name: 'profile',
    data() {
      return {

      }
    },
    watch: {
      user: function (val) {
        this.$store.dispatch("getTournaments2", val._id)
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {},
    components: {
      profileComponent,
      navbar,
      historyComponent
    },
    props: [],
  }

</script>

<style>


</style>