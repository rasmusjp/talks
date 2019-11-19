<template>
	<div class="eg-slideshow">
		<slide
			v-for="slide in $page.slideshow.slides"
			:key="slide._id"
			:steps="calculateSteps(slide)"
			:enter="slide.enterAnimation"
			:leave="slide.leaveAnimation"
			:style="getBackgroundStyles(slide)"
		>
			<component
				v-for="(step, index) in slide.steps"
				:key="index"
				:is="getComponentName(step.contentTypeAlias)"
				:data="step"
				:text-color="slide.textColor"
				:style="{ visibility: showStep(slide, index) ? 'visible' : 'hidden' }"
			>
			</component>
		</slide>
	</div>
</template>

<page-query>
query($id: ID!) {
  slideshow(id: $id) {
    slides(sortBy: "_sortOrder", order: ASC) {
      name
      parentId
      backgroundImage {
        _url
      }
      backgroundImageCover
      backgroundImageFilter
      textColor
      enterAnimation
      leaveAnimation
      showAllStepsAtTheSameTime
      steps {
        contentTypeAlias
        text
        size
        language
        code
      }
    }
  }
}
</page-query>

<script>
import BulletPoint from '~/components/BulletPoint.vue'
import CodeBlock from '~/components/CodeBlock.vue'
import Header from '~/components/Header.vue'
import MultiLineText from '~/components/MultiLineText.vue'
import { Slideshow } from 'eagle.js'
export default {
	mixins: [Slideshow],
	components: {
		CodeBlock,
		BulletPoint,
		Header,
		MultiLineText,
	},
	methods: {
		calculateSteps(slide) {
			if (slide.showAllStepsAtTheSameTime) return 1
			return slide.steps.length
		},
		showStep(slide, index) {
			return slide.showAllStepsAtTheSameTime || this.step >= index + 1
		},
		getComponentName(contentTypeAlias) {
			return contentTypeAlias[0].toUpperCase() + contentTypeAlias.substr(1)
		},
		getBackgroundStyles(slide) {
			if (slide.backgroundImage) {
				return {
					backgroundImage: `url(${slide.backgroundImage._url}?width=1920&mode=crop&upscale=false)`,
					backgroundPositionX: '50%',
					backgroundRepeat: 'no-repeat',
					backgroundSize: slide.backgroundImageCover ? 'cover' : 'contain',
					filter: slide.backgroundImageFilter,
				}
			}
			return {}
		},
		updateSlides() {
			if (this.$route.hash) {
				// hash should be in the format #2/1 (slide/step)
				const parts = this.$route.hash.substr(1).split('/')
				if (parts.length === 2) {
					const [slideIndex, stepIndex] = parts
					this.currentSlideIndex = +slideIndex || 1
					this.$nextTick(() => {
						this.step = +stepIndex || 1
					})
				}
			}
		},
		updateURL() {
			this.$router.push(`#${this.currentSlideIndex}/${this.step}`)
		},
	},
	watch: {
		$route: 'updateSlides',
		step: 'updateURL',
		currentSlideIndex: 'updateURL',
	},
	mounted: function() {
		this.updateSlides()
	},
}
</script>

<style lang="css">
@import url(https://fonts.googleapis.com/css?family=Lato);

.eg-slideshow {
	font-family: 'Lato';
	/* background-color: #eef; */
}

.eg-slide {
	display: flex;
}

.eg-slide-content {
	/* width: 25em; */
	max-width: 85%;
	margin: 0 auto;
	align-self: center;
}
</style>
