import { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export default function ParticleNetwork() {
    const canvasRef = useRef(null);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particlesArray = [];

        // Mouse position tracker
        const mouse = {
            x: null,
            y: null,
            radius: 150 // The detection radius of the cursor
        };

        const handleMouseMove = (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        // Dynamic resizing
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };
        window.addEventListener('resize', resize);

        // Particle Object
        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                // Bounce off screen edges
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

                // Move particle
                this.x += this.directionX;
                this.y += this.directionY;

                this.draw();
            }
        }

        // Initialize particle network
        function init() {
            particlesArray = [];
            // Adjust density: dividing by a larger number means fewer particles
            let numberOfParticles = (canvas.height * canvas.width) / 12000;

            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
                // Speed
                let directionX = (Math.random() * 1) - 0.5;
                let directionY = (Math.random() * 1) - 0.5;
                let color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        // Animation Loop
        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        // Draw lines between particles and mouse
        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                        + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

                    // 1. Base ambient connections (Blue/Grey)
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = isDark
                            ? `rgba(45, 91, 255, ${opacityValue * 0.2})`
                            : `rgba(0, 0, 0, ${opacityValue * 0.05})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }

                // 2. Interactive "Threat" connections to Mouse (Red)
                if (mouse.x !== null) {
                    let mouseDistance = ((particlesArray[a].x - mouse.x) * (particlesArray[a].x - mouse.x))
                        + ((particlesArray[a].y - mouse.y) * (particlesArray[a].y - mouse.y));

                    if (mouseDistance < mouse.radius * mouse.radius) {
                        let mouseOpacity = 1 - Math.sqrt(mouseDistance) / mouse.radius;
                        // The Glitch Red Threat Line
                        ctx.strokeStyle = isDark
                            ? `rgba(239, 68, 68, ${mouseOpacity * 0.6})`
                            : `rgba(239, 68, 68, ${mouseOpacity * 0.4})`;
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        }

        resize();
        animate();

        // Cleanup to prevent memory leaks
        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDark]);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 z-[-1] pointer-events-none transition-colors duration-500 ${isDark ? 'bg-[#040914]' : 'bg-[#F8F9FA]'
                }`}
        />
    );
}