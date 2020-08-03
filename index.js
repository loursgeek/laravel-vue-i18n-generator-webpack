const execSync = require('child_process').execSync
const chokidar = require('chokidar')

class LaravelVueI18nGenerator {
    constructor() {
        this.isWatchingForChanges = false
        this.firstCompile = true
    }

    apply(compiler) {
        compiler.plugin('before-compile', (_, cb) => {
            if (this.firstCompile) {
                this.generate()
                this.firstCompile = false
            }
            cb()
        })

        this.watchFiles()
    }

    generate() {
        execSync('php artisan vue-i18n:generate')
    }

    watchFiles() {
        if (this.isWatchingForChanges) return

        chokidar.watch('resources/lang/**/*', {
            persistent: true
        }).on('change', this.generate)

        this.isWatchingForChanges = true
    }
}

module.exports = LaravelVueI18nGenerator
