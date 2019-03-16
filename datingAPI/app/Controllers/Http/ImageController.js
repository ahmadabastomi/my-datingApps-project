'use strict'

const User = use('App/Models/User')
const Profile = use('App/Models/Profile')
const Image = use('App/Models/Image')
const Like = use('App/Models/Like')
const Match = use('App/Models/Match')
const Locate = use('App/Models/Location')
const Database = use('Database')
const Helpers = use('Helpers')
class ImageController {

    async getImages({ params }) {
        try {
            const { id, location, gender } = params
            //const { gender } = request.post()
            const affectedRows = await Database
                .select('images.id', 'images.user_id', 'images.image', 'profiles.gender')
                .from('users')
                .rightJoin('images', 'users.id', 'images.user_id')
                .from('users')
                .rightJoin('locations', 'users.id', 'locations.user_id')
                .from('users')
                .rightJoin('profiles', 'users.id', 'profiles.user_id')
                .where('locations.location', location)
                .where('images.user_id', '!=', id)
                .where('profiles.gender', gender)
                .where('images.image', '!=', `${null}`)
            return affectedRows
        } catch (error) {
            console.error(error)
        }
    }

    async getImage({ params }) {
        const { id } = params
        const image = await Database
            .select('id', 'user_id', 'image')
            .from('images')
            .where('user_id', id)
        return image
    }

    async postImage({ request, response }) {
        const { user_id, image } = request.post()
        try {
            const images = new Image()
            images.user_id = user_id
            images.image = image
            await images.save()
        } catch (e) {
            console.log(e)
            return response.json({ message: 'Failed Add Images' })
        }
    }

    async postLike({ request, response }) {
        const { user_id, image_id, image_user, is_like } = request.post()
        const check = await Like.findBy('image_user', user_id)
        if (!check) {
            try {
                const like = new Like()
                like.user_id = user_id
                like.image_id = image_id
                like.image_user = image_user
                like.is_like = is_like
                await like.save()
            } catch (e) {
                console.log(e)
                return response.json({ message: 'Failed Add Like' })
            }
        } else {
            try {
                const match = new Match()
                match.user_a = user_id
                match.user_b = check.user_id
                await match.save()
            } catch (e) {
                console.log(e)
                return response.json({ message: 'Failed Add Match' })
            }
        }
    }

    async getMatch({ params }) {
        const { id } = params
        let myMatch = []
        let tmpProfile = []
        let tmpLocation = []
        let tmpImage = []
        const match1 = await Database
            .select('user_b')
            .from('matches')
            .where('user_a', id)
            .groupBy('user_b')
        const match2 = await Database
            .select('user_a')
            .from('matches')
            .where('user_b', id)
            .groupBy('user_a')
        //Get UserId Match    
        if (match1.length > 0) {
            for (let i = 0; i < match1.length; i++) {
                myMatch.push(match1[i].user_b)
            }
            if (match2.length > 0) {
                for (let i = 0; i < match2.length; i++) {
                    myMatch.push(match2[i].user_a)
                }
            }

        } else if (match2.length > 0) {
            for (let i = 0; i < match2.length; i++) {
                myMatch.push(match2[i].user_a)
            }
        }
        //Get Profile Match by Id
        if (myMatch.length > 0) {
            for (let i = 0; i < myMatch.length; i++) {
                const tmp = await Profile.findBy('user_id', myMatch[i])
                await tmpProfile.push(tmp)
                const loc = await Locate.findBy('user_id', myMatch[i])
                await tmpLocation.push(loc)
                const img = await Database
                    .select('*')
                    .from('images')
                    .where('user_id', myMatch[i])
                await tmpImage.push(img)

            }
        }
        return { tmpProfile, tmpLocation, tmpImage }
    }

    async deleteImage({ params }) {
        const { id } = params
        const image = await Image.findBy('id', id)
        return await image.delete()
    }

    async uploadImage({ request }) {
        const profilePic = request.file('profile_pic', {
            types: ['image'],
            size: '2mb'
        })

        await profilePic.move(Helpers.tmpPath('uploads'), {
            name: 'custom-name.jpg',
            overwrite: true
        })

        if (!profilePic.moved()) {
            return profilePic.error()
        }
        return 'File moved'
    }

    async addImage({ response, request }) {
        const { user_id, fileName } = request.post()
        const image = request.file('path')
        try {
            await image.move(Helpers.tmpPath('uploads'), {
                name: fileName,
                overwrite: true
            })
            if (!image.moved()) {
                return response.json({ message: 'Failed Upload Image' })
            } else {
                const images = new Image()
                images.user_id = user_id
                images.image = fileName
                await images.save()
                return response.json({ message: 'Success Upload Image' })
            }
        } catch (e) {
            console.log(e)
            return response.json({ message: 'Failed Update Avatar' })
        }
    }

    async getUploadImage({ params, response }) {
        const { name } = params
        const image = await response.download(Helpers.tmpPath(`uploads/${name}`))
        return image
    }
}

module.exports = ImageController
