import Foldable from './components/Foldable.vue';
import options from './options';


const VueFoldablePlugin = {
    install(Vue, globalOptions) {
        if (globalOptions) {
            Object.keys(globalOptions).forEach(key => {
                options[key] = globalOptions[key];
            });
        }

        Vue.component(Foldable.name, Foldable);
    }
}

export default VueFoldablePlugin;
