<template>
  <div>
    <navbar />
    <div class="testBracket">
      <div id="treeMe"></div>
      <button type="button" class="btn btn-outline-primary" @click="buildTree">Primary</button>
    </div>
  </div>
</template>

<script>
  import navbar from "@/components/navbar"
  require('../assets/treant/Treant.js')
  export default {
    name: 'testBracket',
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
        chartData: []
      }
    },
    computed: {
      tournament() {
        return this.$store.state.testTournament.entries
      },
      tournament3() {
        return this.$store.state.testTournament33.entries
      },
      bracketArray() {
        return this.$store.state.bracketArray || []
      }
    },
    methods: {
      buildTree() {
        this.$store.dispatch("buildTree", { entries: this.tournament3, sweetSpots: this.sweetSpots })
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
            console.log(bracketNode)

            if (bracketNode.children) {
              if (bracketNode.text.name == bracketNode.children[0].text.name) {
                bracketNode.text.name = bracketNode.children[1].text.name
              } else {
                bracketNode.text.name = bracketNode.children[0].text.name
              }
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
      // bracketArray(val) {
      //   this.theBracket = this.bracketMaker(this.bracketArray)
    },
    // simple_chart_config1: [
    //   this.config2, ...this.bracketArray
    // ]
    mounted() {
      console.log("treant", Treant)
      this.$store.dispatch("getTournaments")
      console.log(this.tournament)
    }
  }

</script>

<style>


</style>