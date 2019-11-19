<template>
	<component :is="data.size" :style="{ color: textColor }">{{
		data.text
	}}</component>
</template>

<script>
export default {
	name: 'Header',
	props: ['data', 'textColor'],
}
</script>

<style scoped>
.eg-slide-content h1,
.eg-slide-content h2,
.eg-slide-content h3,
.eg-slide-content h4,
.eg-slide-content h5,
.eg-slide-content h6 {
	margin-top: 0;
	text-shadow: black 4px 4px 10px;
}
.eg-slide-content h1 {
	font-size: 3em;
}
.eg-slide-content h2 {
	font-size: 2em;
}
</style>
