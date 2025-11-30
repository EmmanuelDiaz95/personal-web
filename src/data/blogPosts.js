export const blogPosts = [
  {
    id: 1,
    slug: 'intersection-urban-design-technology',
    title: 'The Intersection of Urban Design and Technology',
    date: 'March 15, 2023',
    excerpt:
      'Exploring how technology is reshaping urban spaces and community engagement in city planning.',
    fullContent: `
      Technology is fundamentally transforming how we design, plan, and experience urban spaces. From smart city initiatives to digital participation platforms, the intersection of urban design and technology offers unprecedented opportunities for creating more responsive, inclusive, and sustainable cities.

      In this article, we explore how emerging technologies are enabling new forms of community engagement, data-driven decision making, and innovative approaches to addressing urban challenges. We examine case studies from cities around the world that are leveraging technology to reimagine the relationship between people, place, and infrastructure.
    `,
    readTime: '5 min read',
    category: 'Urban Design',
  },
  {
    id: 2,
    slug: 'participatory-design-in-practice',
    title: 'Participatory Design in Practice',
    date: 'February 28, 2023',
    excerpt:
      'A deep dive into successful participatory design methodologies and their impact on community outcomes.',
    fullContent: `
      Participatory design is more than a methodology—it's a fundamental shift in how we approach problem-solving and decision-making. By centering the voices and experiences of those most affected by design decisions, we create solutions that are more effective, equitable, and sustainable.

      This article examines successful participatory design processes, from initial community engagement through implementation and evaluation. We discuss key principles, common challenges, and practical strategies for facilitating meaningful participation across diverse communities.
    `,
    readTime: '7 min read',
    category: 'Design Methods',
  },
  {
    id: 3,
    slug: 'spatial-justice-digital-age',
    title: 'Spatial Justice in the Digital Age',
    date: 'February 10, 2023',
    excerpt:
      'How digital tools can help address spatial inequalities and create more equitable urban environments.',
    fullContent: `
      Spatial justice examines how power, resources, and opportunities are distributed across geographic space. In the digital age, new technologies offer both opportunities and challenges for addressing spatial inequalities.

      This article explores how digital mapping, data visualization, and online participation platforms can make spatial inequalities visible and empower communities to advocate for change. We also examine the risks of digital divides and technological solutions that may reinforce existing inequalities if not implemented thoughtfully.
    `,
    readTime: '6 min read',
    category: 'Technology',
  },
];

// Helper function to find a blog post by slug
export const getBlogPostBySlug = (slug) => {
  return blogPosts.find((post) => post.slug === slug);
};
