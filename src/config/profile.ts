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
  name: 'Wan Nur Shafiqah',
  descriptor: 'AI infrastructure & security engineer',
  role: 'Specialist, Infrastructure & Security for AI',
  company: 'Scicom',
  location: 'Malaysia (UTC+8)',
  availability: 'Open to fully remote AI infrastructure, platform, and security engineering roles, APAC or global, from January 2027.',
  github: 'https://github.com/shanurwan',
  linkedin: 'https://www.linkedin.com/in/wan-nur-shafiqah-852636223',
  email: 'wannurshafiqah18@gmail.com',
  phone: '+60 10-819 0277',
  // Add a résumé URL here when it is ready to publish.
};
