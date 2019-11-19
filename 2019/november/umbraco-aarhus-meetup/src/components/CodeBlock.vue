<template>
	<eg-code-block :lang="data.language">{{ data.code }}</eg-code-block>
</template>

<script>
import 'highlight.js/styles/monokai.css'
export default {
	name: 'CodeBlock',
	props: ['data'],
}
</script>

<style>
.code-box {
	font-size: 0.9em;
	box-shadow: 0 0 0.25em 0.25em #ddd;
}
</style>
