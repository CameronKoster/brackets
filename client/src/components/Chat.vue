<template>
  <div>
    <div v-if="!joined" class="text-center">
      <form @submit.prevent="join">
        <div class="form-group">
          <input type="text" max="12" class="form-control input-lg text-center" placeholder="Name" v-model="name"
            required>
        </div>
        <button class="btn btn-primary btn-lg" type="submit">Join Chat</button>
      </form>
    </div>
    <div v-else>
      <div class="connected-users test-left">
        <div class="users">Connected Users</div>
        <ul>
          <li class="user" v-for="user in connectedUsers">
            {{user}}
          </li>
        </ul>
      </div>
      <div class="chat">
        <div class="row" v-for="item in messages">
          <div class="col-sm-2 text-right">
            <span class="name">{{item.user}}</span>
          </div>
          <div class="col-sm-10">
            <span class="message">{{item.message}}</span>
          </div>
        </div>
      </div>
      <div class="text-center">
        <form @submit.prevent="send">
          <div class="form-group">
            <input type="text" class="form-control input-lg text-center" placeholder="Message" v-model="message">
          </div>
          <button class="btn btn-primary btn-lg" type="submit">Send</button>
        </form>
      </div>
      <div class="text-center">
        <button class="btn btn-primary btn-lg" type="button" @click="leave">Leave Chat</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Chat',
    data: function () {
      return {
        name: '',
        message: '',
      }
    },
    computed: {
      joined() {
        return this.$store.state.chatJoined;
      },
      messages() {
        return this.$store.state.chatMessages;
      },
      connectedUsers() {
        return this.$store.state.connectedUsers;
      }
    },
    methods: {
      join() {
        this.$store.dispatch('chatJoin', { name: this.name, roomName: this.$route.params.tId })
      },
      leave() {
        this.$store.dispatch('leaveRoom', { name: this.name, roomName: this.$route.params.tId })
      },
      send() {
        this.$store.dispatch('sendMessage', { user: this.name, message: this.message, roomName: this.$route.params.tId })
        this.message = ""
      }

    },
  }
</script>
<style scoped>
  #app {
    font-family: 'Times New Roman', Times, serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscaled;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

  }

  h1,
  h2 {
    font-weight: normal;

  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;

  }

  a {
    color: #42b983
  }

  .chat {
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 10px;
    max-height: 500px;
    overflow-y: auto;
  }

  .name {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .message {
    border-radius: 5px;
    background: #E0EDFF;
    padding: 5px 12px;
    margin: 3px;
    font-size: 15px;
  }

  .row {
    margin-bottom: 5px;
  }

  .users {
    font-size: 25px;
    color: black;
  }

  .user {
    font-size: 18px;
  }
</style>