export interface Profile {
  displayName: string;
  descriptor: string;
  github: string;
  linkedin?: string;
  email?: string;
  resume?: string;
}

export const profile: Profile = {
  displayName: 'Shanurwan',
  descriptor: 'Infrastructure and systems engineering',
  github: 'https://github.com/shanurwan',
  // Add LinkedIn, email, and resume URLs here when they are ready to publish.
};
