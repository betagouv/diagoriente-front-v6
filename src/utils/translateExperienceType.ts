export default (type: string): { singular: string; plural: string; url: string } => {
  switch (type) {
    case 'personal':
      return { singular: 'personnelle', plural: 'personnelles', url: 'personal' };
    case 'professional':
      return { singular: 'professionnelle', plural: 'professionnelles', url: 'professional' };
    case 'voluntary':
      return { singular: 'de bénévolat', plural: 'de bénévolat', url: 'voluntary' };
    default:
      return { singular: 'personnelle', plural: 'personnelles', url: 'personal' };
  }
};
