let testMenu = {
  user: '20938002',
  restaurant: 'octible',
  website: 'www.octible.io',
  active: false,
  main_photo: 's3 bucket link',
  plainPhotos: ['s3 bucket link', 's3 bucket link', 's3 bucket link'],
  date: 22323233,
  sections: [
    {
      section: 'Starters',
      order: 1,
    },
    {
      section: 'Mains',
      order: 2,
    },
    {
      section: 'Deserts',
      order: 3,
    },
    {
      section: 'Drinks',
      order: 4,
    },
  ],
  items: [
    {
      _id: 'objectId',
      title: 'Eggs',
      description: 'Just plain old simple eggs',
      price: '$5.99',
      section: 'Starters',
      order: 1,
      item_photos: [
        {
          url: 's3 file link',
          featured: true,
        },
        {
          url: 's3 file link',
          featured: false,
        },
        {
          url: 's3 file link',
          featured: false,
        },
      ],
    },
  ],
};
