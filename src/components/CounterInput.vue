<template>
  <div>
    <p>Enter new value:</p>
    <input :value="value" @input="$emit('input', $event.target.value)" type="text">
    <hr />
    By the way,
    <slot></slot>
    <hr />
    <slot name="warning"></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: false
    }
  },
  // model: {
  //   prop: 'value',
  //   event: 'change'
  // }
}
</script>

<style scoped lang="scss">

</style>
