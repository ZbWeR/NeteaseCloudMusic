import { computed } from "vue";
import { mapState, useStore, mapMutations, mapActions } from "vuex";

/**
 * 封装 mapState 函数，用于在 setup 语法糖中调用 vuex中的属性
 * @param {Array} keys - 需要映射的键名数组
 * @returns {Object} - 经过映射后的状态对象
 */
export const useMapState = (keys) => {
    // 获取 vuex 的 store 实例
    const store = useStore();

    // 创建一个空对象，用于存储映射后的状态
    const storeState = {};

    // 使用 mapState 函数传入指定的键名，获取映射函数
    const storeFns = mapState(keys);

    // 遍历 storeFns 的属性
    Object.keys(storeFns).forEach((fnKeys) => {
        // 将函数绑定到一个临时对象上，临时对象中包含 $store 属性，指向 store 实例
        const fn = storeFns[fnKeys].bind({ $store: store });

        // 使用 computed 函数对绑定后的函数进行计算属性的包装
        // 并将结果赋值给 storeState 对应的键名
        storeState[fnKeys] = computed(fn);
    });

    // 返回经过计算属性包装后的映射状态
    return storeState;
};
/**
 * 封装 mapMutations 函数，用于在 setup 语法糖中调用 mutations
 * @param {Array} keys - 需要映射的键名数组
 * @returns {Object} - 经过映射后的 mutations 对象
 */
export const useMapMutations = (keys) => {
    const store = useStore();
    const storeState = {};
    const storeFns = mapMutations(keys);

    Object.keys(storeFns).forEach((fnKeys) => {
        const fn = storeFns[fnKeys].bind({ $store: store });
        storeState[fnKeys] = fn;
    });
    return storeState;
};
/**
 * 封装 mapActions 函数，用于在 setup 语法糖中调用 mapActions
 * @param {Array} keys - 需要映射的键名数组
 * @returns {Object} - 经过映射后的对象
 */
export const useMapActions = (keys) => {
    const store = useStore();
    const storeState = {};
    const storeFns = mapActions(keys);

    Object.keys(storeFns).forEach((fnKeys) => {
        const fn = storeFns[fnKeys].bind({ $store: store });
        storeState[fnKeys] = fn;
    });
    return storeState;
};