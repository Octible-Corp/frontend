const url = 'https://octible.s3.us-east-2.amazonaws.com/';

export const preLoadImg = async (menu) => {
  try {
    let arr = [];
    console.log('--MNUE');
    console.log(menu);
    if (menu.logo_photo) {
      arr.push(`${url}${menu.logo_photo}`);
    }
    if (menu.background_photo) {
      arr.push(`${url}${menu.background_photo}`);
    }
    menu.items.map((item) => {
      if (item.item_photos) {
        item.item_photos.map((photo) => {
          arr.push(photo.url);
        });
      }
    });
    const promises = await arr.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onLoad = resolve();
        img.oneerror = reject();
      });
    });
    await Promise.all(promises);
    console.log('----DONE---');
  } catch (error) {
    console.log(error);
  }
};
