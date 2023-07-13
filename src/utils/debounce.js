export function debounce(func, delay) {
    let timeoutId = null;
    return function (...args) {
        console.log("--");
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(...args);
        }, delay);
    }
}