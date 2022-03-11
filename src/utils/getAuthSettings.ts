function getSettings() {
    return new Promise(res => {
        createDummyNamespace(res)
        appendScriptTag('/ac-api/configuration')
    }).then(res => res)
}

function createDummyNamespace(res: any) {
    ;(window as any).applySettings = (obj: any) => {
        // tslint:disable-next-line: no-string-literal
        window['auth_client_id'] = obj['client_id']
        // tslint:disable-next-line: no-string-literal
        window['auth_domain'] = obj['domain']
    }
}

function appendScriptTag(url: string) {
    const scriptTag = document.createElement('script')
    scriptTag.src = url
    document.body.appendChild(scriptTag)
}
getSettings()
