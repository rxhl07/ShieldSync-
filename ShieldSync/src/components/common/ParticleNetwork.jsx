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

        const mouse = {
            x: null,
            y: null,
            radius: 150
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

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };
        window.addEventListener('resize', resize);

        // Particle Object Factory
        const createParticle = (x, y, directionX, directionY, size, color) => {
            return {
                x, y, directionX, directionY, size, color,
                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                },
                update() {
                    if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                    if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
                    this.x += this.directionX;
                    this.y += this.directionY;
                    this.draw();
                }
            };
        };

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 12000;

            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 1) - 0.5;
                let directionY = (Math.random() * 1) - 0.5;

                // HIGHLIGHT: Crisp white for dark mode, solid bold black for light mode
                let color = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(15, 23, 42, 0.4)';

                particlesArray.push(createParticle(x, y, directionX, directionY, size, color));
            }
        }

        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                        + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);

                        // HIGHLIGHT: Neon blue for dark mode, sharp dark slate/black for light mode
                        ctx.strokeStyle = isDark
                            ? `rgba(45, 91, 255, ${opacityValue * 0.25})`
                            : `rgba(15, 23, 42, ${opacityValue * 0.15})`;

                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }

                if (mouse.x !== null) {
                    let mouseDistance = ((particlesArray[a].x - mouse.x) * (particlesArray[a].x - mouse.x))
                        + ((particlesArray[a].y - mouse.y) * (particlesArray[a].y - mouse.y));

                    if (mouseDistance < mouse.radius * mouse.radius) {
                        let mouseOpacity = 1 - Math.sqrt(mouseDistance) / mouse.radius;

                        // HIGHLIGHT: Glitch Red threat lines stay vibrant in both themes
                        ctx.strokeStyle = isDark
                            ? `rgba(239, 68, 68, ${mouseOpacity * 0.6})`
                            : `rgba(239, 68, 68, ${mouseOpacity * 0.5})`;

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

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDark]); // This dependency array ensures the canvas redraws instantly when the theme toggles

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 z-[-1] pointer-events-none transition-colors duration-500 ${isDark ? 'bg-[#040914]' : 'bg-[#F8F9FA]'
                }`}
        />
    );
}