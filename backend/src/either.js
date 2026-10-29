export {
    left,
    right,
    tryCatch,
    fold,
}

//

const left = x => ({ x, kind: 'Left' })
const right = x => ({ x, kind: 'Right' })

//

const tryCatch = f => {
    try {
        return right(f())
    } catch (e) {
        return left(e)
    }
}

const fold = (e, onLeft, onRight) => {
    return e.kind === 'Left'
        ? onLeft(e.x)
        : onRight(e.x)
}
