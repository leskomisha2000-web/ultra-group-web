document.addEventListener('DOMContentLoaded', () =>  window.scrollTo(0, 0);

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  document.body.classList.remove('lux-intro-lock', 'lux-intro-done');
  document.body.classList.add('lux-intro-lock', 'mode-elektro');

  const luxIntro = document.getElementById('luxIntro');
  const scrollToSpecialization = document.getElementById('scrollToSpecialization');

  const heroBadge = document.getElementById('heroBadge');
  const heroTitle = document.getElementById('heroTitle');
  const heroText = document.getElementById('heroText');

  const heroCopy = document.querySelector('.hero-copy');
  const heroVisualCard = document.getElementById('heroVisualCard');
  const heroVisualLabel = document.getElementById('heroVisualLabel');
  const heroVisualTitle = document.getElementById('heroVisualTitle');
  const heroVisualText = document.getElementById('heroVisualText');

  const specializationTitle = document.getElementById('specializationTitle');
  const specializationText = document.getElementById('specializationText');
  const ctaTitle = document.getElementById('ctaTitle');
  const ctaText = document.getElementById('ctaText');

  const mainServiceButtons = document.querySelectorAll('.main-service-btn');
  const heroMainButtons = document.querySelectorAll('.hero-main-btn');
  const mainServicePanels = document.querySelectorAll('.main-service-panel');

  const textNodes = [
    heroBadge,
    heroTitle,
    heroText,
    heroVisualLabel,
    heroVisualTitle,
    heroVisualText,
    specializationTitle,
    specializationText,
    ctaTitle,
    ctaText
  ].filter(Boolean);

  const modeConfigs = {
  elektro: {
    badge: 'Luxusní elektroinstalace • LED osvětlení • VIP servis',
    title: 'Profesionální elektroinstalace a technická řešení bez chaosu.',
    text: 'Rozvaděče, LED osvětlení, chytré domy, hromosvody i servis přehledně na jednom místě. Čistota práce, logika a výsledek, který působí profesionálně.',
    visualLabel: 'Elektro',
    visualTitle: 'Čistá technická realizace',
    visualText: 'Rozvody, rozvaděče, LED scény a technická řešení s důrazem na detail a profesionální výsledek.',
    specializationTitle: 'Vyberte si elektro službu, která vás právě zajímá.',
    specializationText: 'Klikněte na oblast, která je pro vás aktuální. Zobrazí se konkrétní řešení, výhody i styl práce.',
    ctaTitle: 'Potřebujete profesionální elektro řešení pro dům, byt nebo firmu?',
    ctaText: 'Vyberte směr, který vás zajímá, a ozvěte se. Přehledná domluva, jasný postup a profesionální přístup od začátku do konce.'
  },

  stavba: {
    badge: 'Rekonstrukce • Stavební práce • Technické úpravy',
    title: 'Stavební práce a rekonstrukce s důrazem na systém a detail.',
    text: 'Rekonstrukce, novostavby, demolice, zednické práce i dokončovací úpravy přehledně na jednom místě. Důraz na návaznost, detail a organizaci práce.',
    visualLabel: 'Stavba',
    visualTitle: 'Pevná realizace od základu',
    visualText: 'Rekonstrukce, příprava prostoru, technické stavební zásahy a dokončovací práce s důrazem na návaznost.',
    specializationTitle: 'Vyberte si stavební službu, která vás právě zajímá.',
    specializationText: 'Klikněte na oblast, která je pro vás aktuální. Zobrazí se konkrétní služby, postup i to, co klient skutečně získá.',
    ctaTitle: 'Potřebujete spolehlivé stavební práce nebo rekonstrukci?',
    ctaText: 'Ozvěte se. Pomůžeme s rekonstrukcí, přípravou prostoru i stavebními úpravami tak, aby vše navazovalo logicky a bez zbytečného chaosu.'
  },

  uklid: {
    badge: 'Komerční prostory • Úklid po stavbě • Pravidelný servis',
    title: 'Úklid komerčních prostor a servis s důrazem na čistý výsledek.',
    text: 'Komerční prostory, kanceláře, provozy, vstupní zóny i úklid po stavbě. Čistý výsledek, reprezentativní dojem a spolehlivý servis bez zbytečných starostí.',
    visualLabel: 'Úklid',
    visualTitle: 'Čistota, která je vidět',
    visualText: 'Pravidelný servis, komerční prostory a finální úklid po stavbě s důrazem na profesionální výsledek.',
    specializationTitle: 'Vyberte si úklidovou službu, která vás právě zajímá.',
    specializationText: 'Klikněte na oblast, která je pro vás aktuální. Zobrazí se konkrétní služby, výsledek i styl práce.',
    ctaTitle: 'Potřebujete reprezentativní, čistý a dobře udržovaný prostor?',
    ctaText: 'Vyberte si typ úklidu, který potřebujete, a ozvěte se. Postaráme se o prostor tak, aby byl výsledek opravdu vidět.'
  }
};

  function setBodyMode(mode) {
    document.body.classList.remove('mode-elektro', 'mode-stavba', 'mode-uklid');
    document.body.classList.add(`mode-${mode}`);
  }

  function syncMainButtons(target) {
    mainServiceButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.main === target);
    });

    heroMainButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.main === target);
    });
  }

  function switchTextOutIn(callback) {
    textNodes.forEach((el) => el.classList.add('is-text-switching'));

    setTimeout(() => {
      callback();
      requestAnimationFrame(() => {
        textNodes.forEach((el) => el.classList.remove('is-text-switching'));
      });
    }, 180);
  }

  function updateDynamicTexts(mainKey) {
    const config = modeConfigs[mainKey];
    if (!config) return;

    switchTextOutIn(() => {
      if (heroBadge) heroBadge.textContent = config.badge;
      if (heroTitle) heroTitle.textContent = config.title;
      if (heroText) heroText.textContent = config.text;

      if (heroVisualLabel) heroVisualLabel.textContent = config.visualLabel;
      if (heroVisualTitle) heroVisualTitle.textContent = config.visualTitle;
      if (heroVisualText) heroVisualText.textContent = config.visualText;

      if (specializationTitle) specializationTitle.textContent = config.specializationTitle;
      if (specializationText) specializationText.textContent = config.specializationText;
      if (ctaTitle) ctaTitle.textContent = config.ctaTitle;
      if (ctaText) ctaText.textContent = config.ctaText;
    });
  }

  function resetInnerTabs(panelRoot) {
    if (!panelRoot) return;

    const tabs = panelRoot.querySelectorAll('.service-tab');
    const panels = panelRoot.querySelectorAll('.service-panel');

    tabs.forEach((tab, index) => {
      tab.classList.toggle('active', index === 0);
    });

    panels.forEach((panel, index) => {
      panel.classList.toggle('active', index === 0);
      panel.classList.remove('switch-fade-out', 'switch-fade-in', 'stagger-in');
    });
  }

  function animateHeroModeChange() {
    [heroVisualCard, heroCopy, heroBadge].forEach((el) => {
      if (!el) return;
      el.classList.remove('mode-flash');
      void el.offsetWidth;
      el.classList.add('mode-flash');
    });
  }

  function switchMainPanel(target) {
    const nextMainPanel = document.querySelector(`[data-main-panel="${target}"]`);
    if (!nextMainPanel) return;

    const heroBadgeEl = heroBadge;
    const heroCopyEl = heroCopy;
    const heroVisualCardEl = heroVisualCard;

    [heroBadgeEl, heroCopyEl, heroVisualCardEl].forEach((el) => {
      if (el) el.classList.add('switch-fade-out');
    });

    setTimeout(() => {
      syncMainButtons(target);
      setBodyMode(target);
      updateDynamicTexts(target);

      mainServicePanels.forEach((panel) => panel.classList.remove('active'));

      resetInnerTabs(nextMainPanel);

      requestAnimationFrame(() => {
        nextMainPanel.classList.add('active');
        nextMainPanel.classList.remove('stagger-in');
        void nextMainPanel.offsetWidth;
        nextMainPanel.classList.add('stagger-in');

        [heroBadgeEl, heroCopyEl, heroVisualCardEl].forEach((el) => {
          if (!el) return;
          el.classList.remove('switch-fade-out');
          el.classList.remove('switch-fade-in');
          void el.offsetWidth;
          el.classList.add('switch-fade-in');
        });

        animateHeroModeChange();
      });
    }, 220);
  }

  const handledHeroButtons = new WeakSet();

mainServiceButtons.forEach((button) => {
  if (button.classList.contains('hero-main-btn')) return;

  button.addEventListener('click', () => {
    switchMainPanel(button.dataset.main);
  });
});

heroMainButtons.forEach((button) => {
  if (handledHeroButtons.has(button)) return;
  handledHeroButtons.add(button);

  button.addEventListener('click', () => {
    switchMainPanel(button.dataset.main);
  });
});

  document.querySelectorAll('.main-service-panel').forEach((mainPanel) => {
    const tabs = mainPanel.querySelectorAll('.service-tab');
    const panels = mainPanel.querySelectorAll('.service-panel');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.service;
        const nextPanel = mainPanel.querySelector(`[data-panel="${target}"]`);
        if (!nextPanel) return;

        tabs.forEach((btn) => btn.classList.remove('active'));
        tab.classList.add('active');

        const currentActive = mainPanel.querySelector('.service-panel.active');

        if (currentActive) {
          currentActive.classList.add('switch-fade-out');
        }

        setTimeout(() => {
  panels.forEach((panel) => {
    panel.classList.remove('active', 'switch-fade-out', 'switch-fade-in', 'stagger-in');
    panel.style.display = 'none';
  });

  nextPanel.style.display = 'grid';
  nextPanel.classList.add('active');
  void nextPanel.offsetWidth;
  nextPanel.classList.add('switch-fade-in', 'stagger-in');
}, 180);
      });
    });
  });

  if (scrollToSpecialization) {
    scrollToSpecialization.addEventListener('click', () => {
      const specializationSection = document.getElementById('sluzby');
      if (specializationSection) {
        specializationSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  function setupTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (event) => {
        if (window.innerWidth < 900) return;

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 6;
        const rotateX = ((centerY - y) / centerY) * 6;

        card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  syncMainButtons('elektro');
  setBodyMode('elektro');
  updateDynamicTexts('elektro');
  setupTiltCards();

  setTimeout(() => {
    if (luxIntro) {
      luxIntro.classList.add('is-hidden');
    }

    document.body.classList.remove('lux-intro-lock');
    document.body.classList.add('lux-intro-done');
  }, 2800);
    window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
  });
});
