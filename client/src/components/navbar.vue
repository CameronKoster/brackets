<template>
  <div class="testing123 navi">
    <nav class="navbar nav-back">
      <button class="navbar-toggler navbar-brand nav-button custom-toggler" type="button" data-toggle="collapse"
        data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <h1 class="navbar-brand">[Brackets]</h1>
    </nav>
    <div class="pos-f-t">
      <div class="collapse" id="navbarToggleExternalContent">
        <div class="drop-back p-4">
          <ul class="navbar-nav mt-2 mt-lg-0 menu">
            <router-link class="home-font" data-toggle="collapse" data-target="#navbarToggleExternalContent" to="/home">Home</router-link>
            <router-link class="home-font" data-toggle="collapse" data-target="#navbarToggleExternalContent" to="/profile">Profile</router-link>
            <router-link class="home-font" data-toggle="collapse" data-target="#navbarToggleExternalContent" to="/about">About</router-link>
            <router-link class="home-font" data-toggle="collapse" data-target="#navbarToggleExternalContent" to="/create">Create</router-link>
            <router-link class="home-font" data-toggle="collapse" data-target="#navbarToggleExternalContent" :to="{name: 'join'}">Join</router-link>
            <!-- <router-link class="home font" data-toggle="collapse" data-target="#navbarToggleExternalContent" to="/active">Active</router-link> -->
            <!-- <router-link class="home-font" data-toggle="collapse" data-target="#navbarToggleExternalContent" to="/test">Test
              Bracket</router-link>
            <router-link class="home-font" data-toggle="collapse" data-target="#navbarToggleExternalContent" to="/bracket">
              [Bracket]</router-link> -->
            <router-link @click.native='logout()' class="home-font" data-toggle="collapse" data-target="#navbarToggleExternalContent"
              to="/login">Logout</router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'navbar',
    data() {
      return {

      }
    },
    computed: {},
    methods: {
      logout() {
        // debugger
        this.$store.dispatch('logout')
      }
    },
    components: {},
    props: [],
  }
</script>

<style>
  .nav-button {
    /* background-color: green; */
    transition: 0.3s;
  }

  .home-font {
    font-size: 26px;
  }

  .navi a {
    color: white;
  }

  .navi .navbar-toggler {
    outline: 1px solid white;
  }

  .custom-toggler .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
  }

  .nav-button:hover {
    background-color: #1ddab4;
    /* box-shadow: 10px 10px black;
    transform: scale(.95); */
  }

  .drop-back {
    background-color: black;
  }

  .nav-back {
    background-color: black;
  }

  .lines {
    color: black;
  }

  .navbar-brand {
    color: white;
    font-size: 28px;
  }
</style>