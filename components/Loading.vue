 <template>
  <div>
    <div class="nuxt-progress" :style="{
      'width': percent+'%',
      'opacity': show ? 1 : 0
    }"></div>
    <div class="c-logo">
      <nuxt-link :to="'/'" aria-label="Home" :class="[loading ? 'is-loading': '']">
        <svg aria-hidden="true" width="36" height="36" viewbox="0 0 436 436" xmlns="http://www.w3.org/2000/svg"><path d="M228.682 396.419c-6.504 4.687-15.042 4.578-21.4 0C198.852 390.279 0 244.327 0 128.75 0 48.308 59.55.239 117.102.239c34.553 0 75.21 17.876 100.898 64.819C243.615 18.115 284.308.239 318.861.239 376.45.24 436 48.309 436 128.751c0 115.576-198.889 261.527-207.318 267.668z" fill="#fff"/></svg>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'nuxt-loading',
  data () {
    return {
      percent: 0,
      show: false,
      loading: false,
      canSuccess: true,
      duration: 500
    }
  },
  methods: {
    start () {
      this.show = true
      this.loading = true
      this.canSuccess = true
      if (this._timer) {
        clearInterval(this._timer)
        this.percent = 0
      }
      this._cut = 10000 / Math.floor(this.duration)
      this._timer = setInterval(() => {
        this.increase(this._cut * Math.random())
        if (this.percent > 95) {
          this.finish()
        }
      }, 100)
      return this
    },
    set (num) {
      this.show = true
      this.canSuccess = true
      this.percent = Math.floor(num)
      return this
    },
    get () {
      return Math.floor(this.percent)
    },
    increase (num) {
      this.percent = this.percent + Math.floor(num)
      return this
    },
    decrease (num) {
      this.percent = this.percent - Math.floor(num)
      return this
    },
    finish () {
      this.percent = 100
      this.hide()
      setTimeout(_ => {
        this.loading = false
      }, 500)
      return this
    },
    pause () {
      clearInterval(this._timer)
      return this
    },
    hide () {
      clearInterval(this._timer)
      this._timer = null
      setTimeout(() => {
        this.show = false
        Vue.nextTick(() => {
          setTimeout(() => {
            this.percent = 0
          }, 200)
        })
      }, 500)
      return this
    },
    fail () {
      this.canSuccess = false
      return this
    }
  }
}
</script>

<style lang="scss">
  .nuxt-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    width: 0%;
    transition: width 0.2s, opacity 0.4s;
    opacity: 1;
    background-color: #1a79b8;
    z-index: 999999;
  }

    .c-logo {
    --logo-size: 4em;

    width: var(--logo-size);
    height: var(--logo-size);
    margin : 1.5em auto 0;
  }

  @media (min-width: 47em) {
    .c-logo {
      --logo-size: 2.25em;

      position: fixed;
      z-index: 3;
      left: 2em;
      top: 0.75em;
      margin: 0;
    }
  }

  .c-logo a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 1em;

    border-radius: 50%;
    overflow: hidden;
    background: linear-gradient(
      to bottom,
      var(--blue-bright) 0%,
      var(--blue-bright) 33.33%,
      var(--green-bright) 33.33%,
      var(--green-bright) 66.66%,
      var(--red-bright) 66.66%,
      var(--red-bright) 100%
    );
    background-repeat: repeat;
    background-size: 100% 100%;
    background-position: 0 0;
    box-shadow: inset 0px 0 1px var(--grey-dark);
    animation: animatedBackground 2.5s linear infinite;
    animation-play-state: paused;

    &.is-loading {
      animation-play-state: running;

      svg {
        animation-play-state: running;
      }
    }

    @media (min-width: 47em) {
      width: 2.25em;
      height: 2.25em;
      margin: 0;
      padding: .55em;
    }
  }

  .c-logo svg {
    width: 100%;
    height: 100%;

    animation: animatedHeart 1.75s linear infinite;
    animation-play-state: paused;

    filter: drop-shadow(0 0 1px #666);
  }

  @keyframes animatedBackground {
    from {
      background-position-y: 0px; }

    to {
      background-position-y: var(--logo-size); }
  }

  @keyframes animatedHeart {
    0% { transform: scale(1) }
    20% { transform: scale(1.175) }
    30% { transform: scale(1) }
    50% { transform: scale(1.125) }
    60% { transform: scale(1) }
    100% { transform: scale(1) }
  }
</style>
