<template>
  <span :class="'icon-' + name" v-html="icons[name]" />
</template>
<script>

import Instagram from '~/assets/icons/instagram.svg'
import GitHub from '~/assets/icons/github.svg'
import LinkedIn from '~/assets/icons/linkedin.svg'
import Twitter from '~/assets/icons/twitter.svg'
import Close from '~/assets/icons/close.svg'
import Home from '~/assets/icons/home.svg'
import Blog from '~/assets/icons/blog.svg'
import Resources from '~/assets/icons/resources.svg'
import Smalltalk from '~/assets/icons/smalltalk.svg'
import Learn from '~/assets/icons/learn.svg'
import Project from '~/assets/icons/project.svg'
import Talk from '~/assets/icons/talk.svg'
import Snippet from '~/assets/icons/snippet.svg'

const addAriaHiddenToSvg = (svg) => {
  return svg.replace('<svg', '<svg aria-hidden="true"')
}

export default {

  props: ['name'],
  data () {
    return {
      icons: {
        Close: addAriaHiddenToSvg(Close),
        GitHub: addAriaHiddenToSvg(GitHub),
        LinkedIn: addAriaHiddenToSvg(LinkedIn),
        Twitter: addAriaHiddenToSvg(Twitter),
        Instagram: addAriaHiddenToSvg(Instagram),

        Home: addAriaHiddenToSvg(Home),
        Blog: addAriaHiddenToSvg(Blog),
        Resources: addAriaHiddenToSvg(Resources),
        Smalltalk: addAriaHiddenToSvg(Smalltalk),
        Learn: addAriaHiddenToSvg(Learn),
        Project: addAriaHiddenToSvg(Project),
        Talk: addAriaHiddenToSvg(Talk),
        Snippet: addAriaHiddenToSvg(Snippet)
      }
    }
  }
}
</script>
