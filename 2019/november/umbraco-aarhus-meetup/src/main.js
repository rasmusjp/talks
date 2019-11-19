// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import Eagle, { CodeBlock, Options } from 'eagle.js'
// import animate.css for slide transition
import 'animate.css'
import hljs from 'highlight.js'

Options.hljs = hljs
Eagle.use(CodeBlock)

export default function(Vue, { router, head, isClient }) {
	// Set default layout as a global component
	Vue.component('Layout', DefaultLayout)
	Vue.use(Eagle)
}
