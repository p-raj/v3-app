class Logger {
    // LEVEL Info
    i() {
        console.log("%c %s", 'background: #222; color: #bada55', ...arguments);
    }

    // LEVEL Debug
    d() {
        console.log("%c %s", 'background: #222; color: #e0e0e0', ...arguments);
    }
}

export let Log = new Logger();