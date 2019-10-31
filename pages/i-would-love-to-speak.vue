<template>
  <Container class="t-container" accessible-line-length="true">
    <h1 slot="headline" tabindex="-1">Hey there! 👋</h1>
    <div class="c-tile">
      <div class="c-tile__container">

        <p>
          In case you're considering to let me speak at your event you probably need some information.
          First of all, I'm really happy about any invitation to speak somewhere... so <strong>thank you!</strong>
        </p>
        <p>
          You can find slides and recordings of my recent talks in the <a href="/talks/">speak section</a>.
        </p>
        <p>
          But here we go with some basic information:
        </p>
        <dl>
          <dt>
            Short bio
          </dt>
          <dd>
            <Marked :markdown="me.fields.speakerBio"></Marked>
          </dd>
          <dt>
            Favorite talk topics
          </dt>
          <dd>
            {{ me.fields.favoriteSpeakerTopics.join(', ') }}
          </dd>
          <dt>
            Images
          </dt>
          <dd>
            <ul class="o-list-thirds">
              <li v-for="image in me.fields.images" class="u-marginBottomLarge" :key="image.sys.id">
                <div class="u-flex-column u-height-100">
                  <!-- this is container is needed because of a FF bug -->
                  <div>
                    <a :href="image.fields.file.url">
                      <lazy-image :asset="image" :ratio="0.65"></lazy-image>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </dd>
          <dt>
            Past talks
          </dt>
          <dd>
            <ul>
              <li v-for="event in events" :key="event.sys.id">
                <a :href="event.fields.website">{{ event.fields.name }}</a>
              </li>
            </ul>
          </dd>
          <dt>
            Technical equipment
          </dt>
          <dd>
            <ul>
              <li v-for="(tech, index) in me.fields.speakerEquipment" :key="index">
                {{ tech }}
              </li>
            </ul>
          </dd>
          <dt>
            Additional info
          </dt>
          <dd>
            <ul>
              <li v-for="(pref, index) in me.fields.additionalSpeakerInformation" :key="index">
                {{ pref }}
              </li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>
  </Container>
</template>

<script>
  import Container from '~/components/Container.vue'
  import Marked from '~/components/Marked.vue'
  import LazyImage from '~/components/LazyImage.vue'
  import {createPage} from '~/lib/basepage.js'

  export default createPage({
    async fetch ({ app }) {
      const { getPastEvents, getMe } = app.contentful
      await Promise.all([
        getPastEvents(),
        getMe()
      ])
    },
    computed: {
      events () {
        return this.$store.state.events.pastList
      },
      me () {
        return this.$store.state.me.entry
      }
    },
    head () {
      return {
        title: `Jesus Talavera Web Development - Speaker information`,
        meta: [
          { hid: 'description', name: 'description', content: `You want me to speak at your event? Great - here is some basic information` }
        ]
      }
    },
    components: {
      Container,
      Marked,
      LazyImage
    }
  })
</script>

<style scoped>
  dt {
    font-size: 1.5em;
    font-family: Georgia,serif;
    padding: .5em 0;
  }

  dd {
    margin: .5em 0;
  }
</style>
