// Second content file: role lines for the project pages, the video for Muara App, and the "More work" lists.
(() => {
  const D = window.DATA;
  const X = {
    influence: { statement: 'I designed Influence end to end at Providea, from the product requirements to a design system and a working web app.', steps: ['Wrote the PRD with the catalogue as the hook', 'Mapped flows for specialists, agencies and KOLs', 'Built the design system and hi-fi screens in Figma', 'Built and tested the web app in rounds'] },
    simako: { statement: 'I led design for SIMAKO at Muara Studio, from the first pitch to user acceptance testing with museum staff.', steps: ['Mapped how registrars, curators and conservators work', 'Designed collection, storage, loan and report modules', 'Set the type scale, condition colours and components', 'Ran UAT and refined the interface with users'] },
    avp: { statement: 'I redesign dashboard modules with business analysts and engineers, and keep every module on one design system.', steps: ['Gathered requirements with business analysts', 'Reworked information architecture and flows', 'Built and maintained the design system', 'Supported engineers through delivery'] },
    jalana: { statement: 'I own the product and its design: the app for phone and tablet, the CMS, the promo site and the investor story.', steps: ['Defined the visitor journey from arrival to notebook', 'Designed phone and tablet screens together', 'Designed the CMS for museum teams', 'Made the promo site, deck and motion film'] },
    abhitek: { statement: 'I designed and built the web console and the field app, then checked both against real work scenarios.', steps: ['Turned client decisions into product scope', 'Designed the console for the office', 'Designed the phone app for field conditions', 'Built both front ends and the demo site'] },
    muaraapp: { statement: 'I designed the interface and visual assets with my academy team, using a challenge-based learning framework.', steps: ['Researched student tours with the museum', 'Designed the AR modules and interface', 'Created the visual assets', 'Tested and exhibited at the museum'], yt: '7tJlfobtm6U', ytStart: 3 },
    repatriasi: { statement: 'I led UX for the kiosks and games with the MDA and Octalysis frameworks. The approach continued in Pameran NYALA and Sunting in 2025.', steps: ['Framed visitor goals with curators', 'Designed kiosk flows and game mechanics', 'Directed 3D scans and AR content', 'Deployed and observed on the exhibition floor'] },
    vinfast: { statement: 'I led the partnership and the experience design, from the booth problem to the app on the show floor.', steps: ['Framed the booth-space problem with the brand', 'Designed the AR flow and information panels', 'Directed 3D and LiDAR work', 'Supported the team on site'] },
    albarsha: { statement: 'I designed the company profile for Albarsha Group, and carried the same system into their decks and the Roster platform for KOL teams.', steps: ['Mapped the group, its seven companies and their services', 'Structured the pages around what brands ask first', 'Designed the layout, type and motion', 'Prepared the cases and the company deck for the site'] },
    cribl: { statement: 'I designed the game and its terminal look so the booth team had a reason for people to stop and a way to follow up.', steps: ['Framed the booth goal: draw visitors, collect leads', 'Designed the rules, hints and time limit', 'Designed the terminal interface for iPad', 'Added the lead form and the leaderboard'] }
  };
  D.projects.forEach((p) => Object.assign(p, X[p.id] || {}));

  D.xp[0] = ['Oct 2026 · Present', 'Product Designer (project based)', 'Providea', 'Shaped the brand and designed Influence and Loyalty, two SaaS products.'];
  D.xp[1] = ['May 2026 · Aug 2026', 'Product Designer (project based)', 'Albarsha Group', 'Roster KOL platform, a community app concept and pitch decks.'];

  const fig = (key) => `https://embed.figma.com/slides/${key}?embed-host=share`;
  // Row: [name, note, link or null, modal or null]. First 7 show, the rest sit behind "See more".
  D.more = [
    ['Websites', [
      ['muarastudio.com', 'Studio site + CMS', 'https://muarastudio.com'],
      ['Providea', 'Brand site', 'https://muara-studio.github.io/providea/'],
      ['albarsha.group', 'Company site', 'https://www.albarsha.group'],
      ['Nurseri Lestari', 'Plant nursery', 'https://nurserilestari.com'],
      ['Moto Ijo', 'EV dealer', 'https://muara-studio.github.io/motoijo/'],
      ['Berkah Prima Karya', 'Glass and aluminium', 'https://berkahprimakarya.com/'],
      ['PARAS by Muara', 'Studio experiment', 'https://paras.muarastudio.com'],
      ['Providea Loyalty', 'Product demo', 'https://muara-studio.github.io/providea/loyalty/'],
      ['Bali Strat', 'Property advisory', 'https://www.balistrat.com/'],
      ['Sinar Digital Printing', 'Merchandise print', 'https://sinardigitalprinting.vercel.app'],
      ['Full Senyum', 'Print and souvenir', 'https://full-senyum.github.io'],
      ['CKG Recycle', 'Waste management', 'https://ckgrecycle.com/'],
      ['Casa Nira Uluwatu', 'Luxury villa', 'https://www.casanirauluwatu.com/'],
      ['KACA Kreatif', 'Creative agency', 'https://www.kacakreatif.com/']
    ]],
    ['Exhibitions and activations', [
      ['Pameran Repatriasi', 'Museum Nasional, 2023', null, { img: 'repatriasi-1', text: 'An exhibition of relics returned to Indonesia, including the Singhasari statues. Muara Studio worked with Historia, the National Museum of Indonesia and the Ministry of Education and Culture on the digital experience.', facts: [['Venue', 'Museum Nasional Indonesia'], ['Year', '2023'], ['Role', 'Managing Partner, Muara Studio'], ['Made', 'Kiosks, website access, games']] }],
      ['Repatriasi 2.0 Pitamaha', 'Museum Nasional, 2024', null, { img: 'repatriasi-1', text: 'The second edition. Interactive kiosks and gamified experiences built on the MDA and Octalysis frameworks, with 3D-scanned artifacts and AR content.', facts: [['Role', 'Lead UX Designer'], ['Visitor interaction', 'Up 89%'], ['Visitor retention', 'Up 30%'], ['Delivery', '2 months']], link: ['Open the project page', 'work.html?k=repatriasi'] }],
      ['Pameran Sunting', 'Museum Nasional, 2025', null, { img: 'sunting-1', text: 'Interactive pieces for an exhibition at Museum Nasional: visitor reflections, live polling on screen and a digital archive kiosk.', facts: [['Venue', 'Museum Nasional Indonesia'], ['Year', '2025'], ['Made', 'Reflections, live polling, digital archive']] }],
      ['Pameran NYALA', 'Galeri Nasional, 2025', null, { img: 'nyala-1', text: 'Interactive pieces for an exhibition at Galeri Nasional: a diary turned into an interactive archive, an AI persona to talk with, and side-by-side painting comparison.', facts: [['Venue', 'Galeri Nasional Indonesia'], ['Year', '2025'], ['Made', 'Interactive archive, AI persona, comparison tool']] }],
      ['VinFast VF3 launch', 'IIMS 2025', null, { vid: 'vinfast-hero', text: 'An AR configurator for the VinFast VF3 launch at JIExpo Kemayoran. Visitors see the car in 360 degrees, switch between 8 colours and place it on the booth floor through the camera.', facts: [['Event', 'IIMS 2025, Jakarta'], ['Role', 'Managing Partner, Muara Studio'], ['Made', 'AR configurator for iPad']], more: ['vinfast-4', 'vinfast-5', 'vinfast-3'], link: ['Open the project page', 'work.html?k=vinfast'] }],
      ['VinFast showroom AR', 'Roadshow, 2025', null, { vid: 'vinfast-ar', text: 'The AR experience continued after the launch as part of a longer partnership for roadshows and showrooms.', facts: [['Year', '2025'], ['Made', 'AR app for showroom and roadshow use']], more: ['vinfast-5', 'vinfast-3', 'vinfast-4'] }]
    ]],
    ['Products, concepts and decks', [
      ['Arcantara', 'Game UI, with EntPoint', null, { ph: 'Arcantara', text: 'A 3D conservator game for phone and tablet, made with EntPoint Studio. The player restores museum objects in a lab and shows them in a gallery. I design the interface.', facts: [['Type', 'Game interface'], ['With', 'EntPoint Studio'], ['Status', 'In design, 2026']] }],
      ['Albarsha Roster', 'KOL platform preview', 'https://muara-studio.github.io/rosterKOL/'],
      ['Muara POC library', 'Proofs of concept', 'https://muarastudio.com/poc'],
      ['Himalaya community app', 'Concept site', 'https://muara-studio.github.io/himalaya-wellness/'],
      ['ZISWAF Indosat', 'Crowdfunding platform', 'https://amalbaik.org/'],
      ['Albarsha company profile', 'Deck, 2026', null, { deck: fig('87aFHlrgtXSURygGi5X0Ee') }],
      ['COCAF 2026', 'Pitch deck', null, { deck: fig('i5Hg2I5bvCvxP0cV4FcAGi') }],
      ['BSI 2027 activation', 'Pitch deck', null, { deck: fig('6ukpJxc8x6rcgtHKnsWR5N') }],
      ['Well Beyond 360', 'Campaign deck', null, { deck: fig('0ligNn8MURn5iqcxnlIALn') }],
      ['KITA Apps', 'Mobile app, 2022', null, { ph: 'KITA Apps', text: 'KITA Apps from V1 to Kita Care, with e-commerce features and the company website, from concept to usability testing.', facts: [['Role', 'Product Designer'], ['Period', 'Mar 2022 to May 2023'], ['Team', 'Mentored 3 junior designers']] }],
      ['Flexy DMS', 'SaaS app, 2023', null, { ph: 'Flexy DMS', text: 'Design system, company profile and DMS SaaS app for Flexy.', facts: [['Role', 'UI/UX Designer'], ['Consistency and efficiency', 'Up 20%'], ['Support tickets', 'Down 10%']] }],
      ['YomConnect', 'Website, 2023', null, { ph: 'YomConnect', text: 'Website revamp for an Australian company through The Digital Cellar.', facts: [['Role', 'Web Designer'], ['User engagement', 'Up 30%'], ['Turnaround', '15% faster']] }]
    ]]
  ];
})();
