import { useEffect, useRef } from 'react';

// Fast 2D value noise generator with fractional Brownian motion (fBm)
function createNoise2D() {
  const size = 256;
  const val = new Float32Array(size * size);
  for (let i = 0; i < size * size; i++) {
    val[i] = Math.random();
  }
  
  function getVal(x: number, y: number): number {
    const xi = Math.floor(x) & 255;
    const yi = Math.floor(y) & 255;
    return val[yi * size + xi];
  }
  
  function smooth(x: number, y: number): number {
    const x_f = x - Math.floor(x);
    const y_f = y - Math.floor(y);
    
    // Smoothstep fade curve
    const u = x_f * x_f * (3 - 2 * x_f);
    const v = y_f * y_f * (3 - 2 * y_f);
    
    const x0 = Math.floor(x);
    const x1 = x0 + 1;
    const y0 = Math.floor(y);
    const y1 = y0 + 1;
    
    const n00 = getVal(x0, y0);
    const n10 = getVal(x1, y0);
    const n01 = getVal(x0, y1);
    const n11 = getVal(x1, y1);
    
    const valY0 = n00 + u * (n10 - n00);
    const valY1 = n01 + u * (n11 - n01);
    
    return valY0 + v * (valY1 - valY0);
  }
  
  return function fbm(x: number, y: number, octaves = 4): number {
    let value = 0;
    let amplitude = 1.0;
    let frequency = 1.0;
    let max = 0;
    for (let i = 0; i < octaves; i++) {
      value += smooth(x * frequency, y * frequency) * amplitude;
      max += amplitude;
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value / max;
  };
}

// Procedural Earth landmass checker with coordinate warping
function isLand(u: number, v: number, noiseVal: number): boolean {
  // u is longitude [0, 1], v is latitude [0, 1]
  const nu = u + noiseVal * 0.12;
  const nv = v + noiseVal * 0.12;
  
  // 1. Eurasia & Africa (Eastern Hemisphere)
  const inEurasiaAfrica = (nu > 0.42 && nu < 0.88 && nv > 0.12 && nv < 0.78);
  const isMedSea = (nu > 0.44 && nu < 0.62 && nv > 0.41 && nv < 0.45);
  const isRedSea = (nu > 0.58 && nu < 0.61 && nv > 0.44 && nv < 0.54);
  const isAfrica = inEurasiaAfrica && (nv >= 0.44);
  const isEurasia = inEurasiaAfrica && (nv < 0.44) && !isMedSea;
  
  // 2. Americas (Western Hemisphere)
  const inAmericas = (nu > 0.08 && nu < 0.38 && nv > 0.12 && nv < 0.88);
  const isNorthAmerica = inAmericas && (nv <= 0.50);
  const isSouthAmerica = inAmericas && (nv > 0.50);
  
  // 3. Australia
  const isAustralia = (nu > 0.78 && nu < 0.94 && nv > 0.58 && nv < 0.82);
  
  // 4. Greenland
  const isGreenland = (nu > 0.25 && nu < 0.38 && nv > 0.06 && nv < 0.18);
  
  // 5. Antarctica
  const isAntarctica = (nv > 0.86);

  let land = (isEurasia || isAfrica || isNorthAmerica || isSouthAmerica || isAustralia || isGreenland || isAntarctica) && !isMedSea && !isRedSea;
  
  // Add small islands in coastal regions
  if (!land && noiseVal > 0.38) {
    if (nu > 0.35 && nu < 0.42 && nv > 0.45 && nv < 0.55) land = true; // Caribbean
    if (nu > 0.85 && nu < 0.98 && nv > 0.20 && nv < 0.45) land = true; // Japan / Indonesia
    if (nu > 0.18 && nu < 0.24 && nv > 0.18 && nv < 0.28) land = true; // Canadian Archipelago
  }
  
  return land;
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
  phase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  dx: number;
  dy: number;
  alpha: number;
  active: boolean;
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRef = useRef({ current: 0, target: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let shootingStar: ShootingStar = { x: 0, y: 0, length: 0, speed: 0, dx: 0, dy: 0, alpha: 0, active: false };
    
    // Planet configuration
    let radius = 220;
    let planetX = canvas.width * 0.72;
    let planetY = canvas.height * 0.5;
    let rotationAngle = 0.42; // starting angle
    let cloudRotationAngle = 0.15;
    
    // Light vector (direction of Sun) matching the user's image (Top-Right illumination)
    // We normalize this vector for correct diffuse calculation
    const Lx = 0.75;
    const Ly = -0.45;
    const Lz = 0.48;

    // Offscreen flat Earth textures
    const texWidth = 512;
    const texHeight = 256;
    
    const dayCanvas = document.createElement('canvas');
    const nightCanvas = document.createElement('canvas');
    const cloudCanvas = document.createElement('canvas');
    dayCanvas.width = texWidth;
    dayCanvas.height = texHeight;
    nightCanvas.width = texWidth;
    nightCanvas.height = texHeight;
    cloudCanvas.width = texWidth;
    cloudCanvas.height = texHeight;

    const dayCtx = dayCanvas.getContext('2d')!;
    const nightCtx = nightCanvas.getContext('2d')!;
    const cloudCtx = cloudCanvas.getContext('2d')!;

    const dayImgData = dayCtx.createImageData(texWidth, texHeight);
    const nightImgData = nightCtx.createImageData(texWidth, texHeight);
    const cloudImgData = cloudCtx.createImageData(texWidth, texHeight);

    const noise = createNoise2D();

    // Procedural World Map Generation (Day & Night maps)
    for (let y = 0; y < texHeight; y++) {
      const v = y / texHeight;
      for (let x = 0; x < texWidth; x++) {
        const u = x / texWidth;
        
        const n1 = noise(u * 5.5, v * 5.5, 4);
        const nTerrain = noise(u * 14, v * 14, 4);
        const land = isLand(u, v, n1);
        
        const offset = (y * texWidth + x) * 4;
        
        if (land) {
          // --- DAY LAND COLOR ---
          if (v < 0.12 || v > 0.88) {
            // Ice Caps
            dayImgData.data[offset] = 245;
            dayImgData.data[offset + 1] = 245;
            dayImgData.data[offset + 2] = 252;
            dayImgData.data[offset + 3] = 255;
          } else {
            // Check for desert zones (North Africa / Middle East)
            const isDesertZone = (u > 0.48 && u < 0.65 && v > 0.35 && v < 0.52);
            const desertFactor = isDesertZone ? 0.85 : (nTerrain > 0.62 ? 0.35 : 0.0);
            
            if (nTerrain > 0.72) {
              // Rocky mountain ridges (brown/gray)
              dayImgData.data[offset] = Math.max(0, 95 - nTerrain * 25);
              dayImgData.data[offset + 1] = Math.max(0, 80 - nTerrain * 20);
              dayImgData.data[offset + 2] = Math.max(0, 72 - nTerrain * 15);
            } else if (nTerrain > 0.48 || desertFactor > 0.5) {
              // Desert and sandy regions
              dayImgData.data[offset] = 195 + nTerrain * 35;
              dayImgData.data[offset + 1] = 168 + nTerrain * 20;
              dayImgData.data[offset + 2] = 125 + nTerrain * 15;
            } else {
              // Lush fields and dense forests
              dayImgData.data[offset] = 25 + nTerrain * 25;
              dayImgData.data[offset + 1] = 85 - nTerrain * 25;
              dayImgData.data[offset + 2] = 35 + nTerrain * 10;
            }
            dayImgData.data[offset + 3] = 255;
          }
          
          // --- NIGHT LAND & CITY LIGHTS ---
          const isMountain = nTerrain > 0.7;
          const isIceCap = v < 0.12 || v > 0.88;
          
          // Generate realistic urban clustering networks
          const cityLights = noise(u * 55, v * 55, 2) * noise(u * 16, v * 16, 2);
          if (cityLights > 0.31 && !isMountain && !isIceCap) {
            // Vibrant glowing golden/amber cities (matches your reference picture)
            const glow = Math.min(255, 160 + cityLights * 320);
            nightImgData.data[offset] = glow; // R
            nightImgData.data[offset + 1] = Math.floor(glow * 0.85); // G
            nightImgData.data[offset + 2] = Math.floor(glow * 0.48); // B
            nightImgData.data[offset + 3] = 255;
          } else {
            // Dark night-time land silhouettes
            nightImgData.data[offset] = 4;
            nightImgData.data[offset + 1] = 4;
            nightImgData.data[offset + 2] = 6;
            nightImgData.data[offset + 3] = 255;
          }
        } else {
          // --- DAY OCEAN COLOR ---
          // Coastal light blue shelves feeding into midnight blue trenches
          const shelf = nTerrain * 16;
          dayImgData.data[offset] = 6;
          dayImgData.data[offset + 1] = 32 + shelf;
          dayImgData.data[offset + 2] = 88 + shelf;
          dayImgData.data[offset + 3] = 255;
          
          // --- NIGHT OCEAN COLOR ---
          // Pitch-black oceanic voids with deep water absorption
          nightImgData.data[offset] = 1;
          nightImgData.data[offset + 1] = 1;
          nightImgData.data[offset + 2] = 3;
          nightImgData.data[offset + 3] = 255;
        }
        
        // --- PRODUCING DYNAMIC CLOUDS ---
        const cloudNoise = noise(u * 7 + 15, v * 7 + 15, 4);
        if (cloudNoise > 0.45) {
          const cloudDensity = Math.min(255, (cloudNoise - 0.45) * 4.2 * 255);
          cloudImgData.data[offset] = 255;
          cloudImgData.data[offset + 1] = 255;
          cloudImgData.data[offset + 2] = 255;
          cloudImgData.data[offset + 3] = cloudDensity;
        } else {
          cloudImgData.data[offset] = 0;
          cloudImgData.data[offset + 1] = 0;
          cloudImgData.data[offset + 2] = 0;
          cloudImgData.data[offset + 3] = 0;
        }
      }
    }

    dayCtx.putImageData(dayImgData, 0, 0);
    nightCtx.putImageData(nightImgData, 0, 0);
    cloudCtx.putImageData(cloudImgData, 0, 0);

    // Flat data arrays for super-fast pixel lookup
    const flatDay = dayImgData.data;
    const flatNight = nightImgData.data;
    const flatCloud = cloudImgData.data;

    // Planet offscreen compilation buffer to draw compiled 3D orthographic projection
    const sphereCanvas = document.createElement('canvas');
    const sphereCtx = sphereCanvas.getContext('2d')!;
    let sphereImgData: ImageData;

    // Lookup Table (LUT) for rendering high-speed Orthographic 3D projection
    interface LUTPixel {
      targetIdx: number; // Offset in sphere ImageData
      dx: number;        // Normalized X [-1, 1]
      dy: number;        // Normalized Y [-1, 1]
      z: number;         // Projected Z depth
      u: number;         // Spherical Map longitude coordinates
      v: number;         // Spherical Map latitude coordinates
    }
    let sphereLUT: LUTPixel[] = [];

    function rebuildLUT() {
      const diameter = Math.ceil(radius * 2);
      sphereCanvas.width = diameter;
      sphereCanvas.height = diameter;
      sphereImgData = sphereCtx.createImageData(diameter, diameter);
      
      sphereLUT = [];
      const R = radius;
      
      for (let y = 0; y < diameter; y++) {
        const dyVal = (y - R) / R;
        if (Math.abs(dyVal) >= 1.0) continue;
        
        for (let x = 0; x < diameter; x++) {
          const dxVal = (x - R) / R;
          const distSq = dxVal * dxVal + dyVal * dyVal;
          
          if (distSq < 1.0) {
            const zVal = Math.sqrt(1.0 - distSq);
            
            // Sphere normals mapped to spherical coordinates (latitude, longitude)
            const phi = Math.asin(dyVal);
            const lambda = Math.atan2(dxVal, zVal);
            
            // Map [-pi, pi] long and [-pi/2, pi/2] lat to flat [0, 1] texture coordinates
            const uVal = (lambda + Math.PI) / (Math.PI * 2);
            const vVal = (phi + Math.PI / 2) / Math.PI;
            
            sphereLUT.push({
              targetIdx: (y * diameter + x) * 4,
              dx: dxVal,
              dy: dyVal,
              z: zVal,
              u: uVal,
              v: vVal
            });
          }
        }
      }
    }

    // Initialize Cosmic Twinkling Starfield
    function initStars(w: number, h: number) {
      stars = [];
      const count = Math.floor((w * h) / 7500); // perfectly dense starscape
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 1.6 + 0.4,
          alpha: Math.random() * 0.7 + 0.3,
          twinkleSpeed: 0.008 + Math.random() * 0.012,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    // Trigger Meteor / Shooting Star randomly
    function triggerShootingStar(w: number, h: number) {
      if (shootingStar.active) return;
      shootingStar = {
        x: Math.random() * w * 0.6,
        y: Math.random() * h * 0.4,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 12 + 8,
        dx: 1.0,
        dy: 0.35 + Math.random() * 0.2, // angle
        alpha: 1.0,
        active: true
      };
    }

    // Handles layout adaptation and resize events
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        
        // Setup responsive planet boundaries
        if (width < 768) {
          // Mobile Layout (Centered, Compact)
          radius = 120;
          planetX = width * 0.5;
          planetY = height * 0.45;
        } else {
          // Desktop Layout (Offset Right side, majestic size)
          radius = 230;
          planetX = width * 0.72;
          planetY = height * 0.5;
        }
        
        rebuildLUT();
        initStars(width, height);
      }
    });

    resizeObserver.observe(canvas.parentElement || document.body);

    // Track scroll value to apply fluid scroll-driven parallax effects
    const handleScroll = () => {
      scrollRef.current.target = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Core Animation loop running at high performance (60fps)
    const render = () => {
      // Refresh cosmic canvas base
      ctx.fillStyle = '#030303';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Space Twinkling Stars
      stars.forEach((star) => {
        star.phase += star.twinkleSpeed;
        const currentAlpha = Math.max(0.1, star.alpha + Math.sin(star.phase) * 0.25);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Animate and Render Shooting Star / Meteors
      if (Math.random() < 0.0015) {
        triggerShootingStar(canvas.width, canvas.height);
      }
      if (shootingStar.active) {
        shootingStar.x += shootingStar.dx * shootingStar.speed;
        shootingStar.y += shootingStar.dy * shootingStar.speed;
        shootingStar.alpha -= 0.015;
        
        if (shootingStar.alpha <= 0 || shootingStar.x > canvas.width || shootingStar.y > canvas.height) {
          shootingStar.active = false;
        } else {
          ctx.strokeStyle = `rgba(180, 210, 255, ${shootingStar.alpha})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(
            shootingStar.x - shootingStar.dx * shootingStar.length,
            shootingStar.y - shootingStar.dy * shootingStar.length
          );
          ctx.stroke();
        }
      }

      // Draw subtle orbital cosmic nebula dust behind the planet
      const gradientNebula = ctx.createRadialGradient(
        planetX,
        planetY,
        0,
        planetX,
        planetY,
        radius * 3.5
      );
      gradientNebula.addColorStop(0, 'rgba(8, 20, 48, 0.2)');
      gradientNebula.addColorStop(0.5, 'rgba(3, 10, 28, 0.08)');
      gradientNebula.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradientNebula;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smooth interpolation of scroll values for parallax effect
      const scroll = scrollRef.current;
      scroll.current += (scroll.target - scroll.current) * 0.08;
      
      // Calculate active position with parallax and drift
      const orbitalDriftY = Math.sin(Date.now() * 0.0006) * 15; // Slow ambient floating/weightless effect
      const activePlanetY = planetY - scroll.current * 0.35 + orbitalDriftY;
      const planetOpacity = Math.max(0, 1 - scroll.current / 750); // Fades out gracefully as user scrolls down

      if (planetOpacity > 0.02 && sphereImgData) {
        ctx.save();
        ctx.globalAlpha = planetOpacity;

        // 3. Render Atmosphere Aura / Outer Corona Glow (Behind the sphere)
        const outerGlowRad = radius * 1.35;
        const outerGlow = ctx.createRadialGradient(
          planetX,
          activePlanetY,
          radius * 0.96,
          planetX,
          activePlanetY,
          outerGlowRad
        );
        // Rich high-fidelity electric blue aura fading into outer space (just like the picture)
        outerGlow.addColorStop(0, 'rgba(50, 140, 255, 0.45)');
        outerGlow.addColorStop(0.08, 'rgba(30, 110, 255, 0.35)');
        outerGlow.addColorStop(0.3, 'rgba(15, 60, 180, 0.15)');
        outerGlow.addColorStop(0.65, 'rgba(5, 20, 80, 0.05)');
        outerGlow.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(planetX, activePlanetY, outerGlowRad, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        // 4. Update texture rotation angles
        rotationAngle += 0.0003; // Smooth Earth rotation speed
        cloudRotationAngle += 0.00038; // Clouds rotate slightly faster for dynamic 3D depth parallax

        // Clean target offscreen buffer
        const targetData = sphereImgData.data;
        const totalPixels = targetData.length;
        for (let i = 0; i < totalPixels; i += 4) {
          targetData[i + 3] = 0; // Set transparent as baseline
        }

        // 5. Build compiled 3D projected planet pixel-by-pixel using LUT mapping
        const lutLength = sphereLUT.length;
        for (let idx = 0; idx < lutLength; idx++) {
          const pixel = sphereLUT[idx];
          
          // Map rotated longitude to find active texture columns
          let rotU = (pixel.u + rotationAngle) % 1.0;
          if (rotU < 0) rotU += 1.0;
          const texX = (rotU * texWidth) | 0;
          const texY = (pixel.v * texHeight) | 0;
          const texOffset = (texY * texWidth + texX) * 4;
          
          // Day and Night texture colors
          const dR = flatDay[texOffset];
          const dG = flatDay[texOffset + 1];
          const dB = flatDay[texOffset + 2];

          const nR = flatNight[texOffset];
          const nG = flatNight[texOffset + 1];
          const nB = flatNight[texOffset + 2];

          // Map rotated cloud longitude
          let cloudRotU = (pixel.u + cloudRotationAngle) % 1.0;
          if (cloudRotU < 0) cloudRotU += 1.0;
          const cloudX = (cloudRotU * texWidth) | 0;
          const cloudOffset = (texY * texWidth + cloudX) * 4;
          const cloudA = flatCloud[cloudOffset + 3] / 255.0;

          // Blend Cloud layers dynamically on top of Day and Night maps
          // Day clouds are brilliant white
          const dayBlendR = dR * (1.0 - cloudA) + 255.0 * cloudA;
          const dayBlendG = dG * (1.0 - cloudA) + 255.0 * cloudA;
          const dayBlendB = dB * (1.0 - cloudA) + 255.0 * cloudA;

          // Night clouds are dark/shadows, obscuring the glowing city lights
          const nightBlendR = nR * (1.0 - cloudA * 0.9);
          const nightBlendG = nG * (1.0 - cloudA * 0.9);
          const nightBlendB = nB * (1.0 - cloudA * 0.9);

          // Calculate 3D Diffuse Solar Illumination (Dot product)
          const D = pixel.dx * Lx + pixel.dy * Ly + pixel.z * Lz;

          // Create a smooth solar terminator (twilight boundary)
          let t = (D + 0.1) * 5.0; // range from -0.1 (completely night) to 0.1 (completely day)
          if (t < 0.0) t = 0.0;
          if (t > 1.0) t = 1.0;

          // Interpolate Day and Night pixels
          let r = nightBlendR + t * (dayBlendR - nightBlendR);
          let g = nightBlendG + t * (dayBlendG - nightBlendG);
          let b = nightBlendB + t * (dayBlendB - nightBlendB);

          // 6. Photorealistic Atmospheric Scattering Glow (Atmosphere Ring & scattering)
          // Scattering is thickest at the extreme edges (where z goes to 0) and strongest in direct sunlight
          const scatter = Math.pow(1.0 - pixel.z, 3.2) * Math.max(0.0, D + 0.25) * 1.3;
          
          // Glowing thin blue outline on the dark hemisphere (backlit atmosphere)
          const darkRim = Math.pow(1.0 - pixel.z, 5.0) * 0.35;

          r += scatter * 60 + darkRim * 50;
          g += scatter * 135 + darkRim * 100;
          b += scatter * 255 + darkRim * 255;

          // Compile into output buffer with clamping
          targetData[pixel.targetIdx] = r > 255 ? 255 : (r < 0 ? 0 : r);
          targetData[pixel.targetIdx + 1] = g > 255 ? 255 : (g < 0 ? 0 : g);
          targetData[pixel.targetIdx + 2] = b > 255 ? 255 : (b < 0 ? 0 : b);
          targetData[pixel.targetIdx + 3] = 255; // fully opaque planet body
        }

        // Draw 3D projected compiled sphere image onto offscreen canvas
        const diameter = Math.ceil(radius * 2);
        sphereCtx.putImageData(sphereImgData, 0, 0);

        // Blit compiled sphere buffer to primary screen canvas
        ctx.drawImage(
          sphereCanvas,
          planetX - radius,
          activePlanetY - radius,
          diameter,
          diameter
        );

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="cosmic-planet-canvas"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
