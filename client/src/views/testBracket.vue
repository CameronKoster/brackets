<template>
  <div>
    <navbar />
    <div class="testBracket">
      <div id="treeMe"></div>
      <button type="button" class="btn btn-outline-primary" @click="buildTree">Generate Bracket</button>
    </div>
  </div>
</template>

<script>
  import navbar from "@/components/navbar"
  require('../assets/treant/Treant.js')
  export default {
    name: 'testBracket',
    props: ['entries'],
    data() {
      return {
        sweetSpots: [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
        config2: {
          container: "#treeMe",
          levelSeparation: 20,
          siblingSeparation: 15,
          subTeeSeparation: 15,
          rootOrientation: "EAST",
          node: {
            HTMLclass: "tennis-draw",
            drawLineThrough: true
          },
          connectors: {
            type: "step",
            style: {
              "stroke-width": 2,
              "stroke": "#ccc"
            }
          }
        },
        theBracket: {},
        treant: {},
        chartData: [],
        // entriesComputed: 0
      }
    },
    computed: {
      getEntries() {
        // console.log(this.$store.state.schedule)

        // this.entriesComputed++
        return this.$store.state.schedule
      },
      bracketArray() {
        return this.$store.state.bracketArray || []
      },
      getUser() {
        return this.$store.state.user
      }
    },
    methods: {
      buildTree() {
        this.$store.dispatch("buildTree", { entries: this.getEntries, sweetSpots: this.sweetSpots })
        this.chartData = [this.config2, ...this.bracketArray]
        this.treant = new window.Treant(this.chartData, this.handleNodeClick)
        // this.treant = new Treant.Treant(config)
        console.log(this.treant)
      },
      bracketMaker(bracketA) {
        // return new Treant([this.config2, ...bracketA])
      },
      handleNodeClick(e) {
        document.querySelectorAll("div[id^='node-']").forEach(node => {
          node.addEventListener('click', () => {
            console.log('this context', this)
            console.log("NODE ID", node.id)

            let bracketNode = this.bracketArray.find(n => n.HTMLid == node.id)

            var p1 = this.getEntries.find(p => p._id == bracketNode.children[0].text["data-pid"])
            var p2 = this.getEntries.find(p => p._id == bracketNode.children[1].text["data-pid"])
            if (!p1 || !p2) { return }
            if (bracketNode.children) {
              let matchId = bracketNode.HTMLid
              if (bracketNode.text["data-pid"] == p2._id) {
                let i = p2.winMatches.indexOf(matchId)
                let j = p1.lossMatches.indexOf(matchId)
                if (i != -1) {
                  p2.winMatches.splice(i, p2.winMatches.length)
                  p1.lossMatches.splice(j, p1.lossMatches.length)
                }
                if (!p1.winMatches.includes(matchId)) {
                  p1.winMatches.push(matchId)
                  p2.lossMatches.push(matchId)
                  //new
                  // this.$store.dispatch("addLoserBracket", { userId: this.getUser,  })
                }
                bracketNode.text["data-pid"] = p1._id
                bracketNode.text.name = `${p1.name} W: ${p1.winMatches.length} L: ${p1.lossMatches.length}`
              } else {
                let i = p1.winMatches.indexOf(matchId)
                let j = p2.lossMatches.indexOf(matchId)

                if (i != -1) {
                  p1.winMatches.splice(i, p1.winMatches.length)
                  p2.lossMatches.splice(j, p2.lossMatches.length)
                }
                if (!p2.winMatches.includes(matchId)) {
                  p2.winMatches.push(matchId)
                  p1.lossMatches.push(matchId)
                }
                bracketNode.text["data-pid"] = p2._id
                bracketNode.text.name = `${p2.name} W: ${p2.winMatches.length} L: ${p2.lossMatches.length}`
              }
              this.$store.dispatch("updateEntry", p1);
              this.$store.dispatch("updateEntry", p2);
              new Treant(this.chartData, this.handleNodeClick)
            }
          })
        })
      }
    },
    components: {
      navbar
      // Treant
    },
    props: [],
    watch: {
      // entriesComputed: function () {
      //   this.buildTree()
      // }
    },
    mounted() {

      if (!this.getEntries.length) {
        this.$store.dispatch("getSchedule", this.$route.params.tId)
      }
    },
    beforeDestroy() {
    }

  }
</script>

<style>


</style>