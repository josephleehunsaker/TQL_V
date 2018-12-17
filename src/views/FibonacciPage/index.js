import React from 'react'
import styled from 'styled-components'
import * as BABYLON from 'babylonjs'
import { createUniversalCamera } from 'bjs/camera'
import { createOmniLight } from 'bjs/light'
import { cosMeshMove, consolidateGradualMeshMoves } from 'algorithms/gradualMeshMove'
import { orderedFibonacciPlacement } from 'algorithms/fibonacci'

const StyledGuiPage = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`

const StyledCanvas = styled.canvas`
    width: 100%;
    height: 100%;
    touch-action: none;
`

const StyledOverlay = styled.div`
    top: 0;
    right: 0;
    position: absolute;
    display: flex;
    flex-direction: column;
`

const StyledSettingsButton = styled.button`
    background-color: lightgray;
`

const Settings = styled.div`
    width: 200px;
    height: 200px;
    background: gray;
`

let resizeHandler
let canvas
let camera

class GuiPage extends React.Component {
    state = {
        showSettings: false
    }

    babylon = {
        nextFrames: [],
        callstack: [],
        objects: []
    }

    move (getMoves) {
        this.babylon.callstack.push(() => {
            return getMoves()
        })
    }

    componentDidMount () {
        let sphereCounter = 0
        function createSphere (scene, x = 0, y = 0, z = 20) {
            var sphere = BABYLON.Mesh.CreateSphere('sphere' + sphereCounter, 16, 1, scene, false, BABYLON.Mesh.FRONTSIDE)
            sphereCounter++
            sphere.position.x = x
            sphere.position.y = y
            sphere.position.z = z
            return sphere
        }
        // Get the canvas DOM element
        canvas = document.getElementById('renderCanvas')

        // Load the 3D engine
        var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true})

        // CreateScene function that creates and return the scene
        var createScene = () => {
            // Create a basic BJS Scene object
            var scene = new BABYLON.Scene(engine)
            // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
            camera = createUniversalCamera(scene)

            // camera.attachControl(canvas, false)

            // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
            createOmniLight(scene, camera)

            // Create a built-in "sphere" shape its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
            const arr = [-3, -2, -1, 1, 2, 3]
            const newMeshPositions = []
            arr.forEach(x => {
                arr.forEach(y => {
                    arr.forEach(z => {
                        const sphere = createSphere(scene)
                        this.babylon.objects.push(sphere)
                        newMeshPositions.push({ x, y, z: z + 5 })
                    })
                })
            })

            // this.move(() => this.babylon.objects.map((mesh, i) => cosMeshMove(mesh, newMeshPositions[i], 150)))
            
            this.move(() => {
                return orderedFibonacciPlacement(this.babylon.objects).map(fib => cosMeshMove(fib.mesh, fib.newPosition, 150))
            })

            // Return the created scene
            return scene
        }

        // call the createScene function
        var scene = createScene()

        // run the render loop
        engine.runRenderLoop(() => {
            if (this.babylon.nextFrames.length) {
                this.babylon.nextFrames.splice(0, 1).forEach(meshFrames => {
                    meshFrames.forEach(meshFrame => {
                        meshFrame.mesh.position.x = meshFrame.x
                        meshFrame.mesh.position.y = meshFrame.y
                        meshFrame.mesh.position.z = meshFrame.z
                    })
                })
            }
            if (!this.babylon.nextFrames.length && this.babylon.callstack.length) {
                const moves = this.babylon.callstack.splice(0, 1)[0]()
                if (moves && moves.length) {
                    this.babylon.nextFrames.push(...consolidateGradualMeshMoves(moves))
                }
            }
            scene.render()
        })

        // the canvas/window resize event handler
        resizeHandler = function () {
            engine.resize()
        }
        window.addEventListener('resize', resizeHandler)
    }

    componentWillUnmount () {
        window.removeEventListener('resize', resizeHandler)
    }

    render () {
        return (
            <StyledGuiPage>
                <StyledCanvas id="renderCanvas"></StyledCanvas>
                <StyledOverlay>
                    <StyledSettingsButton onClick={() => this.setState({ showSettings: !this.state.showSettings })}>Settings</StyledSettingsButton>
                    {this.state.showSettings &&
                        <Settings>
                            <button onClick={() => {
                                camera.attachControl(canvas, true)
                            }}>Attach VR</button>
                        </Settings>
                    }
                </StyledOverlay>
            </StyledGuiPage>
        )
    }
}
  
export default GuiPage
