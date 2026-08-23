import type { CSSProperties } from 'react';

const EMAIL = 'califidrescue@gmail.com';
const animals = [
  { name: 'Parrots', description: 'Parrots and other pet birds', alt: 'Green parrot in Cali_FID’s historical photo gallery', crop: { '--crop-x': '-310.77%', '--crop-y': '-302.06%' } },
  { name: 'Lizards', description: 'Lizards and other scaled companions', alt: 'Lizard in Cali_FID’s historical photo gallery', crop: { '--crop-x': '-513.85%', '--crop-y': '-302.06%' } },
  { name: 'Turtles & Tortoises', description: 'Turtles, tortoises, and their specialized care needs', alt: 'Tortoise in Cali_FID’s historical photo gallery', crop: { '--crop-x': '-311.54%', '--crop-y': '-568.09%' } },
  { name: 'Snakes', description: 'Snakes and other reptiles', alt: 'Coiled snake in Cali_FID’s historical photo gallery', crop: { '--crop-x': '-513.85%', '--crop-y': '-568.09%' } },
];
const steps = [
  ['01', 'Start with an email', 'Tell us what you are hoping to learn or discuss.'],
  ['02', 'Talk through the animal’s needs', 'Care requirements, enclosure, experience, and fit matter.'],
  ['03', 'Confirm the next step', 'Adoption and intake availability must be confirmed directly.'],
];
const programs = [
  ['Foster', 'Open your home when capacity and animal needs align.'],
  ['Volunteer', 'Offer time, transport, outreach, or species-specific experience.'],
  ['Adopt', 'Explore a thoughtful match when an animal is ready.'],
  ['Support', 'Ask which supplies or practical help are most useful right now.'],
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="notice-bar">Availability changes with foster capacity <span aria-hidden="true">·</span> Email before visiting, surrendering, or applying</div>
      <header className="site-header" id="top">
        <div className="nav-shell">
          <a className="brand" href="#top" aria-label="Cali_FID home">
            <span className="brand-mark" aria-hidden="true">CF</span>
            <span><strong>Cali_FID</strong><small>Parrot & Exotic Rescue Sanctuary</small></span>
          </a>
          <nav aria-label="Primary navigation">
            <a href="#mission">About</a><a href="#animals">Animals</a><a href="#adoption">Adoption</a><a href="#help">Get involved</a><a href="#questions">Questions</a><a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-inner">
            <div className="hero-content">
              <p className="eyebrow">Modesto, California</p>
              <h1 id="hero-title">A safe landing place for parrots and exotic animals.</h1>
              <p className="hero-copy">Cali_FID is a Modesto-based rescue sanctuary with a long history of supporting exotic animals through care, education, rehabilitation, and sanctuary.</p>
              <div className="hero-action">
                <a className="primary-cta" href={`mailto:${EMAIL}`} aria-label={`Email Cali_FID at ${EMAIL}`}>Email Cali_FID</a>
                <p>Questions about adoption, surrender, fostering, or support are welcome by email.</p>
              </div>
            </div>
            <div className="hero-portrait" aria-label="Historical Cali_FID gallery photo of a green parrot">
              <div className="hero-photo archive-crop" style={{ '--crop-x': '-218.82%', '--crop-y': '-131.43%' } as CSSProperties}><img src="/archive-gallery.png" alt="Green parrot in Cali_FID’s historical photo gallery" width="1440" height="1000" /></div>
              <div className="hero-card"><span>Community care</span><strong>Rescue · Foster · Rehabilitate</strong></div>
            </div>
          </div>
        </section>

        <section className="section mission" id="mission" aria-labelledby="mission-title">
          <div className="section-heading"><p className="eyebrow">Our purpose</p><h2 id="mission-title">Care that meets each animal where it is.</h2></div>
          <div className="mission-copy">
            <p>Cali_FID’s historic mission is to improve standards of care for exotic animals through education, rehabilitation, adoption, and sanctuary for animals that cannot live as pets.</p>
            <p>Each animal’s needs are individual. The goal is to support mental and physical well-being and help identify the most appropriate next step—foster care, an adoptive home, or lifelong sanctuary.</p>
          </div>
          <div className="feature-row" aria-label="Cali_FID services"><span>Rescue & rehabilitation</span><span>Education & responsible care</span><span>Foster, adoption & sanctuary</span></div>
        </section>

        <section className="section animals" id="animals" aria-labelledby="animals-title">
          <div className="center-heading"><p className="eyebrow">Animals we’ve helped</p><h2 id="animals-title">Many kinds of exotic companions.</h2><p>Over the years, Cali_FID has cared for parrots and other pet birds, lizards, turtles and tortoises, snakes, amphibians, and other exotic animals.</p></div>
          <div className="animal-grid">
            {animals.map((animal) => (
              <article className="animal-card" key={animal.name}>
                <div className="archive-crop" style={animal.crop as CSSProperties}><img src="/archive-gallery.png" alt={animal.alt} width="1440" height="1000" /></div>
                <div className="animal-card-copy"><h3>{animal.name}</h3><p>{animal.description}</p></div>
              </article>
            ))}
          </div>
          <p className="historical-note">These categories reflect Cali_FID’s history and do not indicate current availability or intake.</p>
        </section>

        <section className="adoption" id="adoption" aria-labelledby="adoption-title">
          <div className="section adoption-inner">
            <div className="center-heading light-heading"><p className="eyebrow light">Adoption, when available</p><h2 id="adoption-title">Thoughtful matches start with good information.</h2><p>Historically, Cali_FID’s adoption process centered on suitable housing, species-appropriate care knowledge, references, an agreement, and a careful match for each animal.</p></div>
            <ol className="step-grid">
              {steps.map(([number, title, copy]) => <li key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{copy}</p></li>)}
            </ol>
            <p className="adoption-note">Cali_FID does not publish live animal listings or a current application on this page.</p>
          </div>
        </section>

        <section className="section help" id="help" aria-labelledby="help-title">
          <div className="help-heading"><p className="eyebrow">Choose your way to help</p><h2 id="help-title">A place for every kind of helper.</h2><p>Cali_FID’s work has historically relied on knowledgeable volunteers, foster homes, community education, and practical support.</p></div>
          <div className="program-grid">
            {programs.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
          <p className="small-note help-note">Please email before offering supplies, arranging a visit, or making plans to surrender or adopt an animal.</p>
        </section>

        <section className="questions" id="questions" aria-labelledby="questions-title">
          <div className="section questions-inner">
            <div><p className="eyebrow">Before you reach out</p><h2 id="questions-title">A few helpful answers.</h2></div>
            <div className="faq-list">
              <details><summary>Is Cali_FID accepting animals right now?</summary><p>Capacity changes with foster space and each animal’s needs. Email before transporting an animal or making surrender plans.</p></details>
              <details><summary>Are animals currently available for adoption?</summary><p>This template does not show live listings. Email to ask about current availability and the next appropriate step.</p></details>
              <details><summary>How can I volunteer or offer supplies?</summary><p>Needs change over time. Share your availability, experience, or what you would like to offer by email so the rescue can confirm what is useful.</p></details>
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="contact-inner"><p className="eyebrow light">Contact</p><h2 id="contact-title">Get in touch</h2><p>For questions about Cali_FID or to ask about current availability, intake capacity, adoption, fostering, or ways to help, email us.</p><a href={`mailto:${EMAIL}`} aria-label={`Email Cali_FID at ${EMAIL}`}>{EMAIL}</a><small>Responses and available services may vary with current capacity.</small></div>
        </section>
      </main>

      <footer><p>Cali_FID Parrot & Exotic Rescue Sanctuary · Modesto, California</p><p>Cali_FID means “California Feathered Kids.”</p><p>© Cali_FID Parrot & Exotic Rescue Sanctuary</p></footer>
    </>
  );
}
