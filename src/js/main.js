// //dégradé

function animateSVGs() {
  const elements = [
    { selector: ".un", freq: 0.0011, amp: 15 },
    { selector: ".deux", freq: 0.0014, amp: 20 },
    { selector: ".trois", freq: 0.0018, amp: 25 },
    { selector: ".quatre", freq: 0.0012, amp: 18 },
  ].map(({ selector, freq, amp }) => ({
    el: document.querySelector(selector), // Sélection de l'élément dans le DOM
    freq, // Fréquence du mouvement
    amp, // Amplitude du mouvement
    rotationOffset: 0, // Rotation de base
    rotationTarget: 0, // Angle de destination
    rotationStartTime: 0, // Temps de début de rotation
    rotationDuration: 0, // Durée de la rotation
    lastSpinTime: 0, // Dernier moment où une rotation a eu lieu
  }));

  // Fonction d'interpolation pour une rotation fluide (accélération/décélération)
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // Fonction d'animation appelée à chaque frame
  function animate(time) {
    elements.forEach((obj, i) => {
      if (!obj.el) return; // Si l'élément n'existe pas, on ignore

      const { freq, amp } = obj;

      // --- MOUVEMENT OSCILLATOIRE (position + échelle) ---
      const scale = 1 + Math.sin(time * freq * 0.8 + i * 2) * 0.25;
      const x = Math.cos(time * freq * 0.6 + i) * amp;
      const y = Math.sin(time * freq * 0.5 + i) * amp;

      // --- GESTION DE LA ROTATION ---
      const isRotating = time < obj.rotationStartTime + obj.rotationDuration;

      // Déclenche une nouvelle rotation aléatoire toutes les 5–13 secondes
      if (
        !isRotating &&
        time - obj.lastSpinTime > 5000 + Math.random() * 8000
      ) {
        obj.rotationOffset = obj.rotationTarget; // On part de la rotation actuelle
        obj.rotationTarget += (Math.random() > 0.5 ? 1 : -1) * 360; // Tourne d'un tour complet (dans un sens ou l'autre)
        obj.rotationStartTime = time;
        obj.rotationDuration = 8000 + Math.random() * 8000; // Rotation entre 8 et 16 secondes
        obj.lastSpinTime = time;
      }

      // Calcule la rotation actuelle en fonction du temps
      let rotation = obj.rotationOffset;
      if (obj.rotationDuration > 0) {
        const progress = Math.min(
          1,
          (time - obj.rotationStartTime) / obj.rotationDuration
        );
        rotation =
          obj.rotationOffset +
          (obj.rotationTarget - obj.rotationOffset) * easeInOutCubic(progress);
      }

      // --- APPLICATION DE LA TRANSFORMATION SUR L'ÉLÉMENT ---
      obj.el.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
    });

    // Redemande une nouvelle frame pour continuer l'animation
    requestAnimationFrame(animate);
  }

  // Démarre la boucle d'animation
  requestAnimationFrame(animate);
}

// Lancement de l'animation dès le chargement
animateSVGs();

//
