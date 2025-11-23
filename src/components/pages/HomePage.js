import React from 'react';

const HomePage = () => {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
      aria-labelledby="about-heading"
    >
      <div className="order-2 lg:order-1">
        <img
          src="/images/main_page.jpeg"
          alt="Emmanuel - Tech-Finance Professional"
          width={600}
          height={800}
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="space-y-8 order-1 lg:order-2">
        <p className="text-xl text-gray-400" lang="es">
          Hello / Hola
        </p>
        <h1 id="about-heading" className="text-5xl font-extrabold leading-tight">
          I'm Emmanuel, a <span className="text-gray-500">Tech-Finance Professional</span> and perpetual learner demystifying complexity with a human-centric approach.
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
        My journey started in finance at global corporations like BlackRock and Daimler, where I quickly realized that sophisticated tools mean nothing if people can't actually use them. This led me to startups like Nubank, Rappi, Cascade, and Concourse. Places where I could blend finance, technology, and AI automation to build solutions that make sense to humans. Whether it's through reading, experimenting, or diving into new projects, I'm constantly learning new ways to bridge the gap between complex technology and real human needs.
        </p>
      </div>
    </section>
  );
};

export default HomePage;
