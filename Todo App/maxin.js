export const observerMixin = {
    observes: new Set(),

    addObserver(obs) {
        this.observes.add(obs);
    },
    removeObserver(obs) {
        this.observes.delete(obs);
    },
    notify() {
        this.observes.forEach(obs => {
            obs()
        })

    }
}