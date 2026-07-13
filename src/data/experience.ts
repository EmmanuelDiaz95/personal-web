export interface Company {
  name: string;
  role: string;
  period: string;
  logo?: string;
  monogram: string;
}

export const profileSummary = 'Finance operations leader with 7+ years building treasury and finance systems from scratch at high-growth startups across Latin America. Comfortable owning the full finance ops stack in fast-moving environments where structure doesn\'t exist yet.';

export const companies: Company[] = [
  { name: 'Cascade Debt', role: 'Capital Markets Ops Manager', period: '2025 \u2013 Present', logo: '/images/logos/cascade.png', monogram: 'CD' },
  { name: 'Vaas', role: 'Ops & Implementations Manager', period: '2024 \u2013 2025', logo: '/images/logos/vaas.png', monogram: 'V' },
  { name: 'Concourse', role: 'Product \u00b7 YC / a16z', period: '2024', logo: '/images/logos/concourse.png', monogram: 'C' },
  { name: 'Rappi', role: 'Global FP&A Treasury Manager', period: '2023 \u2013 2024', logo: '/images/logos/rappi.png', monogram: 'R' },
  { name: 'Nowports', role: 'Treasury Leader \u00b7 8 countries', period: '2022 \u2013 2023', logo: '/images/logos/nowports.png', monogram: 'NP' },
  { name: 'Mundi', role: 'Treasury Leader', period: '2022', logo: '/images/logos/mundi.png', monogram: 'M' },
  { name: 'Nubank', role: 'Finance Ops & Treasury Specialist', period: '2021 \u2013 2022', logo: '/images/logos/nubank.png', monogram: 'Nu' },
  { name: 'BlackRock', role: 'Corporate Treasury LatAm', period: '2020 \u2013 2021', logo: '/images/logos/blackrock.png', monogram: 'BR' },
  { name: 'Daimler AG', role: 'Cash Management, NAFTA', period: '2018 \u2013 2020', logo: '/images/logos/daimler.png', monogram: 'D' },
];

export const earlierRoles = '+ ED&F Man \u00b7 Sensient Technologies';
