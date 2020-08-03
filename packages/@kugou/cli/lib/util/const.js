exports.GENERATOR_PREFIX = 'kugou-generator-'
exports.OFFICIAL_SCOPE = '@kugou'
exports.OFFICIAL_GENERATORS = ['react', 'vue'].map(_ => `${this.OFFICIAL_SCOPE}/${this.GENERATOR_PREFIX}${_}`)
exports.GENERATOR_PATTERNS = `${this.GENERATOR_PREFIX}*`
