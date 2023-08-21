import * as core from '@actions/core'

import qs from 'qs'

type Headers = {
  [key in string]: string
}

async function run(): Promise<void> {
  try {
    // Get variables from input
    const apiToken = core.getInput('api_token')

    let url = core.getInput('url')

    let images: string[]
    let headers: Headers

    let _images = core.getInput('images')
    let _headers = core.getInput('headers')

    if (_images) images = _images.split(',')

    if (_headers) headers = JSON.parse(_headers)

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
