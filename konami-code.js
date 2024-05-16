let KonamiCode
(function (document) {
    KonamiCode = {
        callbacks: {},
        positions: {konami: 0},
        codes: {
            konami: ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a']
        },
        /**
         * @param message
         * @private
         */
        _error(message) {
            console.error(`KonamiCode error:`, message)
        },

        /**
         * @param event
         * @param type
         * @private
         */
        _listen(event, type) {
            const input = (event.key || event.code).toLowerCase().replace(/^(arrow|key)/, '')
            if (this.codes[type]) {
                if (this.codes[type].indexOf(input) !== -1 && input === this.codes[type][this.positions[type]]) {
                    this.positions[type]++
                    if (this.positions[type] === this.codes[type].length) {
                        if (this.callbacks[type] && typeof this.callbacks[type] == "function") {
                            this.callbacks[type]()
                            this.positions[type] = 0
                        }
                    }
                } else {
                    this.positions[type] = 0
                }
            }
        },

        /**
         * @param input
         * @param type
         * @private
         */
        _addCustom(input, type) {

            // const type = 'custom' + Math.floor(Math.random() * 900000)

            this.positions[type] = 0
            this.codes[type] = []

            for (let i = 0; i < input.length; i++) {
                this.codes[type].push(input[i])
            }
        },

        /**
         * @param type
         * @param callback
         */
        add(type, callback) {

            if (typeof this.codes[type] === "undefined") {
                // type is custom code
                // only alphanumeric characters are allowed
                // maximum of 64 characters
                if (typeof type === "string" && /[a-z0-9 ]/g.test(type.toLowerCase())) {
                    const newString = type.toLowerCase().trim().replace(/\s{2,}/, ' ')
                    if (newString.length > 64) {
                        this._error(`Custom code "${type}" is too long (Max. of 64 characters).`)
                        return
                    }
                    this._addCustom(newString, type)
                } else if (Array.isArray(type)) {
                    if (type.length > 32) {
                        this._error(`Custom code is too long (Max. of 32 input commands).`)
                        return
                    }
                    this._addCustom(type, type)
                } else {
                    return
                }
            }

            // Possible Todo: Security validation of the callback content
            if (typeof callback === "function") {
                this.callbacks[type] = callback
            }

            document.addEventListener("DOMContentLoaded", () => {
                document.addEventListener("keyup", (event) => {
                    KonamiCode._listen(event, type)
                })
            })
        }
    }
}(document))