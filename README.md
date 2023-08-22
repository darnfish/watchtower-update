# Watchtower Update for GitHub Actions
<a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>

Automate your Docker image deployments on GitHub Actions via Watchtower's HTTP API.

## Usage
First, navigate to `/yourproject/settings/secrets/actions` and add the following secrets:
* `WATCHTOWER_URL` - the endpoint that points to your Watchtower update endpoint
  * *Example: https://watchtower.example.com/v1/update*
* `WATCHTOWER_API_TOKEN` - the api token used in the `Authorization: Bearer <token>` header
  * *Example: 398ea9ce7d9e572684720305d267da61*

Then, add the following to your workflow job after your Docker image has finished building and publishing:

```yaml
- name: Deploy
  uses: darnfish/watchtower-update@v3.2
  with:
    url: "${{ secrets.WATCHTOWER_URL }}"
    api_token: "${{ secrets.WATCHTOWER_API_TOKEN }}"
    images: "${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}"
```

## License
MIT
