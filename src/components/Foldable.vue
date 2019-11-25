<template>
<div class="vue-accordion">
    <div
        ref="container"
        class="vue-accordion-container"
        :style="{ maxHeight: currentMaxHeight + 'px' }">
        <slot />
    </div>
</div>
</template>

<script>
/**
     * Heavily stripped down version of https://github.com/ulivz/vue-foldable
     */
import defaults from '../options';

export default {
    name: 'Foldable',

    props: {
        minHeight: {
            type: Number,
            default: function() {
                return defaults.peekabooHeight;
            }
        },
        height: {
            type: [Number, String],
            default: function() {
                return defaults.peekabooHeight;
            }
        },
        collapsed: {
            type: Boolean,
            required: true
        }
    },
    data: function() {
        let height = this.height;
        if (typeof this.height === 'number' && this.height < this.minHeight) {
            height = this.minHeight;
        }
        return {
            currentMaxHeight: height,
            threshold: height,
            reachThreshold: true,
            percentageMode:
                    typeof this.height === 'string' &&
                    this.height.indexOf('%') !== -1,
            percentage: null
        };
    },
    created: function() {
        if (this.percentageMode) {
            this.percentage =
                    parseInt(this.threshold.replace('%', '').trim()) / 100;
        } else if (typeof this.height === 'string') {
            this.currentMaxHeight = this.threshold = DEFAULT_VISUAL_HEIGHT;
        }
    },
    mounted: function() {
        this.handleMount();

        if(!this.collapsed){
            this.currentMaxHeight = this.$refs.container.scrollHeight;
        }
    },
    methods: {
        handleMount: function() {
            const contentHeight = this.$refs.container.scrollHeight;
            this.calculateThreshold(contentHeight);
            this.checkReachThresfold(contentHeight);
        },
        checkReachThresfold: function(contentHeight) {
            this.reachThreshold = contentHeight > this.threshold;
        },
        calculateThreshold: function(contentHeight) {
            if (this.percentageMode) {
                let calculatedHeight = contentHeight * this.percentage;
                if (calculatedHeight < this.minHeight) {
                    calculatedHeight = this.minHeight;
                }
                this.currentMaxHeight = calculatedHeight;
                this.threshold = calculatedHeight;
            }
        }
    },
    watch: {
        collapsed: function(newVal) {
            if (newVal) {
                this.currentMaxHeight = this.threshold;
            } else {
                // explicitly set max height so that it can be transitioned
                this.currentMaxHeight = this.$refs.container.scrollHeight;
            }
        }
    }
};
</script>

<style lang="scss">
    .vue-accordion {
        position: relative;
        transition: 0.5s;
        margin: 1rem 0;

        &-container {
            overflow: hidden;
            transition: 0.5s;
        }
        &-section {
            &-header {
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                justify-content: space-between;
                position: relative;
                padding: 1rem;
                > div {
                    display: flex;
                    flex-flow: row wrap;
                    align-items: center;
                    justify-content: flex-end;
                }
                h3 {
                    color: darkgreen;
                    font-size: 18px;
                }

                h3,
                h4 {
                    margin: 0;
                }
            }
            &-body {
                position: relative;
                display: flex;
                flex-flow: row wrap;
                align-items: flex-start;
                justify-content: space-between;
                margin: 1rem;
                > div:nth-of-type(1) {
                    flex: 2;
                    margin-right: 1rem;
                    text-align: left;
                }
                > div:nth-of-type(2) {
                    flex: 1;
                    margin-left: 1rem;
                }
            }
        }
    }
</style>
