import { GET_MENU } from '../actions/types';
let initialState = {
  menu: { sections: [] },
  loaded: false,
};
/*
let initialState = {
  menu: {
    menu_id: 'randomid',
    user_id: '20938002',
    name: 'octible',
    restaurant: 'octible', //Void
    website: 'www.octible.io',
    logo_photo:
      'https://octiblemedia.s3-us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.12.45+PM.png',
    main_photo:
      'https://octiblemedia.s3-us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.12.45+PM.png', //Void
    background_photo:
      'https://octiblemedia.s3-us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.06.13+PM.png',
    active: true,
    date: 22323233,
    sections: [
      {
        section_id: 'wretad',
        section: 'Starters',
        order: 1,
      },
      {
        section_id: 'dfgh',
        section: 'Mains',
        order: 2,
      },
      {
        section_id: 'qwer',
        section: 'Deserts',
        order: 3,
      },
      {
        section_id: 'adf',
        section: 'Drinks',
        order: 4,
      },
    ],
    items: [
      {
        item_id: 'objectId',
        title: 'Eggs',
        description: 'Just plain old simple eggs',
        price: '$5.99',
        section_id: 'wretad',
        order: 1,
        item_photos: [
          {
            photo_url:
              'https://octiblemedia.s3-us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.18.10+PM.png',
            featured: null,
            order: null,
          },
          {
            photo_url:
              'https://octiblemedia.s3-us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.18.33+PM.png',
            featured: null,
            order: null,
          },
          {
            photo_url:
              'https://octiblemedia.s3-us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.18.48+PM.png',
            featured: null,
            order: null,
          },
        ],
      },
    ],
  },
  menu2: {
    _id: '60416dbbe414cf4aafb724fd',
    menu_id: 'nk9hw0y',
    user_id: '3mw114tlkjqkpg67',
    name: 'Grill King',
    website: 'www.octible.io',
    logo_photo:
      'https://octiblemedia.s3-us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.12.45+PM.png',
    background_photo:
      'https://octiblemedia.s3-us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.06.13+PM.png',
    pdf: '',
    sections: [
      { section_id: 'fj2npv2', section: 'Entres', order: { $numberInt: '2' } },
      { section_id: 'zjmsq94', section: 'Deserts', order: { $numberInt: '3' } },
    ],
    items: [
      {
        item_id: 'xow0p0a',
        title: 'Eggs',
        description: 'Just simple Eggs',
        price: '$19.99',
        section_id: 'la824n7',
        order: null,
        item_photos: [
          {
            photo_url: '5ffa735682b140cea932dab0/sktwi1tfmklvjjqxl.jpg',
            featured: null,
            order: null,
          },
        ],
      },
      {
        item_id: 'qqtvogd',
        title: 'Steak',
        description: 'This is a description.',
        price: '$19.99',
        section_id: 'fj2npv2',
        order: null,
        item_photos: [
          {
            url: '5ffa735682b140cea932dab0/sktwi1tu0klvl78m4.jpg',
            featured: null,
            order: null,
          },
        ],
      },
      {
        item_id: 'dtstseu',
        title: 'Elk Steak',
        description: 'This is a test with a photo.',
        price: '$99.99',
        section_id: 'fj2npv2',
        order: null,
        item_photos: [
          {
            url:
              'https://octible.s3.us-east-2.amazonaws.com/5ffa735682b140cea932dab0/sktwi1twxklvlfrkg.jpg',
            featured: null,
            order: null,
          },
        ],
      },
    ],
    active: false,
  },
};
*/

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MENU:
      return {
        ...state,
        menu: payload,
        loaded: true,
      };
    default:
      return state;
  }
}
