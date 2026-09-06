import Image from 'next/image';

const EMAIL = 'califidrescue@gmail.com';
const PETFINDER = 'https://www.petfinder.com/member/us/ca/modesto/cali-fid-parrot-exotics-rescue-sanctuary-ca1970/';
const APPLICATION = 'https://www.califidparrotandexotic.com/forms/adoption-application.html';
const emailLink = (subject: string) => 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject);

const animals = [
  { name: 'Parrots & birds', image: 'parrot.jpg', alt: 'Kissy Girl, a green and red conure from the Cali_FID photo archive', detail: 'Big personalities. Remarkable companions.' },
  { name: 'Lizards', image: 'lizard.jpg', alt: 'Iguana photographed for the Cali_FID rescue gallery', detail: 'A little patience. A world of personality.' },
  { name: 'Turtles & tortoises', image: 'tortoise.jpg', alt: 'Tortoise on the grass in the Cali_FID rescue gallery', detail: 'A slower pace. The same need for care.' },
  { name: 'Snakes', image: 'snake.jpg', alt: 'Close-up of a snake from the Cali_FID rescue gallery', detail: 'Beautifully different. Equally deserving.' },
];
const questions = [
  ['How do I adopt an animal?', 'Start with Cali_FID’s Petfinder profile to see published listings, then complete the adoption application on the rescue’s original website. Include your experience, household information, and photos of the appropriate enclosure. Check your email, including spam, for next steps. If the application is unavailable, email the rescue for guidance.'],
  ['Can I visit or have an animal shipped to me?', 'Visits and adoptions are by appointment. All adoptions must be completed in person; Cali_FID does not ship animals. Contact the rescue and arrange a meeting before traveling.'],
  ['Can you take an animal I can no longer care for?', 'Intake depends on available foster space and the animal’s needs. Email with the species, your location, and a brief description of the situation. Please wait for confirmation before transporting an animal. Placement cannot be guaranteed.'],
  ['What should I prepare before adopting?', 'Be ready to discuss species-appropriate care, suitable housing, and your experience. The rescue’s published policy also asks for veterinary and personal references and a signed agreement. Adoption fees vary by animal; confirm the fee and accepted payment method directly.'],
  ['Can I help if I cannot adopt?', 'Absolutely. Ask about fostering, volunteering, or supplies the rescue currently needs. Share your location, availability, and any experience with birds or exotic animals so the team can discuss a useful way to help.'],
  ['Are the animals pictured here available?', 'Our gallery photographs celebrate animals in Cali_FID’s history. They are not a live adoption list. Follow the Petfinder link for published listings and confirm availability with the rescue.'],
];
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className="arrow" aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="announcement"><span>Small rescue. Wholehearted care.</span><a href="#contact">Modesto, California</a></div>
      <header className="site-header" id="top"><div className="shell header-inner">
        <a className="brand" href="#top" aria-label="Cali_FID Rescue home"><span className="brand-name">Cali_FID<span className="brand-dot">.</span></span><span className="brand-subtitle">Parrot & Exotics Rescue</span></a>
        <nav aria-label="Main navigation"><a href="#mission">Our story</a><a href="#animals">Our animals</a><a href="#adoption">Adopt</a><a href="#contact">Contact</a><a className="nav-cta" href="#help">Lend a hand <Arrow /></a></nav>
      </div></header>
      <main id="main-content" tabIndex={-1}>
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> A little rescue with a lot of heart</p>
            <h1 id="hero-title">Every life deserves a <em>softer landing.</em></h1>
            <p className="lead">Feathered, scaled, and wonderfully different. Helping parrots and exotic animals find the care—and the home—they deserve.</p>
            <div className="button-row"><a className="button button-dark" href={PETFINDER} target="_blank" rel="noreferrer" aria-label="Find your companion (opens in a new tab)">Find your companion <Arrow diagonal /></a><a className="text-link" href="#help">Be part of their story <Arrow /></a></div>
            <div className="hero-footnote"><span className="mini-label">ROOTED IN MODESTO</span><span>Foster-based rescue. Community-powered care.</span></div>
          </div>
          <figure className="hero-visual">
            <div className="hero-photo"><Image src="/images/hero-parrot.jpg" alt="Jayjay, a ruby macaw pictured by Cali_FID on Petfinder" fill sizes="(max-width: 760px) 100vw, 48vw" priority unoptimized /></div>
            <div className="photo-stamp"><span>Every kind.</span><span>Every personality.</span><strong>Every bit of heart.</strong></div>
            <figcaption>Jayjay, from Cali_FID’s Petfinder profile <span aria-hidden="true">↗</span></figcaption>
          </figure>
        </section>
        <div className="values-strip"><div className="shell"><span>Foster-home based</span><span aria-hidden="true">✳</span><span>Adoptions by appointment</span><span aria-hidden="true">✳</span><span>No shipping</span><span aria-hidden="true">✳</span><span>Modesto, California</span></div></div>
        <section className="current-status shell" aria-labelledby="status-title"><div className="status-heading"><p className="eyebrow">Current status</p><h2 id="status-title">A clear place to begin.</h2><p>Reviewed September 5, 2026. Availability and capacity can change, so please confirm directly.</p></div><div className="status-grid"><div><span>ADOPTIONS</span><strong>See Petfinder listings</strong><a href={PETFINDER} target="_blank" rel="noreferrer" aria-label="View current listings on Petfinder (opens in a new tab)">View current listings <Arrow diagonal /></a></div><div><span>VISITS</span><strong>By appointment</strong><p>Arrange a meeting before traveling.</p></div><div><span>INTAKE</span><strong>Email first</strong><p>Foster capacity determines what is possible.</p></div><div><span>TRANSPORT</span><strong>In person only</strong><p>Cali_FID does not ship animals.</p></div></div></section>
        <section className="quick-start shell" aria-labelledby="quick-start-title"><div className="quick-start-copy"><p className="eyebrow">Start here</p><h2 id="quick-start-title">One good next step.</h2></div><div className="quick-actions"><a href="#adoption"><span>Looking to adopt?</span><Arrow diagonal /></a><a href={emailLink('I need help rehoming an animal')}><span>Need to rehome an animal?</span><Arrow diagonal /></a><a href="#help"><span>Ready to lend a hand?</span><Arrow diagonal /></a></div></section>
        <section className="section shell story" id="mission" aria-labelledby="story-title">
          <div><p className="eyebrow">01 / Our story</p><h2 id="story-title">Different needs.<br /><em>The same big love.</em></h2></div>
          <div className="story-copy"><p className="large-copy">Not every rescue has feathers. Not every companion has fur. They all deserve a chance.</p><p>Cali_FID began in 1998, when founder Jennifer Perez saw the need for specialized care for parrots and exotic animals. That idea grew into a rescue rooted in Modesto and a community of people willing to help.</p><p>Our purpose is rescue, rehabilitation, education, adoption, and sanctuary for animals who cannot live as pets. Through foster homes and individual attention, care starts with the needs of each animal.</p><a className="text-link" href="#help">Help write the next chapter <Arrow /></a></div>
          <div className="story-aside"><span className="story-year">1998</span><span>Where our story began</span><span className="story-name">Cali_FID means <strong>California Feathered Kids.</strong></span></div>
        </section>
        <section className="animal-section" id="animals" aria-labelledby="animals-title"><div className="section shell">
            <div className="section-top"><div><p className="eyebrow">02 / The animals at the heart of it</p><h2 id="animals-title">A whole world<br />of <em>wonderful.</em></h2></div><div className="section-intro"><p>From birds to reptiles, every animal has its own story—and its own needs. Meet a few of the kinds of companions in Cali_FID’s history.</p><a className="text-link" href={PETFINDER} target="_blank" rel="noreferrer" aria-label="See adoption listings on Petfinder (opens in a new tab)">See adoption listings on Petfinder <Arrow diagonal /></a></div></div>
          <div className="animal-grid">{animals.map((animal, i) => <article className="animal-card" key={animal.name}><div className="animal-photo"><Image src={'/images/' + animal.image} alt={animal.alt} fill sizes="(max-width: 520px) 100vw, (max-width: 1100px) 50vw, 25vw" unoptimized /><span className="animal-index">0{i + 1}</span></div><h3>{animal.name}</h3><p>{animal.detail}</p></article>)}</div>
          <p className="gallery-note">A look back, not a live availability list. These are original Cali_FID gallery photographs. Small mammals are also part of the rescue’s work; intake always depends on foster capacity.</p>
        </div></section>
        <section className="adoption-section" id="adoption" aria-labelledby="adoption-title"><div className="section shell adoption-layout">
          <div className="adoption-intro"><p className="eyebrow">03 / A home, not just a house</p><h2 id="adoption-title">The right match<br />is worth <em>the care.</em></h2><p>Adoption is a commitment to a whole life. Let’s start with the animal’s needs, your experience, and a thoughtful conversation.</p><a className="button button-yellow" href={PETFINDER} target="_blank" rel="noreferrer" aria-label="Explore adoption listings on Petfinder (opens in a new tab)">Explore adoption listings <Arrow diagonal /></a><p className="appointment-note">By appointment · In-person adoptions · No shipping</p></div>
          <ol className="adoption-steps"><li><span>01</span><div><h3>Find a possible match</h3><p>Browse Cali_FID’s Petfinder profile. Read the animal’s story and care needs, and confirm availability with the rescue.</p></div></li><li><span>02</span><div><h3>Tell us about your home</h3><p>Complete the rescue’s adoption application. Be ready to share your experience and photographs of a suitable cage or enclosure.</p><a className="text-link" href={APPLICATION} target="_blank" rel="noreferrer" aria-label="Open the adoption application (opens in a new tab)">Open the adoption application <Arrow diagonal /></a></div></li><li><span>03</span><div><h3>Meet, connect, and prepare</h3><p>The team will contact you about next steps and an in-person appointment. Check your spam folder, too.</p></div></li></ol>
        </div></section>
        <section className="section shell help-section" id="help" aria-labelledby="help-title">
          <div className="section-top"><div><p className="eyebrow">04 / Good people make it possible</p><h2 id="help-title">You don’t need wings<br />to <em>lift someone up.</em></h2></div><p className="section-intro">A little time. A safe space. A practical gift. There’s more than one way to make a difference.</p></div>
          <div className="help-grid">
            <article className="help-card foster-card"><span className="help-number">01 / OPEN YOUR HOME</span><h3>A safe place<br />in between.</h3><p>Foster homes make room for rescue. Tell us about your space and experience, and ask what fostering could look like for you.</p><a className="text-link" href={emailLink('I would like to learn about fostering')}>Ask about fostering <Arrow /></a></article>
            <article className="help-card volunteer-card"><span className="help-number">02 / GIVE YOUR TIME</span><h3>Your time.<br />Their new chapter.</h3><p>Bring your skills, care, and willingness to help. Share your availability and interests with our volunteer team.</p><a className="text-link" href={emailLink('I would like to volunteer with Cali_FID')}>Explore volunteering <Arrow /></a></article>
            <article className="help-card support-card"><span className="help-number">03 / SUPPORT THE EVERYDAY</span><h3>Small gifts.<br />Meaningful care.</h3><p>Help support food, enrichment, and day-to-day care. Ask which supplies or donation options are most useful right now.</p><a className="text-link" href={emailLink('I would like to support Cali_FID')}>Ask about donating <Arrow /></a></article>
          </div><p className="help-note">Please confirm current needs before buying supplies or arranging a drop-off.</p>
        </section>
        <section className="faq-section" id="questions" aria-labelledby="faq-title"><div className="section shell faq-layout"><div><p className="eyebrow">A few things to know</p><h2 id="faq-title">Good questions.<br /><em>Caring answers.</em></h2><p>Wondering about something else?</p><a className="text-link" href="#contact">Let’s talk <Arrow /></a></div><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></section>
        <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="section shell contact-layout"><div><p className="eyebrow">A kind next step starts here</p><h2 id="contact-title">Let’s make<br /><em>something good happen.</em></h2><a className="contact-email" href={emailLink('Hello Cali_FID')}>{EMAIL} <Arrow diagonal /></a><p className="email-hint">Opens your email app. You can also copy the address above.</p></div><div className="contact-details"><div><span>WHERE WE ARE</span><p>Modesto, California<br />Foster-home based, by appointment.</p></div><div><span>BEFORE YOU REACH OUT</span><p>Include your location, the animal or species, and how you’d like to help. Current intake and appointments must be confirmed directly.</p></div><a className="text-link" href={PETFINDER} target="_blank" rel="noreferrer" aria-label="Visit Cali_FID on Petfinder (opens in a new tab)">Cali_FID on Petfinder <Arrow diagonal /></a></div></div></section>
      </main>
      <footer className="site-footer"><div className="shell footer-top"><a className="brand" href="#top"><span className="brand-name">Cali_FID<span className="brand-dot">.</span></span><span className="brand-subtitle">Parrot & Exotics Rescue Sanctuary</span></a><p>For the feathered.<br />The scaled. The wonderfully different.</p><nav aria-label="Footer navigation"><a href="#adoption">Adoption</a><a href="#help">Get involved</a><a href="#questions">FAQs</a><a href="#contact">Contact</a></nav></div><div className="shell footer-bottom"><span>© Cali_FID Parrot & Exotics Rescue Sanctuary</span><a href="#top">Back to the top ↑</a></div></footer>
    </>
  );
}
