<template>
	<ul>
		<li :style="{ color: textColor }">
			{{ data.text }}
		</li>
	</ul>
</template>

<script>
export default {
	name: 'BulletPoint',
	props: ['data', 'textColor'],
}
</script>

<style scoped>
ul {
	list-style-type: none;
	margin: 0;
	padding: 0;
}
li:before {
	content: '\2022';
	padding: 10px;
	text-shadow: black 2px 2px 10px;
}
li {
	font-size: 2em;
	text-shadow: black 2px 2px 10px;
}
</style>
