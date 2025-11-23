<template>
  <span class="flag">{{ flag }}</span>
</template>

<script>
const diff = '🇦'.codePointAt(0) - 'A'.codePointAt(0)

function flag (code) {
  return String.fromCodePoint(...[0, 1].map(i => code.codePointAt(i) + diff))
}

export default {
  props: ['code'],
  computed: {
    flag () {
      return flag(this.code)
    }
  }
}
</script>

<style>
  .flag {
    font-size: 1.5em;
  }
</style>
