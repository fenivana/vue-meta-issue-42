const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()
const VueMeta = require('vue-meta')

Vue.use(VueMeta)

const vm = new Vue({
  metaInfo: {
    title: 'root'
  },

  template: `
    <div>
      ${'a'.repeat(100000)}
      <foo/>
    </div>
  `,

  components: {
    foo: {
      metaInfo: {
        title: 'foo'
      },
      template: '<div>foo</div>'
    }
  }
})

const stream = renderer.renderToStream(vm)

stream.once('data', () => {
  // BUG: title is 'root'. SHOULD be 'foo'
  console.log(vm.$meta().inject().title.text())
})
