export interface Company {
  name: string;
  role: string;
  period: string;
  summary?: string;
  logo?: string;
  monogram: string;
}

export const profileSummary = 'Technology-driven finance leader with 7+ years across financial operations, treasury, FP&A, financial modeling, and capital markets — building lean teams and smart systems that replace manual work with AI-powered automation. Lately that\'s meant building product from scratch — AI agents, treasury systems, and capital-markets software — alongside teams that innovate and ship high-quality products fast.';

export const companies: Company[] = [
  { name: 'Cascade Debt', role: 'Capital Markets Ops Manager', period: '2025 \u2013 Present', summary: 'Master-servicing implementation for international lending facilities across Mexico, Indonesia, and North America.', logo: '/images/logos/cascade.png', monogram: 'CD' },
  { name: 'Vaas', role: 'Ops & Implementations Manager', period: '2024 \u2013 2025', summary: 'Owned finance, then operations and client implementations end-to-end.', logo: '/images/logos/vaas.png', monogram: 'V' },
  { name: 'Concourse', role: 'Product \u00b7 YC / a16z', period: '2024', summary: 'Built the treasury product from scratch, then pivoted it toward AI finance agents.', logo: '/images/logos/concourse.png', monogram: 'C' },
  { name: 'Rappi', role: 'Global FP&A Treasury Manager', period: '2023 \u2013 2024', summary: 'Led global cash-flow forecasting \u2014 liquidity, working capital, and treasury process.', logo: '/images/logos/rappi.png', monogram: 'R' },
  { name: 'Nowports', role: 'Treasury Leader \u00b7 8 countries', period: '2022 \u2013 2023', summary: 'Built treasury from zero across 8 countries; grew AUM from $50M to $105M.', logo: '/images/logos/nowports.png', monogram: 'NP' },
  { name: 'Mundi', role: 'Treasury Leader', period: '2022', summary: 'Stood up AP/AR and collections from scratch for freight-forwarding and fintech.', logo: '/images/logos/mundi.png', monogram: 'M' },
  { name: 'Nubank', role: 'Finance Ops & Treasury Specialist', period: '2021 \u2013 2022', summary: 'Built Mexico\u2019s founding treasury team; Python cash projections under 10% deviation.', logo: '/images/logos/nubank.png', monogram: 'Nu' },
  { name: 'BlackRock', role: 'Corporate Treasury LatAm', period: '2020 \u2013 2021', summary: 'Global treasury across 9 LatAm countries \u2014 banking, KYC, FX, and cash.', logo: '/images/logos/blackrock.png', monogram: 'BR' },
  { name: 'Daimler AG', role: 'Cash Management, NAFTA', period: '2018 \u2013 2020', summary: 'Automated NAFTA payments; refined bank structure with H2H/SWIFT connections.', logo: '/images/logos/daimler.png', monogram: 'D' },
];

export const earlierRoles = '+ ED&F Man \u00b7 Sensient Technologies';
