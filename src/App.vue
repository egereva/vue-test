<template>
  <div id="app">
    <CounterInput v-model="counter">
      Current value of counter2 is {{ counter2 }}
      <template #warning>
        <slot name="warning"></slot>
      </template>
    </CounterInput>
    <hr />
    {{ counter }} / {{ counter2 }}
    <button @click="counter+=1">+</button>
    <button @click="counter-=1">-</button>
    <button v-if="counter < 0" @click="counter=0">Back to 0</button>
    <hr />
    <button @click="counter2+=1">inc2</button>
    <button @click="counter2-=1">dec2</button>
  </div>
</template>

<script>
import CounterInput from "@/components/CounterInput";
export default {
  name: "App",
  components: {CounterInput},
  props: {
    initialValue: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      counter: 0,
      counter2: 0
    }
  },

  watch: {
    initialValue: {
      immediate: true,
      handler(newVal) {
        this.counter = newVal
      }
    },
     counter () {
      this.$nextTick (() => { // для примера
        this.counter2 = 0;
      })
     }
  },

  mounted() {
    document.addEventListener('keyup', this.handleKeyPress)
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.handleKeyPress)
  },

  methods: {
    handleKeyPress(e) {
      if(e.key === '-') {
        this.counter -=1;
      }
      if(e.key === '+') {
        this.counter +=1;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
