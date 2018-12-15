import * as BABYLON from 'babylonjs'

function createScene(engine: BABYLON.Engine): BABYLON.Scene {
    let scene = new BABYLON.Scene(engine)
    scene.actionManager = new BABYLON.ActionManager(scene)
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP2
    scene.fogDensity = .0003
    return scene
}

export default createScene
