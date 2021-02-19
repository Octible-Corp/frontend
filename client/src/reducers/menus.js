import { GET_MENU } from '../actions/types';

let initialState = {
  menu: {
    menu_id: 'randomid',
    user_id: '20938002',
    restaurant: 'octible',
    website: 'www.octible.io',
    main_photo:
      'https://octiblemedia.s3-us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.12.45+PM.png',
    background_photo:
      'https://octiblemedia.s3-us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.06.13+PM.png',
    active: false,
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
            url:
              'https://octiblemedia.s3-us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.18.10+PM.png',
            featured: true,
          },
          {
            url:
              'https://octiblemedia.s3-us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.18.33+PM.png',
            featured: false,
          },
          {
            url:
              'https://octiblemedia.s3-us-west-1.amazonaws.com/Screen+Shot+2021-01-27+at+1.18.48+PM.png',
            featured: false,
          },
        ],
      },
    ],
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MENU:
      return {
        ...state,
        menu: payload,
      };
    default:
      return state;
  }
}
