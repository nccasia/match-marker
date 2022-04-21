/* eslint-disable @typescript-eslint/no-var-requires */
console.time('J')
const failFast = require('jasmine-fail-fast')
const jestConfig = require('./jest.config')

require('dotenv').config({ path: './local.env' })

if (process.argv.includes('--bail') || jestConfig.bail) {
  const jasmineEnv = jasmine.getEnv()
  jasmineEnv.addReporter(failFast.init())
  jest.setTimeout(10000)
}
