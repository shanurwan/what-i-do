export interface Profile {
  displayName: string;
  name: string;
  descriptor: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  availability: string;
  github: string;
  linkedin?: string;
  email?: string;
  phone?: string;
  resume?: string;
}

export const profile: Profile = {
  displayName: 'Shanurwan',
  name: 'Shafiqah',
  descriptor: 'Infrastructure & security for high-integrity AI systems',
  role: 'Specialist, Infrastructure & Security for AI',
  company: 'Scicom',
  location: 'Malaysia',
  availability: 'Open to infrastructure, platform, and security engineering roles on high-criticality systems: the ones that must stay up, stay correct, and prove it.',
  github: 'https://github.com/shanurwan',
  linkedin: 'https://www.linkedin.com/in/wan-nur-shafiqah-852636223',
  email: 'wannurshafiqah18@gmail.com',
  phone: '+60 10-819 0277',
  // Add a résumé URL here when it is ready to publish.
};
