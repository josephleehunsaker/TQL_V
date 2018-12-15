import * as BABYLON from 'babylonjs'

function createArcRotateCamera (scene: BABYLON.Scene, target: BABYLON.Vector3) {
    let camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 1, 90, target, scene)
    camera.checkCollisions = true
    camera.inertia = 0
    camera.lowerRadiusLimit = 200
    camera.upperRadiusLimit = 1000
    camera.radius = 700
    camera.lowerBetaLimit = .1
    camera.upperBetaLimit = Math.PI / 2

    document.addEventListener ('mousewheel', function (event) {
        let newRadius = camera.radius + event.deltaY / 5
        if (camera.lowerRadiusLimit <= newRadius && camera.upperRadiusLimit >= newRadius) {
            camera.radius = newRadius
        }
    })

    return camera
}

function createUniversalCamera (scene: BABYLON.Scene) {
    let camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, 0), scene);
    return camera
}

function createWebVRFreeCamera (scene: BABYLON.Scene) {
    let camera = new BABYLON.WebVRFreeCamera("WVR", new BABYLON.Vector3(0, 0, 0), scene);
    return camera
}

function createVRFreeCamera (scene: BABYLON.Scene) {
    let camera = new BABYLON.VRDeviceOrientationFreeCamera("VRFreeCamera", new BABYLON.Vector3(0, 0, 0), scene)
    return camera
}

export {
    createArcRotateCamera,
    createUniversalCamera,
    createWebVRFreeCamera,
    createVRFreeCamera
}
