
export function fakeApi() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({})
        }, 4000)
    })
}