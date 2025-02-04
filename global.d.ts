const a = { b: 'c' };

const p = new Proxy(a, {
    get(target, prop) {
        console.log('t:', target, 'p:', prop);
        return 'aboba' as const;
    },
    call() {
        return 'amogus';
    },
});

console.log(p.b());
