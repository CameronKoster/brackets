import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import io from 'socket.io-client'
let socket = {}

let baseUrl = '//localhost:3000/'



let auth = Axios.create({
  baseURL: baseUrl + "auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: baseUrl + "api/",
  timeout: 3000,
  withCredentials: true
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chatJoined: false,
    chatMessages: [],
    connectedUsers: [],
    chatName: {},
    profiles: [],
    user: {},
    schedule: {},
    tournament: {},
    testTournament: {
      entries: ["player 1", "player 2", "player 3", "player 4", "player 5", "player 6", "player 7", "player 8", "player 9", "player 10", "player 11", "player 12", "player 13", "player 14", "player 15", "player 16", "player 17"]
    },
    entry: {},
    entries: [],
    tournaments: [],
    bracketArray: [],
    archived: [],
    ownedTournaments: [],
  },
  mutations: {
    //tournament chat mutations
    //#region 
    setConnectedUsers(state, payload) {
      state.connectedUsers = payload
    },
    setJoined(state, payload) {
      state.chatJoined = true
      state.chatName = payload
    },
    newChatUser(state, payload) {
      state.connectedUsers.push(payload.name)
    },
    userLeft(state, payload) {
      let i = state.connectedUsers.findIndex(user => {
        return user == payload.name
      })
      state.connectedUsers.splice(i, 1)
    },
    addMessage(state, payload) {
      state.chatMessages.push(payload)
    },
    leave(state) {
      state.chatJoined = false
      state.chatName = ''
      state.chatMessages = []
      state.connectedUsers = []

    },
    //#endregion
    //Auth mutations
    //#region 
    setUser(state, user) {
      state.user = user
      // console.log(user)
    },
    //#endregion
    //set tournament mutations
    //#region 
    setTournament(state, tournament) {
      state.tournament = tournament
    },
    setTournamentById(state, tournament) {
      state.tournament = tournament
    },
    setTournaments2(state, tournaments) {
      state.tournaments = tournaments
    },
    //#endregion
    //Entry mutations
    //#region 
    setEntry(state, entry) {
      // debugger
      state.entry = entry
      // console.log(entry)
    },
    //#endregion
    //misc mutations
    //#region 
    setProfiles(state, profiles) {
      state.profiles = profiles
    },
    setBracketArray(state, bracketArray) {
      state.bracketArray = bracketArray
    },
    setSchedule(state, schedule) {
      state.schedule = schedule
      console.log
    },
    setArchive(state, archive) {
      state.archived.push(archive)

    },
    setOwnedTournaments(state, owned) {
      // debugger
      state.ownedTournaments = owned
    }

  },
  //#endregion
  actions: {
    //Tournament chat actions
    //#region 
    chatJoin({ commit, dispatch }, payload) {
      commit('setJoined', payload);
      dispatch('socket', payload);
    },
    socket({ commit, dispatch }, payload) {
      //establish connection with socket
      socket = io('//localhost:3000')

      //register all listeners
      socket.on('CONNECTED', data => {

        console.log('Connected to socket')
        //connect to room
        socket.emit('join', { name: payload.name, room: payload.roomName })
      })
      socket.on('joinedRoom', data => {
        commit('setConnectedUsers', data.connectedUsers)
      })
      socket.on('newChatUser', data => {
        commit('newChatUser', data)
      })
      socket.on('left', data => {
        console.log('user left', data)
        commit('userLeft', data)
      })
      socket.on('newMessage', data => {
        commit('addMessage', data)
      })
    },
    sendMessage({ commit, dispatch }, payload) {
      socket.emit('message', payload)
    },
    leaveRoom({ commit, dispatch }, payload) {
      socket.emit('leave', payload)
      socket.close()
      commit('leave')
    },
    //#endregion
    //auth actions
    //#region 
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          dispatch("getOwnedTournaments", res.data._id)
          dispatch("getTournaments2", res.data._id)
          router.push({ name: 'home' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          dispatch("getOwnedTournaments", res.data._id)
          dispatch("getTournaments2", res.data._id)
          // router.push({ name: 'home' })
        })
        .catch(() => { router.push({ name: 'login' }) })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          dispatch("getOwnedTournaments", res.data._id)
          dispatch("getTournaments2", res.data._id)
          router.push({ name: 'home' })
        })
    },
    logout({ commit, dispatch }) {
      auth.delete('logout')
        .then(res => {
          commit('setUser', res.data)
        })
      router.push({ name: 'login' })
    },
    //#endregion
    //tournaments actions
    //#region 
    // Get all tournaments
    getTournaments({ commit, dispatch }) {
      api.get('tournament/')
        .then(res => {
          commit('setTournament', res.data)
        })
    },
    //get tournament by a tournament id
    getTournamentById({ commit, dispatch }, id) {
      // debugger
      api.get('tournament/' + id)
        .then(res => {
          commit('setTournamentById', res.data)
        })
    },
    //get tournaments by user
    getTournaments2({ commit, dispatch }, uid) {
      // debugger
      api.get('entry/' + uid)
        .then(res => {
          // debugger
          dispatch('getTournament', res.data)
        })
    },
    //get tournaments id's by owner  (user id)
    getOwnedTournaments({ commit, dispatch }, uid) {
      // debugger
      api.get('tournament/' + uid + "/owner")
        .then(res => {
          // debugger
          dispatch('getOwnedTournaments2', res.data)
        })
    },
    // getTournament({ commit, dispatch }, tournamentId) {
    //   api.get('tournament/' + tournamentId)
    //     .then(res => {
    //       commit('setTournament', res.data)
    //     })
    // },

    //turn tournament ids into tournament objects for OWNED tournaments
    getOwnedTournaments2({ commit, dispatch }, tournamentIds) {
      // debugger
      let output = []
      for (let i = 0; i < tournamentIds.length; i++) {
        api.get('tournament/' + tournamentIds[i])
          .then(res => {
            output.push(res.data)
          })
      }
      // debugger
      commit('setOwnedTournaments', output)
    },
    //turn tournament ids into tournament objects for PARTICIPATING tournaments
    getTournament({ commit, dispatch }, tournamentIds) {
      // debugger
      let output = []
      for (let i = 0; i < tournamentIds.length; i++) {
        api.get('tournament/' + tournamentIds[i])
          .then(res => {
            output.push(res.data)
          })
      }
      commit('setTournaments2', output)
    },
    //add tournament
    addTournament({ commit, dispatch }, tournamentData) {
      // debugger
      api.post('tournament', tournamentData)
        .then(tournament => {
          router.push({ name: 'bracket', params: { tId: tournament.data._id } })
          // debugger
          dispatch('getOwnedTournaments', tournament.data.owner)
        })
    },
    //delete tournament
    deleteTournament({ commit, dispatch }, tournamentId) {
      api.delete('tournament/' + tournamentId)
        .then(res => {
          router.push({ name: 'home' })
          dispatch('getTournament')
        })
    },
    editTournamentowner({ commit, dispatch }, tournamentId) {
      api.put('tournament/' + tournamentId + '/userId')
        .then(res => {
          dispatch('getTournament')
        })
    },
    editTournament({ commit, dispatch }, payload) {
      api.put('tournament/' + payload)
        .then(res => {
          dispatch('getTournaments2')
        })
    },
    getTournamentByEntryCode({ commit, dispatch }, entryCode) {
      // debugger
      api.get('tournament/join/' + entryCode)
        .then(tournament => {
          router.push({ name: 'join', params: { tournamentId: tournament.data._id } })
          commit("setTournament", tournament.data)
        })
    },
    //#endregion
    //Entry actions
    //#region 
    //update record for round robin
    updateRecord({ commit, dispatch }, payload) {
      api.put(`entry/${payload.Winner._id}`, payload.Winner)
      api.put(`entry/${payload.Loser._id}`, payload.Loser)
    },
    //for adding guests
    addNewOwnerEntry({ commit, dispatch }, newEntry) {
      api.post('entry/ownerEntry', newEntry)
        .then(res => {
          commit('setEntry, res.data')
        })
    },
    //create an entry, adds a tourney id to that entry
    createEntry({ commit, dispatch }, newEntry) {
      api.post('entry/', newEntry)
        .then(res => {
          //getEntries doesnt exist in this version of this file
          // dispatch('getEntries', newEntry._id)
          commit('setEntry', res.data)
          router.push({ name: 'bracket', params: { tournamentId: res.data._id } })
        })
    },
    //#endregion
    //misc actions
    //#region 
    getAllProfiles({ commit, dispatch }) {
      api.get('entry/')
        .then(res => {
          commit('setProfiles', res.data)
        })
    },
    getSchedule({ commit, dispatch }, tournamentId) {
      // debugger
      api.get('tournament/' + tournamentId + '/entries')
        .then(res => {
          // debugger
          commit("setSchedule", res.data)
        })
    },
    //set tournament to active or inactive
    archiveTournament({ commit, dispatch }, tournamentId) {
      api.put('tournament/' + tournamentId + '/archive')
        .then(res => {
          commit('setArchive', res.data)
          router.push({ name: 'profile' })

        })
    },
    updateEntry({ commit }, entry) {
      api.put(`entry/${entry._id}`, entry)
    },

    addBio({ commit, dispatch }, bio) {
      api.put(`profile/`)
    },

    profilePic({ commit, dispatch }, payload) {
      // debugger
      api.put(`profile/${payload.userId}`, payload)
        .then(res => {
          dispatch('authenticate')
        })
    },
    addLoserBracket({ commit, dispatch }, payload) {
      api.put(`tournament`)
    },

    //#endregion



    //Treant actions
    //#region 



    //testing tourney generation
    //finding the sweetSpot 
    // calcPreGames({ commit, dispatch }, payload) {
    //   for (let i = 0; i < payload.sweetSpots.length; i++) {
    //     if (payload.sweetSpots[i] > payload.entries) {
    //       return payload.sweetSpots[i - 1]
    //     }
    //   }
    // },

    //making the tree
    buildTree({ commit, dispatch }, payload) {
      let arr = payload.entries
      let sweetSpot = 0
      function calcPreGames() {
        for (let i = 0; i < payload.sweetSpots.length; i++) {
          console.log(payload.sweetSpots[i])
          if (payload.sweetSpots[i] > payload.entries.length) {
            return sweetSpot = payload.sweetSpots[i - 1]
          }
        }
      }
      calcPreGames()
      let root = {
        text: { name: "winner", title: '\xa0' },
        HTMLid: 'node-WINNER'
      }
      let preGamesNeeded = arr.length - sweetSpot
      let tree = []

      let competitors = arr.length - preGamesNeeded
      let i = 1
      let buyInstance = 0
      while (competitors > 1) {
        let round = []
        tree.push(buildRound(competitors, round, i))
        competitors = round.length / 2
        i++
      }

      function assignParents() {
        tree.push([root])
        tree.reverse()
        let nextRound = []
        for (let j = tree.length - 1; j > 0; j--) {
          const currRound = tree[j];
          nextRound = tree[j - 1]

          let pi = 0
          for (let z = 0; z < currRound.length; z += 2) {
            let currentP = nextRound[pi]
            const entry1 = currRound[z];
            const entry2 = currRound[z + 1];
            entry1.parent = currentP
            if (entry2) {
              entry2.parent = currentP
            }
            pi++
          }
        }
      }
      assignParents()

      function assignPreGames() {
        let preGameCompetitors = []
        for (let pg = 1; pg <= preGamesNeeded; pg++) {
          preGameCompetitors.push({ text: { name: "", title: '\xa0' } }, { text: { name: "", title: '\xa0' } })
        }
        let parentCount = 0
        for (let i = 0; i < preGameCompetitors.length; i += 2) {
          preGameCompetitors[i].parent = tree[tree.length - 1][parentCount]
          preGameCompetitors[i + 1].parent = tree[tree.length - 1][parentCount]
          parentCount++
        }
        tree.push(preGameCompetitors)
      }
      assignPreGames()

      function buildRound(competitors, round, roundNum) {
        for (var i = 0; i < competitors; i++) {
          let node = {
            text: { name: "", title: '\xa0' },
            HTMLid: `node-${roundNum}-${i + 1}`,
          }
          round.push(node)
        }
        return round
      }

      let bracketArray = [].concat(...tree)

      for (let b = 0; b < arr.length; b++) {
        const person = arr[b];
        bracketArray[(bracketArray.length - 1) - b].text.name = person.name
        bracketArray[(bracketArray.length - 1) - b]._id = person._id
        bracketArray[(bracketArray.length - 1) - b].text["data-pid"] = person._id
        person.winMatches.forEach(v => {
          let node = bracketArray.find(n => n.HTMLid == v)
          if (node) {
            node.text["data-pid"] = person._id
            node.text.name = `${person.name} W: ${person.winMatches.length}`
            console.log(node.HTMLid, person.name, person._id)
          }
        })
      }
      commit('setBracketArray', bracketArray)
    }


    // router.push({ name: 'join', params: { entryCode: entryCode } })
  }
})
//       //testing tourney generation
//       //finding the sweetSpot 
//       calcPreGames({ commit, dispatch }, payload) {
//       debugger
//       for (let i = 0; i < payload.sweetSpots.length; i++) {
//         if (payload.sweetSpots[i] > payload.entries) {
//           return payload.sweetSpots[i - 1]
//         }
//       }
//     },


// //     //making the tree
// //     buildTree({ commit, dispatch }, arr) {
// //       let root = { text: { name: "winner" } }
// //       let preGamesNeeded = arr.length - dispatch('calcPreGames'(sweetSpots, arr.length))
// //       let tree = []

// //       let competitors = arr.length - preGamesNeeded
// //       let i = 1
// //       let buyInstance = 0
// //       while (competitors > 1) {
// //         let round = []
// //         tree.push(buildRound(competitors, round, i))
// //         competitors = round.length / 2
// //         i++
// //       }

// //       function assignParents() {
// //         tree.push([root])
// //         tree.reverse()
// //         console.log(tree)
// //         debugger
// //         let nextRound = []
// //         for (let j = tree.length - 1; j > 0; j--) {
// //           const currRound = tree[j];
// //           nextRound = tree[j - 1]

// //           let pi = 0
// //           for (let z = 0; z < currRound.length; z += 2) {
// //             let currentP = nextRound[pi]
// //             const entry1 = currRound[z];
// //             const entry2 = currRound[z + 1];
// //             entry1.parent = currentP
// //             if (entry2) {
// //               entry2.parent = currentP
// //             }
// //             pi++
// //           }
// //         }
// //       }
// //       assignParents()

// //       function assignPreGames() {
// //         let preGames = []
// //         for (let pg = 1; pg <= preGamesNeeded; pg++) {
// //           preGames.push({ text: { name: "pregame " + pg } }, { text: { name: "pregame " + pg } })
// //         }
// //         let parentCount = 0
// //         for (let i = 0; i < preGames.length; i += 2) {
// //           preGames[i].parent = tree[tree.length - 1][parentCount]
// //           preGames[i + 1].parent = tree[tree.length - 1][parentCount]
// //           parentCount++
// //         }
// //         tree.push(preGames)
// //       }
// //       assignPreGames()

// //       function buildRound(competitors, round, roundNum) {
// //         for (var i = 0; i < competitors; i++) {
// //           round.push({ text: { name: "match " + (i + 1) + ' round ' + roundNum } })
// //         }
// //         return round
// //       }

// //       let bracketArray = [].concat(...tree)

// //       for (let b = 0; b < arr.length; b++) {
// //         const person = arr[b];
// //         bracketArray[(bracketArray.length - 1) - b].text.name = person
// //       }
// //       return { tree, bracketArray }
// //     }


// //     // router.push({ name: 'join', params: { entryCode: entryCode } })
// // )}
//#endregion