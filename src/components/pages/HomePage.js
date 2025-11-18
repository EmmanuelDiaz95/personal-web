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
          I'm Emmanuel, a <span className="text-gray-500">Tech-Finance Professional</span> committed
          to creating spatial justice through technology.
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          My journey in participatory design began as an urban designer leading community processes
          to transform streets into amenable spaces for children. My practice has grown to explore
          the intersections of policy, space, and technology.
        </p>
        <p className="text-lg text-gray-400 leading-relaxed">
          As an interdisciplinary practitioner, my experiences do not always fit into clear buckets.
          However, at the root of everything I do is a commitment to deeply understanding problems
          from the perspectives of those who face them, and placing those issues in their broader
          systemic context.
        </p>
      </div>
    </section>
  );
};

export default HomePage;
