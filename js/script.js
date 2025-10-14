  let score = 0;
        let timeLeft = 30;
        let gameActive = false;
        let gameInterval;
        let timeInterval;

        const gameArea = document.getElementById('gameArea');
        const scoreDisplay = document.getElementById('score');
        const timeDisplay = document.getElementById('time');
        const gameOverScreen = document.getElementById('gameOver');
        const finalScoreDisplay = document.getElementById('finalScore');
        const startBtn = document.getElementById('startBtn');

        const starEmojis = ['⭐', '🌟', '✨', '💫'];

        function startGame() {
            // Reiniciar variables
            score = 0;
            timeLeft = 30;
            gameActive = true;
            
            // Actualizar displays
            scoreDisplay.textContent = score;
            timeDisplay.textContent = timeLeft;
            gameOverScreen.style.display = 'none';
            startBtn.style.display = 'none';
            
            // Limpiar estrellas anteriores
            const oldStars = gameArea.querySelectorAll('.star');
            oldStars.forEach(star => star.remove());
            
            // Iniciar intervalos
            gameInterval = setInterval(createStar, 800);
            timeInterval = setInterval(updateTime, 1000);
        }

        function createStar() {
            if (!gameActive) return;
            
            const star = document.createElement('div');
            star.className = 'star';
            star.textContent = starEmojis[Math.floor(Math.random() * starEmojis.length)];
            star.style.left = Math.random() * (gameArea.offsetWidth - 40) + 'px';
            star.style.top = '0px';
            
            const duration = Math.random() * 2 + 2; // Entre 2 y 4 segundos
            star.style.animationDuration = duration + 's';
            
            star.addEventListener('click', catchStar);
            gameArea.appendChild(star);
            
            // Eliminar estrella después de que caiga
            setTimeout(() => {
                if (star.parentElement) {
                    star.remove();
                }
            }, duration * 1000);
        }

        function catchStar(e) {
            if (!gameActive) return;
            
            const star = e.target;
            const rect = star.getBoundingClientRect();
            
            // Crear efecto de explosión
            const explosion = document.createElement('div');
            explosion.className = 'explosion';
            explosion.textContent = '+10 ✨';
            explosion.style.left = rect.left - gameArea.getBoundingClientRect().left + 'px';
            explosion.style.top = rect.top - gameArea.getBoundingClientRect().top + 'px';
            gameArea.appendChild(explosion);
            
            setTimeout(() => explosion.remove(), 500);
            
            // Aumentar puntuación
            score += 10;
            scoreDisplay.textContent = score;
            
            // Eliminar estrella
            star.remove();
        }

        function updateTime() {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }

        function endGame() {
            gameActive = false;
            clearInterval(gameInterval);
            clearInterval(timeInterval);
            
            // Eliminar todas las estrellas
            const stars = gameArea.querySelectorAll('.star');
            stars.forEach(star => star.remove());
            
            // Mostrar pantalla de fin de juego
            finalScoreDisplay.textContent = score;
            gameOverScreen.style.display = 'block';
            startBtn.style.display = 'inline-block';
        }