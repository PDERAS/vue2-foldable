import Foldable from './components/Foldable.vue';
import options from './options';

function install (Vue, globalOptions) {
    if (globalOptions) {
        Object.keys(globalOptions).map(function(key) {
            options[key] = globalOptions[key];
        });
    }
    Vue.component('foldable', Foldable);
}

export default install;
