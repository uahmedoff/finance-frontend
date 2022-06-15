export function useString() {
    
    function capitalized(string){
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    return {
        capitalized
    }
    
};
