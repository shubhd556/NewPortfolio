import React, { useRef, useEffect } from 'react';

// ThreeCharacter.jsx
// A complete, ready-to-drop React component that mounts a Three.js scene
// with the 'interactive 3D character' behavior from the Codrops tutorial.
// Works with CRA, Vite, Next.js (client-only). See notes below.

// USAGE (basic):
// <ThreeCharacter />
// or pass your own assets:
// <ThreeCharacter modelPath="/assets/myModel.glb" texturePath="/assets/myTexture.jpg" />

export default function ThreeCharacter({
  modelPath = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy_lightweight.glb',
  texturePath = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy.jpg',
  backgroundColor = 0xf1f1f1,
  initialCamera = { fov: 50, x: 0, y: -3, z: 30 },
  className = '',
}) {
  const mountRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // SSR guard: only run in browser
    if (typeof window === 'undefined') return;

    let scene, renderer, camera, model, neck, waist, mixer, idle, possibleAnims;
    let clock = new (window.THREE?.Clock || (function () { return { getDelta: () => 0.016 }; }))();
    let currentlyAnimating = false;
    const raycaster = new (window.THREE?.Raycaster || function () { return {}; })();

    // We'll dynamically import three and GLTFLoader to keep bundlers happy and reduce SSR problems
    let cancelled = false;

    (async () => {
      const THREE = await import('three');
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');

      if (cancelled) return;

      // keep THREE and GLTFLoader on window for some helper fallbacks above
      window.THREE = THREE;

      // Basic scene + renderer
      scene = new THREE.Scene();
      scene.background = new THREE.Color(backgroundColor);
      scene.fog = new THREE.Fog(backgroundColor, 60, 100);

      // renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.shadowMap.enabled = true;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputEncoding = THREE.sRGBEncoding;

      // attach to DOM
      const mount = mountRef.current;
      renderer.setSize(mount.clientWidth, mount.clientHeight, false);
      mount.appendChild(renderer.domElement);

      // camera
      camera = new THREE.PerspectiveCamera(initialCamera.fov, mount.clientWidth / mount.clientHeight, 0.1, 1000);
      camera.position.set(initialCamera.x, initialCamera.y, initialCamera.z);

      // lights
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
      hemiLight.position.set(0, 50, 0);
      scene.add(hemiLight);

      const d = 8.25;
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
      dirLight.position.set(-8, 12, 8);
      dirLight.castShadow = true;
      dirLight.shadow.mapSize.set(1024, 1024);
      dirLight.shadow.camera.near = 0.1;
      dirLight.shadow.camera.far = 1500;
      dirLight.shadow.camera.left = -d;
      dirLight.shadow.camera.right = d;
      dirLight.shadow.camera.top = d;
      dirLight.shadow.camera.bottom = -d;
      scene.add(dirLight);

      // floor (subtle)
      const floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
      const floorMaterial = new THREE.MeshPhongMaterial({ color: 0xeeeeee, shininess: 0 });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -0.5 * Math.PI;
      floor.receiveShadow = true;
      floor.position.y = -11;
      scene.add(floor);

      // an accent sphere like the tutorial (optional)
      const sphereGeom = new THREE.SphereGeometry(8, 32, 32);
      const sphereMat = new THREE.MeshBasicMaterial({ color: 0x9bffaf });
      const sphere = new THREE.Mesh(sphereGeom, sphereMat);
      sphere.position.set(-0.25, -2.5, -15);
      scene.add(sphere);

      // load texture
      const texLoader = new THREE.TextureLoader();
      const stacy_txt = await new Promise((resolve, reject) => {
        texLoader.load(
          texturePath,
          (t) => {
            t.flipY = false; // glTF uses UVs where flipY is false
            t.encoding = THREE.sRGBEncoding;
            resolve(t);
          },
          undefined,
          (err) => reject(err)
        );
      }).catch((err) => {
        console.warn('Texture load failed', err);
        return null;
      });

      const stacy_mtl = new THREE.MeshPhongMaterial({ map: stacy_txt || null, color: 0xffffff, skinning: true });

      // loader
      const loader = new GLTFLoader();
      loader.load(
        modelPath,
        (gltf) => {
          model = gltf.scene;
          const fileAnimations = gltf.animations || [];

          model.traverse((o) => {
            if (o.isMesh) {
              o.castShadow = true;
              o.receiveShadow = true;
              // apply the tutorial material to meshes (safe fallback to original materials too)
              if (stacy_mtl) o.material = stacy_mtl;
            }
            if (o.isBone && o.name === 'mixamorigNeck') neck = o;
            if (o.isBone && o.name === 'mixamorigSpine') waist = o;
          });

          model.scale.set(7, 7, 7);
          model.position.y = -11;
          scene.add(model);

          // mixer + animations
          mixer = new THREE.AnimationMixer(model);

          // helper to remove tracks by bone name (robust approach)
          const removeBoneTracks = (clip, boneNames = []) => {
            if (!clip || !clip.tracks) return;
            clip.tracks = clip.tracks.filter((t) => !boneNames.some((bn) => t.name.includes(bn)));
          };

          const idleAnim = THREE.AnimationClip.findByName(fileAnimations, 'idle');
          if (idleAnim) {
            removeBoneTracks(idleAnim, ['mixamorigNeck', 'mixamorigSpine']);
            idle = mixer.clipAction(idleAnim);
            idle.play();
          }

          // other animations
          const clips = fileAnimations.filter((c) => c.name !== 'idle');
          possibleAnims = clips.map((val) => {
            // findByName expects array and name; val is already a clip here
            const clip = val;
            removeBoneTracks(clip, ['mixamorigNeck', 'mixamorigSpine']);
            const action = mixer.clipAction(clip);
            return action;
          });

          // click/touch -> raycast detection
          const onClick = (e) => raycast(e);
          const onTouchEnd = (e) => raycast(e, true);
          window.addEventListener('click', onClick);
          window.addEventListener('touchend', onTouchEnd);

          // cleanup for these listeners will be in the outer cleanup block

        },
        undefined,
        (err) => console.error('GLTF load error', err)
      );

      // mouse move joint control
      const onMouseMove = (e) => {
        const mousecoords = getMousePos(e);
        if (neck && waist) {
          moveJoint(mousecoords, neck, 50, THREE);
          moveJoint(mousecoords, waist, 30, THREE);
        }
      };
      document.addEventListener('mousemove', onMouseMove);

      // resize handler
      const onWindowResize = () => {
        const mount = mountRef.current;
        if (!mount) return;
        const width = mount.clientWidth;
        const height = mount.clientHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', onWindowResize);

      // animation loop
      function update() {
        const delta = clock.getDelta ? clock.getDelta() : 0.016;
        if (mixer) mixer.update(delta);

        if (resizeRendererToDisplaySize(renderer, mountRef.current)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);
        rafRef.current = requestAnimationFrame(update);
      }
      update();

      // raycast implementation
      function raycast(e, touch = false) {
        const mouse = {};
        if (!renderer || !camera) return;
        if (touch && e.changedTouches && e.changedTouches[0]) {
          mouse.x = 2 * (e.changedTouches[0].clientX / window.innerWidth) - 1;
          mouse.y = 1 - 2 * (e.changedTouches[0].clientY / window.innerHeight);
        } else {
          mouse.x = 2 * (e.clientX / window.innerWidth) - 1;
          mouse.y = 1 - 2 * (e.clientY / window.innerHeight);
        }
        const rc = new THREE.Raycaster();
        rc.setFromCamera(mouse, camera);
        const intersects = rc.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
          let obj = intersects[0].object;
          while (obj) {
            if (obj === model) {
              if (!currentlyAnimating && possibleAnims && possibleAnims.length > 0) {
                currentlyAnimating = true;
                playOnClick();
              }
              break;
            }
            obj = obj.parent;
          }
        }
      }

      function playOnClick() {
        if (!possibleAnims || possibleAnims.length === 0) return;
        const animIndex = Math.floor(Math.random() * possibleAnims.length);
        playModifierAnimation(idle, 0.25, possibleAnims[animIndex], 0.25);
      }

      function playModifierAnimation(from, fSpeed, to, tSpeed) {
        if (!to || !from) return;
        to.setLoop(THREE.LoopOnce);
        to.reset();
        to.play();
        from.crossFadeTo(to, fSpeed, true);
        setTimeout(function () {
          from.enabled = true;
          to.crossFadeTo(from, tSpeed, true);
          currentlyAnimating = false;
        }, (to._clip ? to._clip.duration : 1) * 1000 - ((tSpeed + fSpeed) * 1000));
      }

      // helpers
      function getMousePos(e) {
        return { x: e.clientX, y: e.clientY };
      }

      function moveJoint(mouse, joint, degreeLimit, THREElib) {
        const degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit, mountRef.current);
        joint.rotation.y = THREElib.Math.degToRad(degrees.x);
        joint.rotation.x = THREElib.Math.degToRad(degrees.y);
      }

      function getMouseDegrees(x, y, degreeLimit, mount) {
        let dx = 0, dy = 0, xdiff, xPercentage, ydiff, yPercentage;
        const w = { x: window.innerWidth, y: window.innerHeight };
        if (x <= w.x / 2) {
          xdiff = w.x / 2 - x;
          xPercentage = (xdiff / (w.x / 2)) * 100;
          dx = ((degreeLimit * xPercentage) / 100) * -1;
        }
        if (x >= w.x / 2) {
          xdiff = x - w.x / 2;
          xPercentage = (xdiff / (w.x / 2)) * 100;
          dx = (degreeLimit * xPercentage) / 100;
        }
        if (y <= w.y / 2) {
          ydiff = w.y / 2 - y;
          yPercentage = (ydiff / (w.y / 2)) * 100;
          dy = (((degreeLimit * 0.5) * yPercentage) / 100) * -1;
        }
        if (y >= w.y / 2) {
          ydiff = y - w.y / 2;
          yPercentage = (ydiff / (w.y / 2)) * 100;
          dy = (degreeLimit * yPercentage) / 100;
        }
        return { x: dx, y: dy };
      }

      function resizeRendererToDisplaySize(renderer, mount) {
        if (!mount) return false;
        const canvas = renderer.domElement;
        const width = mount.clientWidth;
        const height = mount.clientHeight;
        const canvasPixelWidth = canvas.width / (window.devicePixelRatio || 1);
        const canvasPixelHeight = canvas.height / (window.devicePixelRatio || 1);
        const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }

    })(); // end async import block

    // cleanup on unmount
    return () => {
      cancelled = true;
      // cancel RAF
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      // remove renderer and DOM
      const mount = mountRef.current;
      if (mount) {
        // remove all children added by renderer
        if (renderer && renderer.domElement) {
          try {
            mount.removeChild(renderer.domElement);
          } catch (err) {
            // ignore
          }
        }
      }

      // dispose scene objects if present
      try {
        if (scene) {
          scene.traverse((child) => {
            if (child.geometry) child.geometry.dispose && child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose && m.dispose());
              else child.material.dispose && child.material.dispose();
            }
            if (child.texture) child.texture.dispose && child.texture.dispose();
          });
        }
      } catch (err) {
        // ignore
      }

      // stop mixer
      try {
        if (mixer) mixer.stopAllAction && mixer.stopAllAction();
      } catch (err) {}

      // remove global listeners we added
      window.removeEventListener('resize', () => {});
      document.removeEventListener('mousemove', () => {});

      // if THREE is available, try to dispose renderer properly
      try {
        if (renderer) {
          renderer.forceContextLoss && renderer.forceContextLoss();
          renderer.dispose && renderer.dispose();
        }
      } catch (err) {}

    };

  }, [modelPath, texturePath, backgroundColor, initialCamera]);

  // container styles: full width/height by default. You can override with className.
  return (
    <div
      ref={mountRef}
      className={`relative w-full h-[80vh] ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
}

/*
Notes & tips:
- This component dynamically imports 'three' and 'three/examples/jsm/loaders/GLTFLoader.js'.
  Make sure your bundler allows importing from 'three/examples/jsm/...' (CRA/Vite do).
- For Next.js, render this component inside a client-only wrapper ("use client" or dynamic import with ssr: false).
- Replace default modelPath/texturePath with your own hosted assets for production.
- If your GLB uses different bone names for neck/spine, update checks for 'mixamorigNeck' / 'mixamorigSpine'.
- For mobile performance: reduce model complexity; consider disabling shadows on mobile.
*/
