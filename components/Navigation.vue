<template>
  <nav :class="['c-navigation', mainNavIsVisible ? 'main-nav-visible' : '']">
    <transition-group
      name="staggered-item"
      tag="ul"
      class="c-navigation__complete"
      v-on:before-enter="beforeEnter"
      :inert="!mainNavIsVisible && !showFullNav"
    >
      <li
        v-for="(item, index) in menu"
        :key="item.label"
        :data-index="index"
      >
        <nuxt-link :to="item.url">
          <Icon v-if="item.icon" :name="item.icon"></Icon>
          {{ item.label }}
        </nuxt-link>
      </li>
    </transition-group>
    <ul class="c-navigation__reduced" :inert="mainNavIsVisible">
      <li v-for="item in reducedNav" :key="item.url">
        <nuxt-link :to="item.url">{{ item.label }}</nuxt-link>
      </li>
    </ul>
    <button type="button" class="c-navigation__toggle" @click="toggleNav()" :aria-lable="mainNavIsVisible ? 'Close navigation' : 'Open navigation'">
      {{ mainNavIsVisible ? 'Close' : 'Menu' }}
    </button>
  </nav>
</template>
<script>
  import Icon from '~/components/Icon.vue'
  import Container from '~/components/Container.vue'

  export default {
    mounted () {
      this.$router.afterEach(_ => this.toggleNav({isOpen: false}))

      const mql = window.matchMedia('(min-width:38em)')
      this.showFullNav = mql.matches

      mql.addListener(mql => {
        this.showFullNav = mql.matches
      })
    },
    data () {
      return {
        mainNavIsVisible: false,
        mainNav: [
          { label: 'Home', url: '/', icon: 'Home' },
          // { label: 'Blog', url: '/blog/', icon: 'Blog' },
          { label: 'Resources', url: '/resources/', icon: 'Resources' }
          // { label: 'Talks', url: '/talks/', icon: 'Talk' },
          // { label: 'Smalltalk', url: '/smalltalk/', icon: 'Smalltalk' },
          // { label: 'Today I learned', url: '/today-i-learned/', icon: 'Learn' }
          // { label: 'Projects', url: '/projects/', icon: 'Project' },
          // { label: 'Snippets', url: '/snippets/', icon: 'Snippet' }

        ],
        reducedNav: [
          { label: 'Home', url: '/' },
          // { label: 'Blog', url: '/blog/' },
          { label: 'Resources', url: '/resources' }
        ],
        showFullNav: true
      }
    },
    computed: {
      menu () {
        return this.mainNavIsVisible || this.showFullNav
          ? this.mainNav
          : []
      }
    },
    methods: {
      toggleNav (options = {}) {
        // todo focus the first element
        this.mainNavIsVisible = typeof options.isOpen !== 'undefined'
          ? options.isOpen
          : !this.mainNavIsVisible
      },
      beforeEnter (el) {
        el.style.transitionDelay = `${0.05 * (this.menu.length / 2 - el.dataset.index % 3)}s`
      }
    },
    components: {
      Container,
      Icon
    }
  }
</script>

<style lang="scss">
  .c-navigation {
    position : fixed;
    width  : 100%;
    bottom : 0;
    padding : 0;
    z-index : 2;
    background: #fff;
    box-shadow: 0 0 1em #d1d1d1;
    transform: translateZ(0);

    @media (min-width: 47em) {
      bottom: auto;
      top: 0;
    }

    &__complete, &__reduced {
      list-style: none;
      margin: 0;
      padding: 0;

      display: grid;
      grid-template-rows: 1fr;
      grid-gap: .5em;

      > li {
        margin: 0;
        padding: 0;
        text-align: center;
        align-self: stretch;
        justify-self: stretch;
      }

      a {
        display: block;
        text-decoration: none;

        &:hover {
          border-bottom-color: currentColor;
          outline: none;
        }

        &:focus {
          outline-color: var(--c-highlight);
        }

        &.is-active {
          color: var(--c-highlight);
        }
      }

      svg {
        display: block;
        width: 1.5em;
        margin: 0 auto .5em;

        path {
          fill: currentColor;
        }

        @media (min-width: 38em) {
          display: none;
        }
      }
    }

    &__complete {
      position: absolute;
      width: 100%;
      min-height: 12em;
      z-index: 2;
      bottom: 0;
      padding: 2em .75em 4em;
      background: #fff;
      box-shadow: 0 0 2em #d1d1d1;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 4em);

      transform: scale(.2, .225) translate(0, 0);
      transform-origin: bottom right;
      transition: transform .225s ease-in-out;

      .main-nav-visible & {
        transform: scale(1) translate(0, 0);
      }

      //
      // mobile nav full
      //
      @media (min-width: 38em) {
        position: static;
        display: flex;
        justify-content: space-between;
        transform: scale(1) translate(0);
        min-height: 0;
        padding: 0 2em;

        a {
          padding: .25em 0;
          margin: .5em 0;
          border-bottom: .125em solid transparent;
          &.is-active {
            border-bottom-color: currentColor;
          }
        }
      }

      @media (min-width: 47em) {
        justify-content: flex-end;

        > li {
          margin-left: 2.5em;
        }

        a {
          margin: .75em 0;
          border-bottom: .125em solid transparent;

          &.is-active {
            border-top-color: transparent;
            border-bottom-color: currentColor;
          }
        }
      }
    }

    &__reduced {
      padding-right: 20%;
      grid-template-columns: repeat(3, auto);
      transition: opacity .25s ease-in-out;

      .main-nav-visible & {
        opacity: 0;
      }

      a {
        padding: .5em 0;
        margin: .25em 0;

        &.is-active {
          box-shadow: 0 .675em 0 0 currentColor;
        }
      }

      //
      // desktop nav
      //
      @media (min-width: 38em) {
        display: none;
      }
    }

    &__toggle {
      position:absolute;
      z-index: 3;
      right: 0;
      bottom: 0;
      display: block;
      width: 20%;
      height: 100%;
      font-size: 1em;
      background: #fff;
      border: none;
      color: currentColor;

      //
      // desktop nav
      //
      @media (min-width: 38em) {
        display: none;
      }
    }
  }

  .staggered-item, .staggered-item-leave {
    opacity: 1;
    transform: translate(0);
  }

  .staggered-item-leave {
    transition-delay: .25s;
  }

  .staggered-item-enter-active, .staggered-item-leave-active {
    transition: all .25s;
  }

  .staggered-item-enter, .staggered-item-leave-to {
    opacity: 0;
  }

  .staggered-item-enter {
    transform: translateY(1em);
  }
</style>
