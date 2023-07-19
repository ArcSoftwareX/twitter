export const throttle = <T>(callback: (props: T) => any, time: number) => {
    let callable = true

    setInterval(() => callable = true, time)

    return (props: T) => {
        if (!callable) return

        callable = false
        callback(props)
    }
}