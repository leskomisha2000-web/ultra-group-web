document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('intro-lock', 'intro-done', 'intro3-lock', 'intro3-done');
  document.body.classList.add('lux-intro-lock', 'mode-elektro');

  const luxIntro = document.getElementById('luxIntro');

  const heroConfigs = {
    elektro: {
      badge: 'Luxusní elektroinstalace • LED osvětlení • VIP servis',
      title: 'Profesionální elektroinstalace a technická řešení bez chaosu.',
      text: 'Rozvaděče, LED osvětlení, chytré domy, hromosvody i servis přehledně na jednom místě. Čistota práce, logika a výsledek, který působí profesionálně.',
      specializationTitle: 'Vyberte si elektro službu, která vás právě zajímá.',
      specializationText: 'Klikněte na oblast, která je pro vás aktuální. Zobrazí se konkrétní řešení, výhody i styl práce.',
      ctaTitle: 'Potřebujete profesionální elektro řešení pro dům, byt nebo firmu?',
      ctaText: 'Vyberte směr, který vás zajímá, a ozvěte se. Přehledná domluva, jasný postup a profesionální přístup od začátku do konce.'
    },
    stavba: {
      badge: 'Rekonstrukce • Stavební práce • Technické úpravy',
      title: 'Stavební práce, které mají systém, tempo a čistý výsledek.',
      text: 'Rekonstrukce, novostavby, demolice, zednické práce i dokončovací úpravy přehledně na jednom místě. Důraz na návaznost, detail a organizaci práce.',
      specializationTitle: 'Vyberte si stavební službu, která vás právě zajímá.',
      specializationText: 'Klikněte na oblast, která je pro vás aktuální. Zobrazí se konkrétní služby, postup i to, co klient skutečně získá.',
      ctaTitle: 'Potřebujete spolehlivé stavební práce nebo rekonstrukci?',
      ctaText: 'Ozvěte se. Pomůžeme s rekonstrukcí, přípravou prostoru i stavebními úpravami tak, aby vše navazovalo logicky a bez zbytečného chaosu.'
    },
    uklid: {
      badge: 'Úklid bytů • Domů • Firemních prostor',
      title: 'Úklidové služby, kde je výsledek opravdu vidět.',
      text: 'Generální úklid, pravidelný servis, úklid po stavbě i péče o byty, domy a firemní prostory. Čistý výsledek, reprezentativní dojem a méně starostí pro klienta.',
      specializationTitle: 'Vyberte si úklidovou službu, která vás právě zajímá.',
      specializationText: 'Klikněte na oblast, která je pro vás aktuální. Zobrazí se konkrétní služby, výsledek i styl práce.',
      ctaTitle: 'Potřebujete čistý, reprezentativní a dobře udržovaný prostor?',
      ctaText: 'Vyberte si typ úklidu, který potřebujete, a ozvěte se. Postaráme se o čistotu prostoru tak, aby byl výsledek vidět i cítit.'
    }
  };

  const heroBadge = document.getElementById('heroBadge');
  const heroTitle = document.getElementById('heroTitle');
  const heroText = document.getElementById('heroText');
  const specializationTitle = document.getElementById('specializationTitle');
  const specializationText = document.getElementById('specializationText');
  const ctaTitle = document.getElementById('ctaTitle');
  const ctaText = document.getElementById('ctaText');

  const dynamicTextNodes = [
    heroBadge,
    heroTitle,
    heroText,
    specializationTitle,
    specializationText,
    ctaTitle,
    ctaText
  ].filter(Boolean);

  const mainServiceButtons = document.querySelectorAll('.main-service-btn');
  const heroMainButtons = document.querySelectorAll('.hero-main-btn');
  const mainServicePanels = document.querySelectorAll('.main-service-panel');

  function setBodyMode(mode) {
    document.body.classList.remove('mode-elektro', 'mode-stavba', 'mode-uklid');
    document.body.classList.add(`mode-${mode}`);
  }

  function switchTextOutIn(callback) {
    dynamicTextNodes.forEach((el) => el.classList.add('is-text-switching'));

    setTimeout(() => {
      callback();
      dynamicTextNodes.forEach((el) => el.classList.remove('is-text-switching'));
    }, 180);
  }

  function updateDynamicTexts(mainKey) {
    const config = heroConfigs[mainKey];
    if (!config) return;

    switchTextOutIn(() => {
      if (heroBadge) heroBadge.textContent = config.badge;
      if (heroTitle) heroTitle.textContent = config.title;
      if (heroText) heroText.textContent = config.text;
      if (specializationTitle) specializationTitle.textContent = config.specializationTitle;
      if (specializationText) specializationText.textContent = config.specializationText;
      if (ctaTitle) ctaTitle.textContent = config.ctaTitle;
      if (ctaText) ctaText.textContent = config.ctaText;
    });
  }

  function syncMainButtons(target) {
    mainServiceButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.main === target);
    });

    heroMainButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.main === target);
    });
  }

  function switchMainPanel(target) {
    const nextMainPanel = document.querySelector(`[data-main-panel="${target}"]`);
    if (!nextMainPanel) return;

    syncMainButtons(target);
    setBodyMode(target);
    updateDynamicTexts(target);

    mainServicePanels.forEach((panel) => panel.classList.remove('active'));

    requestAnimationFrame(() => {
      nextMainPanel.classList.add('active');
    });
  }

  mainServiceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      switchMainPanel(button.dataset.main);
    });
  });

  heroMainButtons.forEach((button) => {
    button.addEventListener('click', () => {
      switchMainPanel(button.dataset.main);

      const specializationSection = document.getElementById('sluzby');
      if (specializationSection) {
        specializationSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
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

        panels.forEach((panel) => panel.classList.remove('active'));

        requestAnimationFrame(() => {
          nextPanel.classList.add('active');
        });
      });
    });
  });

  const scrollToSpecialization = document.getElementById('scrollToSpecialization');
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

  setTimeout(() => {
    if (luxIntro) {
      luxIntro.classList.add('is-hidden');
    }

    document.body.classList.remove('lux-intro-lock');
    document.body.classList.add('lux-intro-done');
  }, 2800);

  syncMainButtons('elektro');
  setBodyMode('elektro');
});
