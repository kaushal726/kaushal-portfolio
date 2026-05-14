import React, { useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import * as THREE from "three";

/* ---------------- world constants ---------------- */
const BOUNDS = 40;
const GUY_R = 0.5;
const GRAVITY = 24;
const JUMP = 9.4;
const DISCOVERY_RADIUS = 13;
const COIN_COUNT = 12;

const GAME_KEYS = [
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Space",
];

const OBSTACLES = [
  { x: 9, z: -7, hx: 0.8, hz: 0.8, height: 1.5, type: "crate" },
  { x: 11, z: -7, hx: 0.8, hz: 0.8, height: 1.5, type: "crate" },
  { x: 10, z: -8.7, hx: 0.8, hz: 0.8, height: 1.5, type: "crate" },
  { x: 10, z: -7, hx: 0.8, hz: 0.8, height: 3.0, type: "crate" },
  { x: -9, z: 7, hx: 2.8, hz: 0.5, height: 1.0, type: "log" },
  { x: 5, z: 26, hx: 3.4, hz: 0.55, height: 1.1, type: "log" },
  { x: -18, z: -15, hx: 0.95, hz: 0.95, height: 1.7, type: "crate" },
  { x: 22, z: 5, hx: 0.55, hz: 3.4, height: 1.2, type: "hedge" },
  { x: -24, z: 20, hx: 1.0, hz: 1.0, height: 1.4, type: "crate" },
  { x: 16, z: -22, hx: 3.2, hz: 0.55, height: 1.0, type: "log" },
];

const SNAKE_CONFIGS = [
  {
    fx: 0.45, fz: 0.38, wx: 1.1, wz: 0.8, rx: 25, rz: 25, wob: 5,
    speed: 1.0, seg: 11, phase: 0,
    head: "#3f9b3a", body1: "#4caf44", body2: "#3a8a35",
  },
  {
    fx: 0.62, fz: 0.5, wx: 0.9, wz: 1.3, rx: 17, rz: 30, wob: 4,
    speed: 1.3, seg: 9, phase: 14,
    head: "#7a9a3a", body1: "#8aab44", body2: "#647e2c",
  },
  {
    fx: 0.34, fz: 0.58, wx: 1.4, wz: 0.7, rx: 31, rz: 15, wob: 6,
    speed: 0.9, seg: 13, phase: 27,
    head: "#2e8b57", body1: "#34a065", body2: "#236b43",
  },
  {
    fx: 0.72, fz: 0.44, wx: 0.6, wz: 1.7, rx: 21, rz: 21, wob: 7,
    speed: 1.55, seg: 8, phase: 41,
    head: "#9bbf3f", body1: "#a8c94f", body2: "#7c9e2e",
  },
];

function canStand(x, z, feetY) {
  for (let i = 0; i < OBSTACLES.length; i++) {
    const o = OBSTACLES[i];
    if (
      Math.abs(x - o.x) < o.hx + GUY_R &&
      Math.abs(z - o.z) < o.hz + GUY_R &&
      feetY < o.height - 0.12
    ) {
      return false;
    }
  }
  return true;
}

/* ---------------- keyboard ---------------- */
function useKeyboard() {
  const keys = useRef({});
  useEffect(() => {
    const down = (e) => {
      if (!GAME_KEYS.includes(e.code)) return;
      e.preventDefault();
      if (e.code === "Space" && !keys.current.Space) {
        keys.current._jumpQueued = true;
      }
      keys.current[e.code] = true;
    };
    const up = (e) => {
      if (!GAME_KEYS.includes(e.code)) return;
      keys.current[e.code] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);
  return keys;
}

/* ---------------- realistic humanoid body ---------------- */
function CharacterBody({
  legL,
  legR,
  armL,
  armR,
  shirt,
  sleeve,
  pants = "#33405e",
  shoe = "#222633",
  skin = "#e8b88f",
  hair = "#3a2a1a",
}) {
  return (
    <>
      {/* soft contact shadow */}
      <mesh rotation-x={-Math.PI / 2} position-y={0.02}>
        <circleGeometry args={[0.62, 24]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.22} />
      </mesh>

      {/* legs — pivot at the hip */}
      <group ref={legL} position={[-0.15, 0.74, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <capsuleGeometry args={[0.125, 0.44, 4, 12]} />
          <meshStandardMaterial color={pants} roughness={0.95} />
        </mesh>
        <mesh position={[0, -0.6, 0.05]} castShadow>
          <boxGeometry args={[0.2, 0.13, 0.34]} />
          <meshStandardMaterial color={shoe} roughness={0.6} />
        </mesh>
      </group>
      <group ref={legR} position={[0.15, 0.74, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow>
          <capsuleGeometry args={[0.125, 0.44, 4, 12]} />
          <meshStandardMaterial color={pants} roughness={0.95} />
        </mesh>
        <mesh position={[0, -0.6, 0.05]} castShadow>
          <boxGeometry args={[0.2, 0.13, 0.34]} />
          <meshStandardMaterial color={shoe} roughness={0.6} />
        </mesh>
      </group>

      {/* hips */}
      <mesh position={[0, 0.84, 0]} castShadow>
        <capsuleGeometry args={[0.2, 0.1, 4, 12]} />
        <meshStandardMaterial color={pants} roughness={0.95} />
      </mesh>

      {/* torso */}
      <mesh position={[0, 1.22, 0]} castShadow>
        <capsuleGeometry args={[0.24, 0.4, 5, 16]} />
        <meshStandardMaterial color={shirt} roughness={0.8} />
      </mesh>

      {/* arms — pivot at the shoulder */}
      <group ref={armL} position={[-0.33, 1.48, 0]}>
        <mesh position={[0, -0.24, 0]} castShadow>
          <capsuleGeometry args={[0.082, 0.4, 4, 10]} />
          <meshStandardMaterial color={sleeve} roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.5, 0]} castShadow>
          <sphereGeometry args={[0.1, 14, 14]} />
          <meshStandardMaterial color={skin} roughness={0.7} />
        </mesh>
      </group>
      <group ref={armR} position={[0.33, 1.48, 0]}>
        <mesh position={[0, -0.24, 0]} castShadow>
          <capsuleGeometry args={[0.082, 0.4, 4, 10]} />
          <meshStandardMaterial color={sleeve} roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.5, 0]} castShadow>
          <sphereGeometry args={[0.1, 14, 14]} />
          <meshStandardMaterial color={skin} roughness={0.7} />
        </mesh>
      </group>

      {/* neck */}
      <mesh position={[0, 1.54, 0]} castShadow>
        <cylinderGeometry args={[0.085, 0.1, 0.14, 12]} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>

      {/* head */}
      <mesh position={[0, 1.78, 0]} castShadow>
        <sphereGeometry args={[0.27, 28, 28]} />
        <meshStandardMaterial color={skin} roughness={0.62} />
      </mesh>
      {/* hair cap */}
      <mesh position={[0, 1.83, -0.02]} castShadow>
        <sphereGeometry
          args={[0.29, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6]}
        />
        <meshStandardMaterial color={hair} roughness={0.95} />
      </mesh>
      {/* eyes */}
      <mesh position={[0.095, 1.8, 0.23]}>
        <sphereGeometry args={[0.042, 12, 12]} />
        <meshStandardMaterial color="#1b1b24" roughness={0.3} />
      </mesh>
      <mesh position={[-0.095, 1.8, 0.23]}>
        <sphereGeometry args={[0.042, 12, 12]} />
        <meshStandardMaterial color="#1b1b24" roughness={0.3} />
      </mesh>
      {/* nose */}
      <mesh position={[0, 1.74, 0.26]}>
        <sphereGeometry args={[0.04, 10, 10]} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>
    </>
  );
}

/* ---------------- the player ---------------- */
function Guy({
  keysRef,
  primary,
  secondary,
  coins,
  collectedRef,
  onCollect,
  playerPosRef,
  radarRef,
}) {
  const group = useRef();
  const legL = useRef();
  const legR = useRef();
  const armL = useRef();
  const armR = useRef();
  const phase = useRef(0);
  const facing = useRef(0);
  const vy = useRef(0);
  const baseY = useRef(0);
  const grounded = useRef(true);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const k = keysRef.current;
    const dt = Math.min(delta, 0.05);

    if (k._jumpQueued && grounded.current) {
      vy.current = JUMP;
      grounded.current = false;
      k._jumpQueued = false;
    }
    vy.current -= GRAVITY * dt;
    baseY.current += vy.current * dt;
    if (baseY.current <= 0) {
      baseY.current = 0;
      vy.current = 0;
      grounded.current = true;
    } else {
      grounded.current = false;
    }

    let dx = 0;
    let dz = 0;
    if (k.KeyW || k.ArrowUp) dz -= 1;
    if (k.KeyS || k.ArrowDown) dz += 1;
    if (k.KeyA || k.ArrowLeft) dx -= 1;
    if (k.KeyD || k.ArrowRight) dx += 1;
    const moving = dx !== 0 || dz !== 0;

    if (moving) {
      const len = Math.hypot(dx, dz);
      dx /= len;
      dz /= len;
      const speed = 6.2;
      const nx = g.position.x + dx * speed * dt;
      const nz = g.position.z + dz * speed * dt;
      if (canStand(nx, g.position.z, baseY.current)) {
        g.position.x = THREE.MathUtils.clamp(nx, -BOUNDS, BOUNDS);
      }
      if (canStand(g.position.x, nz, baseY.current)) {
        g.position.z = THREE.MathUtils.clamp(nz, -BOUNDS, BOUNDS);
      }
      facing.current = Math.atan2(dx, dz);
      phase.current += dt * 11;
    }

    let diff = facing.current - g.rotation.y;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    g.rotation.y += diff * Math.min(1, dt * 12);

    const airborne = !grounded.current;
    const swing = airborne ? 0.55 : moving ? Math.sin(phase.current) * 0.6 : 0;
    if (legL.current) legL.current.rotation.x = airborne ? -0.4 : swing;
    if (legR.current) legR.current.rotation.x = airborne ? 0.5 : -swing;
    if (armL.current) armL.current.rotation.x = airborne ? -2.4 : -swing * 0.85;
    if (armR.current) armR.current.rotation.x = airborne ? -2.4 : swing * 0.85;

    const bob =
      moving && grounded.current ? Math.abs(Math.sin(phase.current)) * 0.12 : 0;
    g.position.y = baseY.current + bob;

    playerPosRef.current.set(g.position.x, baseY.current, g.position.z);
    let nearest = Infinity;
    for (let i = 0; i < coins.length; i++) {
      const c = coins[i];
      if (collectedRef.current.has(c.id)) continue;
      const ddx = g.position.x - c.position[0];
      const ddz = g.position.z - c.position[2];
      const d = Math.sqrt(ddx * ddx + ddz * ddz);
      if (d < nearest) nearest = d;
      if (d < 1.8 && baseY.current > c.reqFeet - 0.45) onCollect(c.id);
    }
    radarRef.current = nearest;

    const cam = state.camera;
    cam.position.lerp(
      new THREE.Vector3(g.position.x, 8, g.position.z + 13),
      Math.min(1, dt * 3)
    );
    cam.lookAt(g.position.x, g.position.y + 1.2, g.position.z);
  });

  return (
    <group ref={group}>
      <CharacterBody
        legL={legL}
        legR={legR}
        armL={armL}
        armR={armR}
        shirt={primary}
        sleeve={secondary}
      />
    </group>
  );
}

/* ---------------- wandering NPC ---------------- */
function NPC({ start, shirt, sleeve, pants, shoe, skin, hair }) {
  const group = useRef();
  const legL = useRef();
  const legR = useRef();
  const armL = useRef();
  const armR = useRef();
  const phase = useRef(Math.random() * 6);
  const target = useRef(
    new THREE.Vector3(
      THREE.MathUtils.clamp(start[0] + (Math.random() - 0.5) * 24, -BOUNDS, BOUNDS),
      0,
      THREE.MathUtils.clamp(start[2] + (Math.random() - 0.5) * 24, -BOUNDS, BOUNDS)
    )
  );

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    let dx = target.current.x - g.position.x;
    let dz = target.current.z - g.position.z;
    const dist = Math.hypot(dx, dz);

    if (dist < 1.2) {
      target.current.set(
        THREE.MathUtils.clamp((Math.random() - 0.5) * 72, -BOUNDS, BOUNDS),
        0,
        THREE.MathUtils.clamp((Math.random() - 0.5) * 72, -BOUNDS, BOUNDS)
      );
    } else {
      dx /= dist;
      dz /= dist;
      const speed = 2.7;
      g.position.x += dx * speed * dt;
      g.position.z += dz * speed * dt;
      g.rotation.y = Math.atan2(dx, dz);
      phase.current += dt * 9;
      const sw = Math.sin(phase.current) * 0.5;
      if (legL.current) legL.current.rotation.x = sw;
      if (legR.current) legR.current.rotation.x = -sw;
      if (armL.current) armL.current.rotation.x = -sw * 0.8;
      if (armR.current) armR.current.rotation.x = sw * 0.8;
      g.position.y = Math.abs(Math.sin(phase.current)) * 0.1;
    }
  });

  return (
    <group ref={group} position={start}>
      <CharacterBody
        legL={legL}
        legR={legR}
        armL={armL}
        armR={armR}
        shirt={shirt}
        sleeve={sleeve}
        pants={pants}
        shoe={shoe}
        skin={skin}
        hair={hair}
      />
    </group>
  );
}

/* ---------------- realistic slithering snakes ---------------- */
function Snake({ config, playerPosRef, onHitPlayer }) {
  const SEG = config.seg;
  const GAP = 5;
  const headRef = useRef();
  const tongueRef = useRef();
  const segRefs = useRef([]);
  const trail = useRef([]);
  const t = useRef(config.phase);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    t.current += dt * config.speed;
    const T = t.current;
    const hx = THREE.MathUtils.clamp(
      Math.sin(T * config.fx) * config.rx + Math.sin(T * config.wx) * config.wob,
      -BOUNDS,
      BOUNDS
    );
    const hz = THREE.MathUtils.clamp(
      Math.cos(T * config.fz) * config.rz + Math.cos(T * config.wz) * config.wob,
      -BOUNDS,
      BOUNDS
    );

    trail.current.unshift([hx, hz]);
    const maxLen = SEG * GAP + 10;
    if (trail.current.length > maxLen) trail.current.length = maxLen;

    if (headRef.current) {
      headRef.current.position.set(hx, 0.36, hz);
      const p = trail.current[3] || [hx, hz];
      headRef.current.rotation.y = Math.atan2(hx - p[0], hz - p[1]);
    }
    if (tongueRef.current) {
      tongueRef.current.visible =
        Math.sin(state.clock.elapsedTime * 6 + config.phase) > 0.55;
    }
    for (let i = 0; i < segRefs.current.length; i++) {
      const p = trail.current[(i + 1) * GAP];
      const s = segRefs.current[i];
      if (p && s) s.position.set(p[0], 0.32 - i * 0.004, p[1]);
    }

    if (onHitPlayer && playerPosRef && playerPosRef.current.y < 0.85) {
      const px = playerPosRef.current.x;
      const pz = playerPosRef.current.z;
      let touched =
        (hx - px) * (hx - px) + (hz - pz) * (hz - pz) < 0.95 * 0.95;
      if (!touched) {
        for (let i = 0; i < segRefs.current.length; i++) {
          const s = segRefs.current[i];
          if (s) {
            const dx = s.position.x - px;
            const dz = s.position.z - pz;
            if (dx * dx + dz * dz < 0.85 * 0.85) {
              touched = true;
              break;
            }
          }
        }
      }
      if (touched) onHitPlayer();
    }
  });

  return (
    <group>
      <group ref={headRef}>
        {/* elongated head */}
        <mesh castShadow scale={[1, 0.82, 1.5]}>
          <sphereGeometry args={[0.34, 18, 18]} />
          <meshStandardMaterial color={config.head} roughness={0.55} />
        </mesh>
        {/* eyes */}
        <mesh position={[0.16, 0.13, 0.26]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#15110a" roughness={0.3} />
        </mesh>
        <mesh position={[-0.16, 0.13, 0.26]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#15110a" roughness={0.3} />
        </mesh>
        {/* flicking forked tongue */}
        <group ref={tongueRef} position={[0, -0.04, 0.5]}>
          <mesh position={[0.05, 0, 0.09]} rotation-y={0.32}>
            <boxGeometry args={[0.03, 0.02, 0.24]} />
            <meshStandardMaterial color="#d23b5a" />
          </mesh>
          <mesh position={[-0.05, 0, 0.09]} rotation-y={-0.32}>
            <boxGeometry args={[0.03, 0.02, 0.24]} />
            <meshStandardMaterial color="#d23b5a" />
          </mesh>
        </group>
      </group>
      {Array.from({ length: SEG }).map((_, i) => {
        const r = 0.34 * (1 - i / (SEG + 2));
        return (
          <mesh key={i} ref={(el) => (segRefs.current[i] = el)} castShadow>
            <sphereGeometry args={[Math.max(0.06, r), 16, 16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? config.body1 : config.body2}
              roughness={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ---------------- waterfall ---------------- */
function Waterfall() {
  const strips = useRef([]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    strips.current.forEach((m, i) => {
      if (!m) return;
      m.position.y -= dt * 7;
      if (m.position.y < 1.2) m.position.y = 8.5 + (i % 4) * 0.8;
    });
  });

  return (
    <group position={[-32, 0, -33]}>
      <mesh position={[0, 4.5, -1]} castShadow receiveShadow>
        <boxGeometry args={[12, 9, 7]} />
        <meshStandardMaterial color="#6b6f78" roughness={1} flatShading />
      </mesh>
      <mesh position={[-4.5, 2.2, 2]} castShadow>
        <dodecahedronGeometry args={[2.4, 0]} />
        <meshStandardMaterial color="#777b84" roughness={1} flatShading />
      </mesh>
      <mesh position={[4.8, 2, 2.2]} castShadow>
        <dodecahedronGeometry args={[2.8, 0]} />
        <meshStandardMaterial color="#5f636b" roughness={1} flatShading />
      </mesh>

      <mesh position={[0, 4.6, 1.7]}>
        <planeGeometry args={[5.4, 8.4]} />
        <meshStandardMaterial
          color="#7ec8e3"
          transparent
          opacity={0.5}
          emissive="#3a9bd1"
          emissiveIntensity={0.25}
          roughness={0.2}
        />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          ref={(el) => (strips.current[i] = el)}
          position={[(i - 2) * 1.05, 5 + i, 1.85]}
        >
          <planeGeometry args={[0.8, 2.2]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.55} />
        </mesh>
      ))}

      <mesh rotation-x={-Math.PI / 2} position={[0, 0.06, 7]} receiveShadow>
        <circleGeometry args={[8, 36]} />
        <meshStandardMaterial
          color="#3a9bd1"
          transparent
          opacity={0.85}
          emissive="#1f6f9e"
          emissiveIntensity={0.2}
          roughness={0.15}
          metalness={0.1}
        />
      </mesh>
      {[
        [-1.4, 1, 3.4],
        [1.6, 1.3, 3.2],
        [0, 0.9, 4.2],
      ].map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.9, 12, 12]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.22} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- road ---------------- */
function Road() {
  const dashes = useMemo(
    () => Array.from({ length: 24 }, (_, i) => -57.5 + i * 5),
    []
  );
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 18]} receiveShadow>
        <planeGeometry args={[120, 7.5]} />
        <meshStandardMaterial color="#3a3a42" roughness={1} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.03, 14.1]}>
        <planeGeometry args={[120, 0.3]} />
        <meshStandardMaterial color="#cfcfd4" roughness={0.9} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.03, 21.9]}>
        <planeGeometry args={[120, 0.3]} />
        <meshStandardMaterial color="#cfcfd4" roughness={0.9} />
      </mesh>
      {dashes.map((x, i) => (
        <mesh key={i} rotation-x={-Math.PI / 2} position={[x, 0.03, 18]}>
          <planeGeometry args={[2.4, 0.36]} />
          <meshStandardMaterial color="#e8d24a" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- obstacles ---------------- */
function Obstacles() {
  return (
    <>
      {OBSTACLES.map((o, i) => {
        if (o.type === "log") {
          return (
            <group key={i} position={[o.x, o.hz, o.z]} rotation-z={Math.PI / 2}>
              <mesh castShadow receiveShadow>
                <cylinderGeometry args={[o.hz, o.hz, o.hx * 2, 16]} />
                <meshStandardMaterial color="#6e4427" roughness={1} />
              </mesh>
              {/* cut ends */}
              <mesh position={[0, o.hx, 0]}>
                <cylinderGeometry args={[o.hz, o.hz, 0.04, 16]} />
                <meshStandardMaterial color="#a5774a" roughness={0.9} />
              </mesh>
              <mesh position={[0, -o.hx, 0]}>
                <cylinderGeometry args={[o.hz, o.hz, 0.04, 16]} />
                <meshStandardMaterial color="#a5774a" roughness={0.9} />
              </mesh>
            </group>
          );
        }
        if (o.type === "hedge") {
          return (
            <mesh
              key={i}
              position={[o.x, o.height / 2, o.z]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[o.hx * 2, o.height, o.hz * 2]} />
              <meshStandardMaterial color="#357031" roughness={1} flatShading />
            </mesh>
          );
        }
        // crate
        return (
          <group key={i} position={[o.x, o.height / 2, o.z]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[o.hx * 2, o.height, o.hz * 2]} />
              <meshStandardMaterial color="#b07d42" roughness={0.85} />
            </mesh>
            {/* dark plank frame */}
            <mesh>
              <boxGeometry
                args={[o.hx * 2 + 0.03, o.height * 0.16, o.hz * 2 + 0.03]}
              />
              <meshStandardMaterial color="#6f4a24" roughness={0.9} />
            </mesh>
            <mesh position={[0, o.height * 0.42, 0]}>
              <boxGeometry
                args={[o.hx * 2 + 0.03, o.height * 0.13, o.hz * 2 + 0.03]}
              />
              <meshStandardMaterial color="#6f4a24" roughness={0.9} />
            </mesh>
            <mesh position={[0, -o.height * 0.42, 0]}>
              <boxGeometry
                args={[o.hx * 2 + 0.03, o.height * 0.13, o.hz * 2 + 0.03]}
              />
              <meshStandardMaterial color="#6f4a24" roughness={0.9} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

/* ---------------- hidden coins ---------------- */
function Coin({ position, collected, playerPosRef }) {
  const ref = useRef();
  const mat = useRef();
  const vis = useRef(0);
  const pop = useRef(0);

  useFrame((state, delta) => {
    const grp = ref.current;
    if (!grp) return;
    const dt = Math.min(delta, 0.05);

    if (collected) {
      pop.current = Math.min(1, pop.current + dt * 2.6);
      const c = pop.current;
      const s = (1 + c * 2.2) * Math.max(0, 1 - c);
      grp.scale.setScalar(Math.max(0.0001, s));
      grp.position.y = position[1] + c * 3;
      grp.rotation.y += dt * 24;
      if (mat.current) {
        mat.current.opacity = Math.max(0, 1 - c);
        mat.current.emissiveIntensity = 0.7 + c * 2.4;
      }
      grp.visible = c < 1;
      return;
    }

    pop.current = 0;

    const dx = playerPosRef.current.x - position[0];
    const dz = playerPosRef.current.z - position[2];
    const dist = Math.hypot(dx, dz);
    const target = dist < DISCOVERY_RADIUS ? 1 : 0;
    vis.current += (target - vis.current) * Math.min(1, dt * 3.5);

    grp.visible = vis.current > 0.02;
    grp.scale.setScalar(Math.max(0.0001, vis.current));
    if (mat.current) mat.current.opacity = vis.current;

    grp.rotation.y += dt * 3;
    grp.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2;
  });

  return (
    <group ref={ref} position={position} visible={false}>
      <mesh rotation-x={Math.PI / 2} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.09, 22]} />
        <meshStandardMaterial
          ref={mat}
          color="#fcd34d"
          emissive="#f8b94b"
          emissiveIntensity={0.7}
          transparent
          opacity={0}
          metalness={0.55}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

/* ---------------- garden props ---------------- */
function Tree({ position, scale, phase }) {
  const canopy = useRef();
  useFrame((state) => {
    if (!canopy.current) return;
    const t = state.clock.elapsedTime;
    canopy.current.rotation.z = Math.sin(t * 0.8 + phase) * 0.05;
    canopy.current.rotation.x = Math.cos(t * 0.6 + phase) * 0.035;
  });
  return (
    <group position={position} scale={scale}>
      {/* tapered trunk */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.32, 1.45, 10]} />
        <meshStandardMaterial color="#5a3d22" roughness={1} />
      </mesh>
      {/* swaying layered canopy */}
      <group ref={canopy} position={[0, 1.42, 0]}>
        <mesh position={[0, 0.55, 0]} castShadow>
          <sphereGeometry args={[0.98, 18, 18]} />
          <meshStandardMaterial color="#3f7d3a" roughness={0.9} />
        </mesh>
        <mesh position={[0.58, 0.95, 0.22]} castShadow>
          <sphereGeometry args={[0.64, 16, 16]} />
          <meshStandardMaterial color="#4f9a47" roughness={0.9} />
        </mesh>
        <mesh position={[-0.52, 0.86, -0.18]} castShadow>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshStandardMaterial color="#34692f" roughness={0.9} />
        </mesh>
        <mesh position={[0.08, 1.42, -0.12]} castShadow>
          <sphereGeometry args={[0.57, 16, 16]} />
          <meshStandardMaterial color="#46893f" roughness={0.9} />
        </mesh>
        <mesh position={[-0.22, 0.5, 0.52]} castShadow>
          <sphereGeometry args={[0.52, 16, 16]} />
          <meshStandardMaterial color="#3a7335" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

function Flower({ position, color }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.025, 0.035, 0.44, 6]} />
        <meshStandardMaterial color="#3f7d3a" roughness={1} />
      </mesh>
      <mesh position={[0.08, 0.16, 0]} rotation-z={-0.7} scale={[1, 0.32, 0.5]}>
        <sphereGeometry args={[0.11, 8, 8]} />
        <meshStandardMaterial color="#4a9442" roughness={0.95} />
      </mesh>
      {/* petals */}
      <mesh position={[0, 0.46, 0]} scale={[1, 0.42, 1]}>
        <sphereGeometry args={[0.16, 14, 14]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {/* pollen centre */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial color="#f7e06b" roughness={0.6} />
      </mesh>
    </group>
  );
}

function Rock({ position, scale }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow receiveShadow>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#8a8d93" roughness={1} flatShading />
      </mesh>
      <mesh position={[0.32, -0.18, 0.22]} castShadow>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#787c83" roughness={1} flatShading />
      </mesh>
    </group>
  );
}

function GrassTuft({ position }) {
  return (
    <group position={position}>
      {[-0.06, 0, 0.07].map((x, i) => (
        <mesh
          key={i}
          position={[x, 0.16, (i - 1) * 0.05]}
          rotation-z={(i - 1) * 0.25}
        >
          <coneGeometry args={[0.035, 0.34, 5]} />
          <meshStandardMaterial color="#4f9a3f" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- drifting clouds ---------------- */
function Clouds() {
  const refs = useRef([]);
  const clouds = useMemo(
    () =>
      Array.from({ length: 7 }, () => ({
        pos: [
          (Math.random() - 0.5) * 150,
          24 + Math.random() * 10,
          (Math.random() - 0.5) * 120,
        ],
        s: 1 + Math.random() * 1.6,
      })),
    []
  );

  useFrame((_, delta) => {
    refs.current.forEach((c) => {
      if (!c) return;
      c.position.x += delta * 0.7;
      if (c.position.x > 85) c.position.x = -85;
    });
  });

  return (
    <>
      {clouds.map((c, i) => (
        <group
          key={i}
          ref={(el) => (refs.current[i] = el)}
          position={c.pos}
          scale={c.s}
        >
          <mesh>
            <sphereGeometry args={[2, 12, 12]} />
            <meshStandardMaterial color="#ffffff" roughness={1} />
          </mesh>
          <mesh position={[2, 0.3, 0]}>
            <sphereGeometry args={[1.5, 12, 12]} />
            <meshStandardMaterial color="#ffffff" roughness={1} />
          </mesh>
          <mesh position={[-2, 0, 0.4]}>
            <sphereGeometry args={[1.6, 12, 12]} />
            <meshStandardMaterial color="#f3f7fb" roughness={1} />
          </mesh>
        </group>
      ))}
    </>
  );
}

/* ---------------- garden assembly ---------------- */
function Garden() {
  const FLOWER_COLORS = [
    "#f87171",
    "#fbbf24",
    "#f472b6",
    "#a78bfa",
    "#60a5fa",
    "#fb923c",
  ];

  const trees = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 30; i++) {
      const x = (Math.random() - 0.5) * 78;
      const z = (Math.random() - 0.5) * 78;
      if (Math.hypot(x, z) < 6) continue;
      if (z > 13 && z < 23) continue;
      arr.push({
        position: [x, 0, z],
        scale: 0.85 + Math.random() * 1,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  const flowers = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 50; i++) {
      const x = (Math.random() - 0.5) * 76;
      const z = (Math.random() - 0.5) * 76;
      if (z > 13 && z < 23) continue;
      arr.push({
        position: [x, 0, z],
        color: FLOWER_COLORS[i % FLOWER_COLORS.length],
      });
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const grass = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 28; i++) {
      const x = (Math.random() - 0.5) * 76;
      const z = (Math.random() - 0.5) * 76;
      if (z > 13 && z < 23) continue;
      arr.push([x, 0, z]);
    }
    return arr;
  }, []);

  const rocks = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 12; i++) {
      const x = (Math.random() - 0.5) * 72;
      const z = (Math.random() - 0.5) * 72;
      if (Math.hypot(x, z) < 5) continue;
      arr.push({ position: [x, 0.3, z], scale: 0.5 + Math.random() * 0.8 });
    }
    return arr;
  }, []);

  const fence = useMemo(() => {
    const posts = [];
    const F = 42;
    for (let i = -F; i <= F; i += 6) {
      posts.push([i, 0, -F], [i, 0, F], [-F, 0, i], [F, 0, i]);
    }
    return posts;
  }, []);

  const patches = [
    [15, -10, 7, "#57a047"],
    [-20, 12, 9, "#68b855"],
    [9, 30, 6, "#5aa24a"],
    [-14, -24, 8, "#63b050"],
    [28, 22, 7, "#579e46"],
  ];

  return (
    <>
      {/* ground */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[130, 130]} />
        <meshStandardMaterial color="#5fa84e" roughness={1} />
      </mesh>
      {/* subtle colour patches for variation */}
      {patches.map(([x, z, r, c], i) => (
        <mesh
          key={`patch-${i}`}
          rotation-x={-Math.PI / 2}
          position={[x, 0.012, z]}
        >
          <circleGeometry args={[r, 26]} />
          <meshStandardMaterial color={c} roughness={1} />
        </mesh>
      ))}
      <mesh rotation-x={-Math.PI / 2} position-y={0.014}>
        <circleGeometry args={[9, 36]} />
        <meshStandardMaterial color="#6cbb59" roughness={1} />
      </mesh>

      {/* fence posts */}
      {fence.map((p, i) => (
        <mesh key={`f-${i}`} position={[p[0], 0.5, p[2]]} castShadow>
          <cylinderGeometry args={[0.1, 0.14, 1, 7]} />
          <meshStandardMaterial color="#7a5230" roughness={1} />
        </mesh>
      ))}

      {trees.map((t, i) => (
        <Tree
          key={`t-${i}`}
          position={t.position}
          scale={t.scale}
          phase={t.phase}
        />
      ))}
      {flowers.map((f, i) => (
        <Flower key={`fl-${i}`} position={f.position} color={f.color} />
      ))}
      {grass.map((p, i) => (
        <GrassTuft key={`g-${i}`} position={p} />
      ))}
      {rocks.map((r, i) => (
        <Rock key={`r-${i}`} position={r.position} scale={r.scale} />
      ))}
    </>
  );
}

/* ---------------- scene root ---------------- */
export default function GardenScene({
  primary = "#6366f1",
  secondary = "#818cf8",
  onCollect,
  onRadar,
  onSnakeHit,
  active = true,
}) {
  const keysRef = useKeyboard();
  const collectedRef = useRef(new Set());
  const playerPosRef = useRef(new THREE.Vector3());
  const radarRef = useRef(999);
  const hitCdRef = useRef(0);
  const [, force] = useState(0);

  const coins = useMemo(() => {
    const blocked = (cx, cz) => {
      for (let j = 0; j < OBSTACLES.length; j++) {
        const o = OBSTACLES[j];
        if (
          Math.abs(cx - o.x) < o.hx + 1.6 &&
          Math.abs(cz - o.z) < o.hz + 1.6
        ) {
          return true;
        }
      }
      return false;
    };
    const arr = [];
    let id = 0;
    [0, 4, 7].forEach((oi) => {
      const o = OBSTACLES[oi];
      arr.push({
        id: id++,
        position: [o.x, o.height + 0.7, o.z],
        reqFeet: o.height,
      });
    });
    while (id < COIN_COUNT) {
      let x;
      let z;
      let tries = 0;
      do {
        x = (Math.random() - 0.5) * 80;
        z = (Math.random() - 0.5) * 80;
        tries++;
      } while (tries < 12 && (blocked(x, z) || Math.hypot(x, z) < 7));
      arr.push({ id: id++, position: [x, 1.05, z], reqFeet: 0 });
    }
    return arr;
  }, []);

  const handleCollect = (id) => {
    if (!active) return;
    if (collectedRef.current.has(id)) return;
    collectedRef.current.add(id);
    force((n) => n + 1);
    onCollect?.(collectedRef.current.size, coins.length);
  };

  const handleSnakeHit = () => {
    if (!active) return;
    const now = performance.now();
    if (now - hitCdRef.current < 1800) return;
    hitCdRef.current = now;
    const had = collectedRef.current.size;
    if (had > 0) {
      collectedRef.current.clear();
      force((n) => n + 1);
      onCollect?.(0, coins.length);
    }
    onSnakeHit?.(had);
  };

  useEffect(() => {
    if (!onRadar) return undefined;
    const iv = setInterval(() => {
      onRadar(radarRef.current);
    }, 140);
    return () => clearInterval(iv);
  }, [onRadar]);

  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 8, 14], fov: 55 }}
      style={{ width: "100%", height: "100%" }}
    >
      <fog attach="fog" args={["#cfe8f5", 45, 110]} />
      <Sky sunPosition={[20, 16, 12]} turbidity={5} rayleigh={1.1} />

      {/* natural sky/ground bounce + warm sun */}
      <hemisphereLight args={["#cfe8f5", "#4f7a3e", 0.9]} />
      <ambientLight intensity={0.22} />
      <directionalLight
        position={[18, 26, 12]}
        intensity={1.65}
        color="#fff4e0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0004}
        shadow-camera-left={-55}
        shadow-camera-right={55}
        shadow-camera-top={55}
        shadow-camera-bottom={-55}
        shadow-camera-near={1}
        shadow-camera-far={120}
      />

      <Garden />
      <Road />
      <Obstacles />
      <Waterfall />
      <Clouds />

      {SNAKE_CONFIGS.map((cfg, i) => (
        <Snake
          key={i}
          config={cfg}
          playerPosRef={playerPosRef}
          onHitPlayer={handleSnakeHit}
        />
      ))}

      <NPC
        start={[14, 0, 10]}
        shirt="#e2574c"
        sleeve="#c8443a"
        pants="#3a3f52"
        shoe="#23262f"
        skin="#e8b48f"
        hair="#1a1a1a"
      />
      <NPC
        start={[-16, 0, -8]}
        shirt="#3aa6a0"
        sleeve="#2f8c87"
        pants="#4a3f2a"
        shoe="#2a241a"
        skin="#caa07a"
        hair="#2a1c10"
      />

      {coins.map((c) => (
        <Coin
          key={c.id}
          position={c.position}
          collected={collectedRef.current.has(c.id)}
          playerPosRef={playerPosRef}
        />
      ))}

      <Guy
        keysRef={keysRef}
        primary={primary}
        secondary={secondary}
        coins={coins}
        collectedRef={collectedRef}
        onCollect={handleCollect}
        playerPosRef={playerPosRef}
        radarRef={radarRef}
      />
    </Canvas>
  );
}
