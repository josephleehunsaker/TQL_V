import * as BABYLON from 'babylonjs'

function createHemisphericLight (scene: BABYLON.Scene) {
    let hemisphericLight = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene)
    hemisphericLight.diffuse = new BABYLON.Color3(.5, .5, .5)
    return hemisphericLight
}

function createOmniLight (scene: BABYLON.Scene, camera) {
    let light = new BABYLON.PointLight("Omni", camera.position, scene)
    light.diffuse = new BABYLON.Color3(.5, .5, .5)
    light.specular = new BABYLON.Color3(1, 1, 1)
    return light
}

export { createHemisphericLight, createOmniLight }
