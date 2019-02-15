<template>
  <div id="app" class="font spacing App">
    <router-view />
  </div>
</template>

<style>
  #app {
    font-family: 'Anton';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .testing123 {
    margin-bottom: 2rem;
  }

  #nav {
    padding: 30px;
  }

  .home {
    color: rgba(0, 0, 0, 0.5);
    font-size: 2.5rem;
    font-family: 'Anton';
  }


  .menu {
    display: flex;
    justify-content: space-between;
  }

  .font {
    font-family: 'Anton';
  }
</style>