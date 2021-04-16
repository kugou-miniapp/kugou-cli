import '@/utils/init'
import App from '@/pages/<%= pageName %>.svelte'

const app = new App({
  target: document.body,
})

export default app
