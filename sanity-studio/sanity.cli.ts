import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'm-blog',
  api: {
    projectId: '7094dn36',
    dataset: 'production'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {
    autoUpdates: true,
    appId: 'vuvsjj8sjlwm3bcrcjd0oije',
  },
})
