'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('user', 'UserController.postUser')
  Route.get('get_user/:email', 'UserController.getUser')
  Route.get('user/:id', 'UserController.getProfile').as('profileJwt').middleware(['auth:jwt'])
  Route.patch('user/:id', 'UserController.patchProfile').as('updateProfileJwt').middleware(['auth:jwt'])
  Route.delete('user/:id', 'UserController.deleteUser').as('deleteUserJwt').middleware(['auth:jwt'])
  Route.post('profile', 'UserController.postProfile')
  Route.post('login', 'UserController.postLogin').as('loginJwt')
  Route.get('get_location_match/:id', 'UserController.getLocationMatch').as('getMatchLocationJwt').middleware(['auth:jwt'])
}).prefix('api/v1')

Route.group(() => {
  Route.get('images/:id/:location/:gender', 'ImageController.getImages').as('imagesJwt').middleware(['auth:jwt'])
  Route.get('image/:id', 'ImageController.getImage').as('imageJwt').middleware(['auth:jwt'])
  Route.post('image', 'ImageController.postImage').as('postimageJwt').middleware(['auth:jwt'])
  Route.delete('image/:id', 'ImageController.deleteImage').as('deleteimageJwt').middleware(['auth:jwt'])
  Route.patch('location/:id', 'UserController.patchLocation').as('patchLocationJwt').middleware(['auth:jwt'])
  Route.get('location/:id', 'UserController.getLocation').as('getLocationJwt').middleware(['auth:jwt'])
  Route.post('location', 'UserController.postLocation')
  Route.post('like', 'ImageController.postLike').as('imageJwt').middleware(['auth:jwt'])
  Route.get('match/:id', 'ImageController.getMatch').as('getMatchJwt').middleware(['auth:jwt'])
  Route.patch('profile/:id', 'UserController.patchProfilePhoto').as('patchProfileJwt').middleware(['auth:jwt'])
  Route.post('upload', 'ImageController.uploadImage')
  Route.get('get_avatar/:name', 'UserController.getProfilePhoto')
  Route.post('upload_image', 'ImageController.addImage').as('addImageJwt').middleware(['auth:jwt'])
  Route.get('get_image/:name', 'ImageController.getUploadImage')
}).prefix('api/v1')
