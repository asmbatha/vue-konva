import { applyNodeProps, createListener } from '../utils'
import { h } from 'vue'
export default {
    name: 'v-stage',
    render () {
        return h('div', {}, this.$slots.default())
    },
    watch: {
        config: {
            handler () {
                this.uploadKonva()
            },
            deep: true,
        },
    },
    props: {
        config: {
            type: Object,
            default () {
                return {}
            },
        },
    },

    created () {
        this._konvaNode = new window.Konva.Stage({
            width: this.config.width,
            height: this.config.height,
            // create fake container, later it will be replaced with real div on the page
            container: document.createElement('div'),
        })
    },
    mounted () {
        this.$el.innerHTML = ''
        this._konvaNode.container(this.$el)
        this.uploadKonva()
        this.validateChildren()
    },
    updated () {
        this.uploadKonva()
        this.validateChildren()
    },
    beforeUnmount() {
        this._konvaNode.destroy()
    },
    methods: {
        getNode () {
            return this._konvaNode
        },
        getStage () {
            return this._konvaNode
        },
        uploadKonva () {
            const oldProps = this.oldProps || {}
            const props = {
                ...this.$attrs,
                ...this.config,
                ...createListener(this.$attrs),
            }
            applyNodeProps(this, props, oldProps)
            this.oldProps = props
        },
        validateChildren () {
            // TODO: add a waring if we see non-Konva element here
            // this.$vnode.componentOptions.children.forEach(child => {
            //   console.log(child);
            // })
        }
    }
}
