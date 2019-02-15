<template>
  <div>
    <navbar />
    <div class="login container-fluid home">
      <!-- <div class="row">
      <div class="col-12 header">
        <h4 class="mt-4">[Brackets]</h4>
      </div>
    </div> -->
      <div class="row login-info mt-5">
        <div class="col-4"></div>
        <div class="col-4">
          <form v-if="loginForm" @submit.prevent="loginUser" class="text">
            <input type="email" v-model="creds.email" placeholder="Email" style="margin-bottom: 5px" class="input"><br>
            <input type="password" v-model="creds.password" placeholder="Password" style="margin-bottom: 5px" class="input"><br>
            <div class="action" @click="loginForm = !loginForm">
              <p v-if="loginForm" class="login-text login-text-size">No account? Click here to register</p>
            </div>
            <button type="submit">Login</button>
          </form>
          <form v-else @submit.prevent="register">
            <input type="text" v-model="newUser.name" placeholder="Name">
            <input type="email" v-model="newUser.email" placeholder="Email">
            <input type="password" v-model="newUser.password" placeholder="Password">
            <p class="password">*must be 6 or more characters*</p>
            <div class="action register-text-size" @click="loginForm = !loginForm">
              <p v-if="!loginForm">Already have an account? Click here to Login</p>
            </div>
            <button class="mt-2" type="submit">Create Account</button>
          </form>
        </div>
      </div>
      <div class="col-4"></div>
    </div>
  </div>
</template>

<script>
  import navbar from "@/components/navbar"
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
    },
    components: {
      navbar
    }
  };
</script>

<style scoped>
  .home {
    color: rgba(0, 0, 0, 0.5);
    font-size: 2.5rem;
    font-family: 'Anton', sans-serif;
  }

  input {
    margin-top: 10px;
  }

  .header {
    display: flex;
    justify-content: flex-end;
    min-height: 10vh;
    background-color: #18BC9C;
    color: whitesmoke;
  }

  .password {
    font-size: 16px;
  }

  .text {
    color: black;
  }

  ::placeholder {
    /* color: black; */
    text-align: center;
  }

  p {
    color: black;
  }

  .login-text-size {
    font-size: 28px;
  }

  .register-text-size {
    font-size: 28px;
  }
</style>