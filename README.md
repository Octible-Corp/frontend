# Commands for running the app

3. Merge whatever branch has new work into master
4. CD into directory that has the pem file
5. SSH into server: ssh -i "Dev.pem" ubuntu@ec2-13-58-48-245.us-east-2.compute.amazonaws.com
6. cd /var/www/link/
7. sudo git pull
8. cd into /client
9. remove the build file "rm -rf build
10. npm install
11. build the updated build "npm run build"
12. cd back into link and npm install

Menu Object:

user: Restuarant ID
web: Website of restaurant
main_photo: Photo of the menu
name: Name of the restaurant
active: On or Off
2dPhotos: [
'photo url',
'photo2 url'
]
codes: Link to Raw QR Code
date: Date created
items:[
{
id: ID of item
course: Starters, Entres, Drinks
name:
description:
price:
},
]

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
order: 1
},
{
section: 'Mains',
order: 2
},
{
section: 'Deserts',
order: 3
},
{
section: 'Drinks',
order: 4
}
],
items: [
{
\_id: 'objectId',
title: 'Eggs',
description: 'Just plain old simple eggs',
price: '\$5.99',
section: 'Starters',
order: 1,
item_photos: [
{
url: 's3 file link',
featured: true
},
{
url: 's3 file link',
featured: false
},
{
url: 's3 file link',
featured: false
}
]
}
]
};

/Commit test
/ANother test

53bvtl0479jz
