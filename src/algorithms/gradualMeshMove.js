export function getInterPosition (oldPosition, newPosition, percentage) {
    return oldPosition + (newPosition - oldPosition) * percentage
}

export function logMeshMove (mesh, newPosition, frames = 6) {
    const res = []
    let frame = 0
    while (frame < frames) {
        frame++
        res.push({
            mesh,
            x: getInterPosition(mesh.position.x, newPosition.x, Math.log(frame, 2) / Math.log(frames, 2)),
            y: getInterPosition(mesh.position.y, newPosition.y, Math.log(frame, 2) / Math.log(frames, 2)),
            z: getInterPosition(mesh.position.z, newPosition.z, Math.log(frame, 2) / Math.log(frames, 2))
        })
    }
    return res
}

export function exponentialMeshMove (mesh, newPosition, frames = 6) {
    const res = []
    let frame = 0
    while (frame < frames) {
        frame++
        res.push({
            mesh,
            x: getInterPosition(mesh.position.x, newPosition.x, Math.pow(frame, 2) / Math.pow(frames, 2)),
            y: getInterPosition(mesh.position.y, newPosition.y, Math.pow(frame, 2) / Math.pow(frames, 2)),
            z: getInterPosition(mesh.position.z, newPosition.z, Math.pow(frame, 2) / Math.pow(frames, 2))
        })
    }
    return res
}

export function cosMeshMove (mesh, newPosition, frames = 6) {
    const res = []
    let frame = 0
    while (frame < frames) {
        frame++
        res.push({
            mesh,
            x: getInterPosition(mesh.position.x, newPosition.x, (-Math.cos(Math.PI * frame / frames) + 1) / 2),
            y: getInterPosition(mesh.position.y, newPosition.y, (-Math.cos(Math.PI * frame / frames) + 1) / 2),
            z: getInterPosition(mesh.position.z, newPosition.z, (-Math.cos(Math.PI * frame / frames) + 1) / 2),
        })
    }
    return res
}

export function linearMeshMove (mesh, newPosition, frames = 6) {
    const res = []
    let frame = 0
    while (frame < frames) {
        frame++
        res.push({
            mesh,
            x: getInterPosition(mesh.position.x, newPosition.x, frame / frames),
            y: getInterPosition(mesh.position.y, newPosition.y, frame / frames),
            z: getInterPosition(mesh.position.z, newPosition.z, frame / frames)
        })
    }
    return res
}

function meshMoveIterator (arrayOfGradualMeshMoves, frameNumber) {
    const res = []
    arrayOfGradualMeshMoves.forEach(meshMoves => {
        if (meshMoves[frameNumber]) {
            res.push(meshMoves[frameNumber])
        }
    })
    return res
}

export function consolidateGradualMeshMoves (arrayOfGradualMeshMoves) {
    const res = []
    const largestArray = Math.max(...arrayOfGradualMeshMoves.map(meshMoves => {
        return meshMoves.length
    }))
    let frameNumber = 0
    while (frameNumber < largestArray) {
        res.push(meshMoveIterator(arrayOfGradualMeshMoves, frameNumber))
        frameNumber++
    }
    return res
}
