export interface Company {
  name: string;
  role: string;
  countries?: string;
  period: string;
  summary?: string;
  /** 2–3 achievements, each under ~60 characters so the hover panel stays the card's height. */
  highlights?: string[];
  logo?: string;
  monogram: string;
}

export const companies: Company[] = [
  { name: 'Cascade Debt', role: 'Capital Markets Ops Manager', countries: '7+ countries', period: '2025 \u2013 Present', summary: 'Master-servicing implementation for international lending facilities across Mexico, Indonesia, and North America.', highlights: ['Master-servicing implementation for international lending facilities', 'Facilities across Mexico, Indonesia and North America'], logo: '/images/logos/cascade.png', monogram: 'CD' },
  { name: 'Vaas', role: 'Ops & Implementations Manager', countries: '2 countries', period: '2024 \u2013 2025', summary: 'Owned finance, then operations and client implementations end-to-end.', highlights: ['Owned finance end-to-end', 'Then took on operations and client implementations'], logo: '/images/logos/vaas.png', monogram: 'V' },
  { name: 'Concourse', role: 'Product \u00b7 YC / a16z', period: '2024', summary: 'Built the treasury product from scratch, then pivoted it toward AI finance agents.', highlights: ['Built the treasury product from scratch', 'Pivoted it toward AI finance agents'], logo: '/images/logos/concourse.png', monogram: 'C' },
  { name: 'Rappi', role: 'Global FP&A Treasury Manager', countries: '8+ countries', period: '2023 \u2013 2024', summary: 'Led global cash-flow forecasting \u2014 liquidity, working capital, and treasury process.', highlights: ['Led global cash-flow forecasting across 8+ countries', 'Liquidity, working capital and treasury process'], logo: '/images/logos/rappi.png', monogram: 'R' },
  { name: 'Nowports', role: 'Treasury Leader', countries: '8 countries', period: '2022 \u2013 2023', summary: 'Built treasury from zero, leading a team of 20; grew AUM from $50M to $105M.', highlights: ['Built treasury from zero', 'Led a team of 20 across 8 countries', 'Grew AUM from $50M to $105M'], logo: '/images/logos/nowports.png', monogram: 'NP' },
  { name: 'Mundi', role: 'Treasury Leader', period: '2022', summary: 'Stood up AP/AR and collections from scratch for freight-forwarding and fintech.', highlights: ['Stood up AP/AR from scratch', 'Built collections for freight-forwarding and fintech'], logo: '/images/logos/mundi.png', monogram: 'M' },
  { name: 'Nubank', role: 'Finance Ops & Treasury Specialist', period: '2021 \u2013 2022', summary: 'Built Mexico\u2019s founding treasury team; Python cash projections under 10% deviation.', highlights: ['Built Mexico\u2019s founding treasury team', 'Python cash projections under 10% deviation'], logo: '/images/logos/nubank.png', monogram: 'Nu' },
  { name: 'BlackRock', role: 'Corporate Treasury LatAm', countries: '9 countries', period: '2020 \u2013 2021', summary: 'Global treasury from the NYC central team \u2014 banking, KYC, FX, and cash.', highlights: ['Global treasury from the NYC central team', 'Banking, KYC, FX and cash across 9 countries'], logo: '/images/logos/blackrock.png', monogram: 'BR' },
  { name: 'Daimler AG', role: 'Cash Management, NAFTA', period: '2018 \u2013 2020', summary: 'Automated NAFTA payments; refined bank structure with H2H/SWIFT connections.', highlights: ['Automated NAFTA payments', 'Refined bank structure with H2H/SWIFT connections'], logo: '/images/logos/daimler.png', monogram: 'D' },
];

export const earlierRoles = '+ ED&F Man \u00b7 Sensient Technologies';
