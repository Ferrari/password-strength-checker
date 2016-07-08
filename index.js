#!/usr/bin/env node

'use strict'

const prompt = require('prompt')
const zxcvbn = require('zxcvbn')
const debug = require('debug')('pwd')

prompt.start()

prompt.get({
  properties: {
    password: {
      message: 'Please input your password',
      require: true,
      hidden: true
    }
  }
}, (err, result) => {
  const pwd = result.password
  const output = showResult(zxcvbn(pwd))
  debug(zxcvbn(pwd))
  console.log(output.join('\n'))
})


function showResult(data) {
  let result = []

  result.push(`Your password strength: ${data.score}`)
  result.push(`It might be guess in ${data.guesses} time`)

  if (data.crack_times_display) {
    let crackTimes = data.crack_times_display
    let crackTimesKey = Object.keys(crackTimes)

    for (let x = 0; x < crackTimesKey.length; x++) {
      result.push(`${crackTimesKey[x]} - ${crackTimes[crackTimesKey[x]]}`)
    }
  }

  return result
}
