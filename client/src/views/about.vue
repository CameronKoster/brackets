<template>
  <div>
    <navbar />
    <div class="about home">
      <div class="jumbotron">
        <h1 class="display-3 ">About</h1>
        <h4>[Brackets] is an interactive application that is built to allow easy organization, management, and
          administration of tournaments and league seasons. It allows you to build out a bracket for all your
          tournaments, from a single-night videogame tournament among friends to a 6- month long softball league. </h4>
      </div>
    </div>
  </div>
</template>

<script>
  import navbar from "@/components/navbar"
  export default {
    name: 'about',
    data() {
      return {

      }
    },
    computed: {},
    methods: {},
    components: {
      navbar
    },
    props: [],
  }

</script>

<style scoped>
  .jumbotron {
    background-color: white;
  }

  h4 {
    font-size: 28px;
  }
</style>