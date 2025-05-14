//dégradé
function animateSVGs() {
  const elements = [
    { el: document.querySelector(".un"), freq: 0.0011, amp: 15 },
    { el: document.querySelector(".deux"), freq: 0.0014, amp: 20 },
    { el: document.querySelector(".trois"), freq: 0.0018, amp: 25 },
    { el: document.querySelector(".quatre"), freq: 0.0012, amp: 18 },
  ];

  elements.forEach((obj) => {
    obj.rotationOffset = 0;
    obj.rotationTarget = 0;
    obj.rotationStartTime = 0;
    obj.rotationDuration = 0;
    obj.lastSpinTime = 0;
  });

  function maybeTriggerRotation(obj, now) {
    const rotationInProgress =
      now < obj.rotationStartTime + obj.rotationDuration;

    if (
      !rotationInProgress &&
      now - obj.lastSpinTime > 5000 + Math.random() * 8000
    ) {
      obj.rotationOffset = obj.rotationTarget; // Reset base
      obj.rotationTarget += (Math.random() > 0.5 ? 1 : -1) * 360;
      obj.rotationStartTime = now;
      obj.rotationDuration = 8000 + Math.random() * 8000; // 8–16s
      obj.lastSpinTime = now;
    }
  }

  function animate(time) {
    elements.forEach((obj, i) => {
      const { el, freq, amp } = obj;
      if (!el) return;

      const t = time;

      // Position
      const scale = 1 + Math.sin(t * freq * 0.8 + i * 2) * 0.25;
      const x = Math.cos(t * freq * 0.6 + i) * amp;
      const y = Math.sin(t * freq * 0.5 + i) * amp;

      // Rotation
      maybeTriggerRotation(obj, t);

      let rotation = obj.rotationOffset;
      if (obj.rotationDuration > 0) {
        const progress = Math.min(
          1,
          (t - obj.rotationStartTime) / obj.rotationDuration
        );
        rotation =
          obj.rotationOffset +
          (obj.rotationTarget - obj.rotationOffset) * easeInOutCubic(progress);
      }

      el.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
    });

    requestAnimationFrame(animate);
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  requestAnimationFrame(animate);
}

animateSVGs();
