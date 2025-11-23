export const projects = [
  {
    slug: 'choice-empowers',
    title: 'Choice Empowers',
    image: 'https://via.placeholder.com/400x300',
    description:
      'Home building site for affordable housing. Improving an existing home building web platform to help families design their home.',
    fullDescription: `
      Choice Empowers is a comprehensive platform designed to democratize home building for families seeking affordable housing solutions.

      The project involved extensive user research to understand the pain points families face when trying to design and build their homes. Through field studies and user interviews, we identified key barriers in the existing platform.

      Our team conducted card sorting exercises to reorganize the information architecture, making it more intuitive for users with varying levels of technical expertise.
    `,
    role: 'Lead UX Designer + Researcher',
    methods:
      'User interviews, field studies, card sorting, usability testing, paper prototyping, rapid prototyping',
    timeline: '6 months',
    team: '3 designers, 2 developers',
    outcomes: [
      'Increased user completion rate by 40%',
      'Reduced support tickets by 25%',
      'Improved user satisfaction scores',
    ],
  },
  {
    slug: 'proyectos-productivos',
    title: 'Proyectos Productivos',
    image: 'https://via.placeholder.com/400x300',
    description:
      'Digitization of a non-digital application process to create better access to city funding and programs for small business owners in Monterrey, Mexico.',
    fullDescription: `
      Proyectos Productivos aimed to transform the bureaucratic process of applying for city funding into a streamlined digital experience.

      Working closely with the municipality of Monterrey, we mapped out the existing paper-based processes and identified opportunities for digitization while ensuring accessibility for users with limited technical literacy.

      The project required careful consideration of interoperability with existing government systems and data privacy requirements.
    `,
    role: 'UX Designer + Researcher',
    methods:
      'Process mapping, field study, user interviews, interoperability analysis, data review',
    timeline: '4 months',
    team: '2 designers, 3 developers, 1 project manager',
    outcomes: [
      'Reduced application processing time by 60%',
      'Increased application submissions by 35%',
      'Enabled remote access for rural business owners',
    ],
  },
];

// Helper function to find a project by slug
export const getProjectBySlug = (slug) => {
  return projects.find((project) => project.slug === slug);
};
