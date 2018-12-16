import { getInterPosition, gradualMeshMove, consolidateGradualMeshMoves } from './gradualMeshMove'

describe('getInterPosition', () => {
    it('returns the interrum position', () => {
        expect(getInterPosition(0, 4, 1 / 2)).toBe(2)
        expect(getInterPosition(0, 4, 3 / 4)).toBe(3)
        expect(getInterPosition(-2, 2, 1 / 2)).toBe(0)
        expect(getInterPosition(-10, 2, 5 / 6)).toBe(0)
    })
})

describe('gradualMeshMove', () => {
    it('returns an array of interrum points', () => {
        expect(gradualMeshMove({ position: { x: 0, y: 0, z: 0 } }, { x: 10, y: 20, z: 30 }, 2)[0])
            .toEqual({
                mesh: { position: { x: 0, y: 0, z: 0 } },
                x: 5,
                y: 10,
                z: 15
            })
    })
})

describe('consolidateGradualMeshMoves', () => {
    it('returns an array of moves', () => {
        console.log(JSON.stringify(consolidateGradualMeshMoves([
            gradualMeshMove({ position: { x: 0, y: 0, z: 0 } }, { x: 10, y: 20, z: 30 }, 2),
            gradualMeshMove({ position: { x: 0, y: 0, z: 0 } }, { x: 10, y: 20, z: 30 }, 2)
        ])))
    })
})
