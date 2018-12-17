import * as BABYLON from 'babylonjs'

export function getOrderCoordinates (order, layer, layerOrder, previousPerimeter, perimeter, mesh) {
    const multiplier = perimeter - previousPerimeter // Math.pow(1.618033988749895, layer) / 3
    let rotation = .1618033988749895 * layer
    if (layer === 1) {
        rotation = 0
    }
    if (layer === 2) {
        rotation = Math.PI / 2
    }
    let x = multiplier * Math.cos(-(2 * Math.PI * layerOrder) / perimeter + rotation)
    let y = multiplier * Math.sin(-(2 * Math.PI * layerOrder) / perimeter + rotation)
    let z = 50 - layer * 2
    if (order === 0) {
        const material = new BABYLON.StandardMaterial("texture1");
        material.diffuseColor = new BABYLON.Color3(1, 0, 1);
        mesh.material = material
    }
    if (order === 1) {
        const material = new BABYLON.StandardMaterial("texture1");
        material.diffuseColor = new BABYLON.Color3(0, 0, 1);
        mesh.material = material
        y += .5
    }
    if (order === 2) {
        const material = new BABYLON.StandardMaterial("texture1");
        material.diffuseColor = new BABYLON.Color3(0, 1, 1);
        mesh.material = material
        y += .5
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

export function orderedFibonacciPlacement (meshArray) {
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
            const newPerimeter = perimeter + previousPerimeter
            previousPerimeter = perimeter
            perimeter = newPerimeter
            layer++
            layerOrder = 0
        } else {
            layerOrder++
        }
        order++
    }
    return res
}

