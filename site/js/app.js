(function () {
  'use strict';

  // Taglines
  const taglines = [
    'disengage',
    'the disengagement app',
    'a pause between impulse and action',
    'restore boredom',
    'friction by design',
    'slow down',
    'wait for it'
  ];

  // Elements
  const stateInput = document.getElementById('state-input');
  const stateWaiting = document.getElementById('state-waiting');
  const stateDecision = document.getElementById('state-decision');

  const intentionInput = document.getElementById('intention-input');
  const durationButtons = document.querySelectorAll('[data-duration]');
  const timeDisplay = document.getElementById('time-remaining');
  const cancelBtn = document.getElementById('cancel-btn');
  const intentionDisplay = document.getElementById('intention-display');
  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');

  const taglineEl = document.getElementById('tagline');
  const contactLink = document.getElementById('contact-link');
  const contactModal = document.getElementById('contact-modal');
  const closeModal = document.getElementById('close-modal');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  // State
  let timerInterval = null;

  // Set random tagline
  function setRandomTagline() {
    const randomIndex = Math.floor(Math.random() * taglines.length);
    taglineEl.textContent = taglines[randomIndex];
  }

  // Helpers
  function showState(state) {
    stateInput.classList.add('hidden');
    stateWaiting.classList.add('hidden');
    stateDecision.classList.add('hidden');
    state.classList.remove('hidden');
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m + ':' + String(s).padStart(2, '0');
  }

  function saveSession(intention, endTime) {
    localStorage.setItem('drift_session', JSON.stringify({
      intention: intention,
      endTime: endTime
    }));
  }

  function clearSession() {
    localStorage.removeItem('drift_session');
  }

  function getSession() {
    const data = localStorage.getItem('drift_session');
    return data ? JSON.parse(data) : null;
  }

  function logDelay(intention, durationMinutes, completed) {
    const history = JSON.parse(localStorage.getItem('drift_history') || '[]');
    history.push({
      intention: intention,
      duration: durationMinutes,
      completed: completed,
      timestamp: Date.now()
    });
    // Keep only last 50 entries
    if (history.length > 50) {
      history.shift();
    }
    localStorage.setItem('drift_history', JSON.stringify(history));
  }

  // Timer
  function startTimer(intention, endTime) {
    showState(stateWaiting);

    function tick() {
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));

      if (remaining <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        showDecision(intention);
        return;
      }

      timeDisplay.textContent = formatTime(remaining);
    }

    tick();
    timerInterval = setInterval(tick, 1000);
  }

  function showDecision(intention) {
    intentionDisplay.textContent = intention + '?';
    showState(stateDecision);
  }

  function reset() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    clearSession();
    intentionInput.value = '';
    showState(stateInput);
  }

  // Event handlers
  function handleDurationClick(e) {
    const minutes = parseInt(e.target.dataset.duration, 10);
    const intention = intentionInput.value.trim();

    if (!intention) {
      intentionInput.focus();
      return;
    }

    const endTime = Date.now() + minutes * 60 * 1000;
    saveSession(intention, endTime);
    startTimer(intention, endTime);
  }

  function handleCancel() {
    const session = getSession();
    if (session) {
      const durationMinutes = Math.ceil((session.endTime - Date.now()) / 60000);
      logDelay(session.intention, durationMinutes, false);
    }
    reset();
  }

  function handleYes() {
    const session = getSession();
    if (session) {
      logDelay(session.intention, 0, true);
    }
    reset();
  }

  function handleNo() {
    const session = getSession();
    if (session) {
      logDelay(session.intention, 0, true);
    }
    reset();
  }

  // Bind events
  durationButtons.forEach(function (btn) {
    btn.addEventListener('click', handleDurationClick);
  });

  cancelBtn.addEventListener('click', handleCancel);
  yesBtn.addEventListener('click', handleYes);
  noBtn.addEventListener('click', handleNo);

  // Enable duration buttons only when there's input
  function updateButtons() {
    const hasInput = intentionInput.value.trim().length > 0;
    durationButtons.forEach(function (btn) {
      btn.disabled = !hasInput;
    });
  }

  intentionInput.addEventListener('input', updateButtons);
  updateButtons();

  // Contact modal handlers
  contactLink.addEventListener('click', function (e) {
    e.preventDefault();
    contactModal.classList.remove('hidden');
    formStatus.textContent = '';
    formStatus.className = 'form-status';
  });

  closeModal.addEventListener('click', function () {
    contactModal.classList.add('hidden');
  });

  contactModal.addEventListener('click', function (e) {
    if (e.target === contactModal) {
      contactModal.classList.add('hidden');
    }
  });

  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const formData = new FormData(contactForm);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    try {
      const response = await fetch('https://formspree.io/f/mgovgopz', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        formStatus.textContent = 'Message sent. Thank you.';
        formStatus.className = 'form-status success';
        contactForm.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (err) {
      formStatus.textContent = 'Failed to send. Try again later.';
      formStatus.className = 'form-status error';
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'Send';
  });

  // Restore session on load
  function init() {
    setRandomTagline();

    const session = getSession();

    if (session && session.endTime > Date.now()) {
      startTimer(session.intention, session.endTime);
    } else if (session) {
      // Timer expired while away
      showDecision(session.intention);
    } else {
      showState(stateInput);
    }
  }

  init();
})();
