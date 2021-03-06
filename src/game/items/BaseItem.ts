import * as THREE from 'three';

import loaders from './../../loaders/instance';
import Moveable from './../Moveable';
import World from './../World';

export default class Item extends Moveable {
    constructor(world: World, protected textureFilename: string) {
        super(world);

        this.collisionOptions = {
            isSolid: false,
            canCollide: true,
            canCollideWithBrushesOnly: false,
            size: new THREE.Vector3(0.5, 0.5, 0.5),
        };
    }

    async loadResources () {
        const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        const material = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            map: await loaders.texture.load(this.textureFilename),
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.y = -0.5;
        this.mesh.castShadow = true;
    }

    onTouch (toucher) {
        this.world.remove(this);
    }

    frame(delta: number) {
        super.frame(delta);

        if (this.mesh) {
            this.mesh.rotation.y += delta * 3;
        }
    }
}
