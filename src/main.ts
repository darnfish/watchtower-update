import * as core from '@actions/core'

import qs from 'qs'

type Headers = {
  [key in string]: string
}

async function run(): Promise<void> {
  try {
    // Get variables from input
    let url = core.getInput('url')
    const apiToken = core.getInput('api_token')

    let images = core.getInput('images')
    let headers = core.getInput('headers')

    if(images)
      images = images.split(',')

    if(headers)
      headers = JSON.parse(headers)

    // Construct URL with image list if exists
    if (images?.length > 0) {
      const query = qs.stringify({image: images.join(',')})

      url = [url, '?', query].join('')
    }

    // Send request
    await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        ...(headers || {})
      }
    })
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
