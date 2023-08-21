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

    const images = core.getInput('images') as unknown as string[]
    const headers = core.getInput('headers') as unknown as Headers

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
