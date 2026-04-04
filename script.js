document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('intro-lock');

  const introLoader = document.getElementById('introLoader');

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

  const mainServiceButtons = document.querySelectorAll('.main-service-btn');
  const mainServicePanels = document.querySelectorAll('.main-service-panel');

  function updateDynamicTexts(mainKey) {
    const config = heroConfigs[mainKey];
    if (!config) return;

    if (heroBadge) heroBadge.textContent = config.badge;
    if (heroTitle) heroTitle.textContent = config.title;
    if (heroText) heroText.textContent = config.text;
    if (specializationTitle) specializationTitle.textContent = config.specializationTitle;
    if (specializationText) specializationText.textContent = config.specializationText;
    if (ctaTitle) ctaTitle.textContent = config.ctaTitle;
    if (ctaText) ctaText.textContent = config.ctaText;
  }

  function switchMainPanel(target) {
    const nextMainPanel = document.querySelector(`[data-main-panel="${target}"]`);
    if (!nextMainPanel) return;

    mainServiceButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.main === target);
    });

    mainServicePanels.forEach((panel) => {
      panel.classList.remove('active');
    });

    setTimeout(() => {
      nextMainPanel.classList.add('active');
    }, 120);

    updateDynamicTexts(target);
  }

  mainServiceButtons.forEach((button) => {
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

        panels.forEach((panel) => {
          panel.classList.remove('active');
        });

        setTimeout(() => {
          nextPanel.classList.add('active');
        }, 120);
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
    if (introLoader) {
      introLoader.classList.add('is-hidden');
    }
    document.body.classList.remove('intro-lock');
  }, 2600);

  updateDynamicTexts('elektro');
});
