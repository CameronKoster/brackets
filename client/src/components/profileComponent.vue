<template>
  <div class="profileComponent">
    <div class="row">
      <div class="col-12 welcome">Welcome {{getUser.name}}</div>
      <div class="col-3">
        <div class="row">
          <div class="col-12"> <img :src="getUser.picture" class="profilePic"></div>
          <div class="col-6 picBtn">
            <!-- modal start -->
            <button type="button" class="btn btn-primary mt-2" data-toggle="modal" data-target="#changePic">
              Change Picture </button>
            <div class="modal" id="changePic" tabindex="-1" role="dialog">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Enter Image URL</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form @submit.prevent="profilePic">
                      <input type="text-field" v-model="profile.picture" style="width:350px">
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <input type="submit" class="btn btn-primary"></input>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <!-- modal end -->
          </div>
          <div class="col-6 bioBtn">
            <!-- modal start -->
            <button type="button" class="btn btn-primary mt-2" data-toggle="modal" data-target="#changeBio">
              Edit Bio </button>
            <div class="modal" id="changeBio" tabindex="-1" role="dialog">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Edit Bio</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form @submit.prevent="addBio">
                      <textarea name="paragraph_text" v-model="profile.bio" cols="50" rows="7"></textarea>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <input type="submit" class="btn btn-primary"></input>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- modal end -->
        <!-- <form>
              <button type="button" class="btn btn-outline-primary mt-1" @click="changePicture">Change
                Picture</button>
            </form> -->
        <!-- <div class="col-12">
            <form v-if="!getUser.bio">
              <input type="text-field">
              <button type="submit">Add Bio</button>
            </form>
            <form v-if="getUser.bio">
              <input type="text-field">
              <button type="submit">Change Bio</button>
            </form>
            {{getUser.bio}}
          </div> -->
      </div>
      <div class="col-9">
        <h3>Active Brackets</h3>
        <table v-if="getOwnedTournaments.length" class="table table-hover">
          <thead>
            <tr>
              <th style="text-align:center" class="heads" scope="col">Type</th>
              <th style="text-align:center" class="heads" scope="col">Title</th>
              <!-- <th style="text-align:center" class="heads" scope="col"># of Entrants</th> -->
              <th style="text-align:center" class="heads" scope="col">Status</th>
              <th style="text-align:center" class="heads" scope="col">Active Bracket</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="tournament in getOwnedTournaments" class="rows">
              <td>{{tournament.style}}</td>
              <td>{{tournament.title}}</td>
              <!-- <td>Column content</td> -->
              <!--this needs changed-->
              <td>{{tournament.archived ? "Finished" : "Ongoing"}}</td>
              <td>
                <router-link :to="{name: 'bracket', params: {tId: tournament._id}}"><button type="button" class="btn btn-outline-primary">View</button></router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- seperatioin -->
        <table v-if="getTournaments.length" class="table table-hover">
          <thead>

            <tr>
              <th style="text-align:center" class="words" scope="col">Type</th>
              <th style="text-align:center" class="words" scope="col">Title</th>
              <th style="text-align:center" class="words" scope="col">Status</th>
              <th style="text-align:center" class="words">Active In</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="tournament in getTournaments" class="rows">
              <td class="colors" scope="row">{{tournament.style}}</td>
              <td class="colors">{{tournament.title}}</td>
              <td class="colors">{{tournament.archived ? "Finished" : "Ongoing"}}</td>
              <td class="colors">
                <router-link :to="{name: 'bracket', params: {tId: tournament._id}}"><button type="button" class="btn btn-outline-primary">View</button></router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <ul> -->
        <!-- <li v-for="tournament in getTournaments">{{tournament.title}}</li> -->
        <!-- </ul> -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'profileComponent',
    data() {
      return {
        profile: {
          bio: "",
          picture: ""
        }
      }
    },
    // watch: {
    //   getUser: function (user) {
    //     this.$store.dispatch("getOwnedTournaments", user._id)
    //     this.$store.dispatch("getTournaments2", user._id)
    //     // debugger
    //   }
    // },
    computed: {
      getUser() {
        return this.$store.state.user
      },
      getSchedule() {
        return this.$store.state.schedule
      },
      getTournaments() {
        // debugger
        // console.log(this.$store.state.tournaments)
        return this.$store.state.tournaments
      },
      getArchive() {
        console.log(this.$store.state.archived)
        return this.$store.state.archived
      },

      getOwnedTournaments() {
        // debugger
        return this.$store.state.ownedTournaments.filter(t => !t.archived)
      }
    },
    methods: {
      changePicture() {
        let prompt = prompt("Please enter your image URL")
        this.$store.dispatch("changePicture")
      },
      archive(tournament) {
        this.$store.dispatch("archiveTournament")
      },
      addBio() {
        debugger
        this.$store.dispatch("addBio", this.profile.bio)
      },
      profilePic() {
        debugger
        this.$store.dispatch("profilePic", { picture: this.profile.picture, userId: this.getUser._id })
      }
    },
    components: {},
    props: [],
    // mounted() {
    //   if (this.getUser._id) {
    //     this.$store.dispatch("getOwnedTournaments", this.getUser._id)
    //     this.$store.dispatch("getTournaments2", this.getUser._id)
    //   }
    // }
  }

</script>

<style>
  .table {
    background-color: black;
    border: solid 2px black;

    /* display: flex; */
    /* justify-content: space-between; */
  }

  .sizing {
    font-size: .9rem;
  }

  .btn {
    font-size: 14px;
    background-color: white;
    color: black;
    border: 2px solid black;
    font-weight: 100;
    padding: 6px;
  }



  h3 {
    font-size: 30px;
  }

  .rows {
    color: black;
    background-color: white;
    /* display: flex; */
    /* justify-content: space-between; */
    align-items: center;
  }

  .picBtn {
    display: flex;
    justify-content: flex-end;
  }

  .bioBtn {
    display: flex;
    justify-content: flex-start;
  }

  .profilePic {
    max-width: 250px;
  }

  .welcome {
    font-size: 50px;
    display: flex;
    justify-content: start;
  }

  .words {
    background-color: black;
    color: white;
  }

  .colors {
    background-color: white;

  }

  .heads {
    margin-left: 15px;
    color: white;
  }
</style>