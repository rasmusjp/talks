<template>
	<div :style="{ color: textColor }">{{ data.text }}</div>
</template>

<script>
export default {
	name: 'MultiLineText',
	props: ['data', 'textColor'],
}
</script>

<style scoped>
div {
	white-space: pre-wrap;
	font-size: 1em;
	text-align: center;
	text-shadow: black 2px 2px 10px;
}
</style>
