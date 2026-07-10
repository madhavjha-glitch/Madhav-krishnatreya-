import React, { useEffect, useState, useRef } from 'react';

interface ParticleColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  color: ParticleColor;
  size: number;
}

export default function ThreeDBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize cursor offset to ranges of -25px to 25px for comfortable parallax depth
      const x = (e.clientX / window.innerWidth - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 50;
      setMousePos({ x, y });
      mousePosRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize 3D particles
    const particleCount = 75;
    const particles: Particle[] = [];
    const colors: ParticleColor[] = [
      { r: 168, g: 85, b: 247, a: 0.45 }, // Amethyst
      { r: 236, g: 72, b: 153, a: 0.4 },   // Royal Rose
      { r: 99, g: 102, b: 241, a: 0.35 },  // Indigo
      { r: 244, g: 63, b: 94, a: 0.4 },    // Warm Rose Gold
      { r: 139, g: 92, b: 246, a: 0.4 }    // Electric Purple
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 1000 + 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 1.5 + 1,
      });
    }

    // Focal length for perspective projection
    const fov = 400;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Parallax shifts based on mouse pos ref to avoid restarting loop
      const targetMouseX = mousePosRef.current.x * 2.5;
      const targetMouseY = mousePosRef.current.y * 2.5;

      // Draw connections
      particles.forEach((p) => {
        // Update position (moving towards camera)
        p.z -= 1.2;

        if (p.z <= 0 || isNaN(p.z)) {
          p.z = 1000;
          p.x = (Math.random() - 0.5) * width * 1.5;
          p.y = (Math.random() - 0.5) * height * 1.5;
        }

        // Project 3D to 2D
        const px = (p.x / p.z) * fov + width / 2 + targetMouseX * (400 / p.z);
        const py = (p.y / p.z) * fov + height / 2 + targetMouseY * (400 / p.z);

        // Render point
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const depthRatio = Math.max(0, Math.min(1, 1 - p.z / 1000));
          const alpha = depthRatio * 0.8;
          const radius = Math.max(0.1, p.size * depthRatio * 1.8);
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.color.a})`;
          ctx.fill();
        }
      });

      // Simple line linkages for particles that are close
      ctx.shadowBlur = 0; // reset shadow for performance
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 180) {
            const px1 = (p1.x / p1.z) * fov + width / 2 + targetMouseX * (400 / p1.z);
            const py1 = (p1.y / p1.z) * fov + height / 2 + targetMouseY * (400 / p1.z);
            const px2 = (p2.x / p2.z) * fov + width / 2 + targetMouseX * (400 / p2.z);
            const py2 = (p2.y / p2.z) * fov + height / 2 + targetMouseY * (400 / p2.z);

            if (
              px1 >= 0 && px1 <= width && py1 >= 0 && py1 <= height &&
              px2 >= 0 && px2 <= width && py2 >= 0 && py2 <= height
            ) {
              const alpha1 = Math.max(0, Math.min(1, 1 - p1.z / 1000));
              const alpha2 = Math.max(0, Math.min(1, 1 - p2.z / 1000));
              const linkAlpha = Math.max(0, Math.min(1, Math.min(alpha1, alpha2) * (1 - dist / 180) * 0.12));

              ctx.beginPath();
              ctx.moveTo(px1, py1);
              ctx.lineTo(px2, py2);
              ctx.strokeStyle = `rgba(168, 85, 247, ${linkAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 3D Particle Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 3D perspective wireframe grid tilted on horizon */}
      <div 
        style={{
          transform: `perspective(1000px) rotateX(60deg) rotateZ(-20deg) translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, -120px)`,
          transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className="absolute -top-[30%] left-[-15%] w-[130%] h-[130%] opacity-[0.1] bg-[linear-gradient(to_right,#a855f7_1.5px,transparent_1.5px),linear-gradient(to_bottom,#a855f7_1.5px,transparent_1.5px)] bg-[size:64px_64px]"
      />

      {/* Floating neon ambient blobs with smooth parallax and subtle pulse animation */}
      <div
        style={{
          transform: `translate3d(${mousePos.x * 0.9}px, ${mousePos.y * 0.9}px, 0)`,
          transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className="absolute top-[15%] left-[10%] w-[350px] h-[350px] rounded-full bg-fuchsia-500/14 blur-[80px] animate-pulse"
      />
      <div
        style={{
          transform: `translate3d(${mousePos.x * -0.7}px, ${mousePos.y * -0.7}px, 0)`,
          transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className="absolute top-[50%] right-[15%] w-[450px] h-[450px] rounded-full bg-violet-500/10 blur-[90px]"
      />
      <div
        style={{
          transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * -0.5}px, 0)`,
          transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className="absolute bottom-[5%] left-[20%] w-[380px] h-[380px] rounded-full bg-pink-500/12 blur-[85px]"
      />

      {/* Scattered drifting, rotating 3D isometric geometric cubes */}
      <div className="absolute inset-0">
        {[
          { top: '12%', left: '8%', size: 45, delay: '0s', speed: '28s' },
          { top: '48%', left: '88%', size: 65, delay: '-6s', speed: '36s' },
          { top: '78%', left: '12%', size: 55, delay: '-12s', speed: '32s' },
          { top: '28%', left: '78%', size: 35, delay: '-18s', speed: '24s' },
          { top: '82%', left: '76%', size: 50, delay: '-9s', speed: '30s' },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              top: item.top,
              left: item.left,
              width: item.size,
              height: item.size,
              transform: `translate3d(${mousePos.x * (item.size * 0.12)}px, ${mousePos.y * (item.size * 0.12)}px, 0)`,
              transition: 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
            className="absolute opacity-[0.1]"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-fuchsia-400 fill-none stroke-current stroke-[1.2] animate-spin"
              style={{
                animationDuration: item.speed,
                animationDelay: item.delay,
              }}
            >
              {/* Isometric 3D wireframe cube corners */}
              <polygon points="50,15 90,35 50,55 10,35" />
              <polygon points="10,35 50,55 50,95 10,75" />
              <polygon points="90,35 50,55 50,95 90,75" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
