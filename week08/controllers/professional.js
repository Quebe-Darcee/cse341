exports.getData = (req, res, next) => {
  res.status(200).json({
    posts: [{
      professionalName: 'Darcee Quebe',
      professionalImage: '',
      nameLink: {
        href: ''
      },
      primaryDescription: 'Mother, student, reader, and baker.',
      workDescription1: 'Created a store website.',
      workDescription2: 'Created a recipe index.',
      linkedInLink: {
        href: 'https://www.linkedin.com/'
      },
      githubLink: {
        href: 'https://github.com/Quebe-Darcee/cse341'
      },
      contactText: 'Email: darcee@example.com'
    }]
  });
};
