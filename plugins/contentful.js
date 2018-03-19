const contentful = require('contentful')

export default ({ app, env, store }) => {
  const clientConfig = {
    host: 'preview.contentful.com',
    space: env.CTF_SPACE_ID,
    accessToken: env.CTF_CPA_TOKEN
  }

  if (env.IS_PRODUCTION) {
    clientConfig.host = 'cdn.contentful.com'
    clientConfig.accessToken = env.CTF_CDA_TOKEN
  }

  const client = contentful.createClient(clientConfig)
  const {
    events,
    me,
    landingpages,
    posts,
    projects,
    resources,
    screencasts,
    talks,
    til
  } = store.state

  app.contentful = {
    async getMe () {
      if (!me.entry.sys) {
        return client
          .getEntries({
            'sys.id': env.CTF_ME_ID
          })
          .then(res => {
            store.commit('me/setMe', res.items[0])
            return res.items[0]
          })
          .catch(err => console.log(err))
      }

      return me.entry
    },

    async getFutureEvents () {
      if (!events.futureList.length) {
        return client
          .getEntries({
            content_type: env.CTF_EVENT_ID,
            order: 'fields.end',
            'fields.state[in]': 'attending,accepted,teaching',
            'fields.end[gte]': new Date(
              +new Date() - 1000 * 60 * 60 * 24
            ).toISOString()
          })
          .then(res => {
            store.commit('events/setFutureList', res.items)
            return res.items
          })
          .catch(err => console.log(err))
      }

      return events.futureList
    },

    async getPastEvents () {
      if (!events.pastList.length) {
        return client
          .getEntries({
            content_type: env.CTF_EVENT_ID,
            order: '-fields.end',
            'fields.state[in]': 'attending,accepted,teaching',
            'fields.end[lte]': new Date().toISOString(),
            'fields.state': 'accepted'
          })
          .then(res => {
            store.commit('events/setPastList', res.items)
            return res.items
          })
          .catch(err => console.log(err))
      }

      return events.pastList
    },

    async getLandingpages () {
      if (!landingpages.list.length) {
        return client
          .getEntries({
            content_type: env.CTF_LANDING_PAGE_ID
          })
          .then(res => {
            store.commit('landingpages/setList', res.items)
            return res.items
          })
          .catch(err => console.log(err))
      }

      return landingpages.list
    },

    async getPosts () {
      if (!posts.list.length) {
        return client
          .getEntries({
            content_type: env.CTF_POST_ID,
            order: '-fields.date'
          })
          .then(res => {
            store.commit('posts/setList', res.items)
            return res.items
          })
          .catch(err => console.log(err))
      }

      return posts.list
    },

    async getProjects () {
      if (!projects.list.length) {
        return client
          .getEntries({
            content_type: env.CTF_PROJECT_ID
          })
          .then(res => {
            store.commit('projects/setList', res.items)
            return res.items
          })
          .catch(err => console.log(err))
      }

      return projects.list
    },

    async getResources () {
      if (!resources.list.length) {
        return client
          .getEntries({
            content_type: env.CTF_LANDING_PAGE_ID,
            'fields.isResource': 'true'
          })
          .then(res => {
            store.commit('resources/setList', res.items)
            return res.items
          })
          .catch(err => console.log(err))
      }

      return projects.list
    },

    async getScreencasts () {
      if (!screencasts.list.length) {
        return client
          .getEntries({
            content_type: env.CTF_SCREENCAST_ID,
            order: '-fields.publishDate'
          })
          .then(res => {
            store.commit('screencasts/setList', res.items)
            return res.items
          })
          .catch(err => console.log(err))
      }

      return screencasts.list
    },

    async getTalks () {
      if (!talks.list.length) {
        return client
          .getEntries({
            content_type: env.CTF_TALK_ID,
            order: '-fields.date'
          })
          .then(res => {
            store.commit('talks/setList', res.items)
            return res.items
          })
          .catch(err => console.log(err))
      }

      return talks.list
    },

    async getTil () {
      if (!til.list.length) {
        return client
          .getEntries({
            content_type: env.CTF_TIL_ID,
            order: '-fields.date'
          })
          .then(res => {
            store.commit('til/setList', res.items)
            return res.items
          })
          .catch(err => console.log(err))
      }

      return til.list
    }
  }
}
