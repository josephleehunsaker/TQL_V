import * as BABYLON from 'babylonjs'

export function getOrderCoordinates (order, layer, layerOrder, previousPerimeter, perimeter, mesh) {
    const multiplier = layer // Math.pow(1.618033988749895, layer) / 3
    let rotation = Math.PI / 2
    let x = multiplier * Math.cos(-(2 * Math.PI * layerOrder) / perimeter + rotation)
    let y = multiplier * Math.sin(-(2 * Math.PI * layerOrder) / perimeter + rotation)
    let z = 20 + layer
    if (order === 0) {
        const material = new BABYLON.StandardMaterial("texture1");
        material.diffuseColor = new BABYLON.Color3(1, 0, 1);
        mesh.material = material
    }
    return { mesh, newPosition: { x, y, z } }
}

/*

order, layer, layerOrder, perimeter
0, 0, 0, 1
1, 1, 0, 2
2, 1, 1, 2
3, 2, 0, 3
4, 2, 1, 3
5, 2, 2, 3
6, 3, 0, 5

*/

export function orderedPseudoFibonacciPlacement (meshArray) {
    const res = []
    let order = 0
    let layer = 0
    let layerOrder = 0
    let perimeter = 1
    let previousPerimeter = 1

    const rainbowMaterials = []
    const colors = [
        [1, 0, 0],
        [1, .5, 0],
        [1, 1, 0],
        [.5, 1, 0],
        [0, 1, 0],
        [0, 1, .5],
        [0, 1, 1],
        [0, .5, 1],
        [0, 0, 1],
        [1, 0, 1]
    ]
    colors.forEach(([r, g, b]) => {
        const material = new BABYLON.StandardMaterial("texture1");
        material.diffuseColor = new BABYLON.Color3(r, g, b);
        rainbowMaterials.push(material)
    })

    while (order < meshArray.length) {
        const mesh = meshArray[order]
        mesh.material = rainbowMaterials[layerOrder % 10]
        res.push(getOrderCoordinates(order, layer, layerOrder, previousPerimeter, perimeter, mesh))

        if (layerOrder === perimeter - 1) {
            const newPerimeter = 2 * perimeter - previousPerimeter
            previousPerimeter = perimeter
            perimeter = newPerimeter
            layer++
            layerOrder = 0
            if (layer === 1) {
                perimeter = 6
            }
            if (layer === 2) {
                perimeter = 12
            }
        } else {
            layerOrder++
        }
        order++
    }
    return res
}

