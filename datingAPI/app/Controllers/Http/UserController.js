'use strict'

const User = use('App/Models/User')
const Profile = use('App/Models/Profile')
const Location = use('App/Models/Location')
const Helpers = use('Helpers')

class UserController {
    async postUser({ request, response }) {
        const { username, email, password } = request.post()
        try {
            const user = new User()
            user.username = username
            user.email = email
            user.password = password
            await user.save()
        } catch (e) {
            console.log(e)
            return response.json({ message: 'Failed Register' })
        }
    }
    async getUser({ params }) {
        const { email } = params
        const user = await User.findBy('email', email)
        return { id: user.id }
    }
    async deleteUser({ params }) {
        const { id } = params
        const user = await User.find(id)
        return await user.delete()
    }
    async postProfile({ request, response }) {
        const {
            user_id, name, gender,
            birth_date, phone_number, job_title,
            job_company, school, account_social_media,
            about_me, avatar
        } = request.post()
        try {
            const profile = new Profile()
            profile.user_id = user_id
            profile.name = name
            profile.gender = gender
            profile.birth_date = birth_date
            profile.phone_number = phone_number
            profile.job_title = job_title
            profile.job_company = job_company
            profile.school = school
            profile.account_social_media = account_social_media
            profile.about_me = about_me
            profile.avatar = avatar
            await profile.save()
        } catch (e) {
            console.log(e)
            return response.json({ message: 'Failed Add Profile' })
        }
    }

    async postLogin({ request, auth, response }) {
        const { email, password } = request.all()
        try {
            const user = await User.findBy('email', email, 'password', password)
            const check = await auth.attempt(email, password)
            if (check) {
                return { id: user.id, token: check.token }
            }
        } catch (e) {
            console.log(e)
            return response.json({ message: 'You are not registered!' })
        }
    }

    async getProfile({ response, auth, params }) {
        const { id } = params
        const user = await auth.current.user
        try {
            if (user) {
                const profile = await Profile.findBy('user_id', id)
                return {
                    username: user.username,
                    email: user.email,
                    name: profile.name,
                    gender: profile.gender,
                    birth_date: profile.birth_date,
                    phone_number: profile.phone_number,
                    job_title: profile.job_title,
                    job_company: profile.job_company,
                    school: profile.school,
                    account_social_media: profile.account_social_media,
                    about_me: profile.about_me,
                    avatar: profile.avatar,
                }
            }
        } catch (e) {
            console.log(e)
            return response.json({ message: 'Failed Show profile' })
        }
    }

    async patchProfile({ response, auth, params, request }) {
        const { id } = params
        const user = await auth.current.user
        try {
            if (user) {
                const profile = await Profile
                    .query()
                    .where('user_id', id)
                    .update(request.post())
                return { profile }
            }

        } catch (e) {
            console.log(e)
            return response.json({ message: 'Failed Update profile' })
        }
    }

    async patchProfilePhoto({ response, params, request }) {
        const { id } = params
        const { fileName } = request.post()
        const avatar = request.file('path')
        try {
            const profile = await Profile.findBy('user_id', id)
            await avatar.move(Helpers.tmpPath('uploads'), {
                name: fileName,
                overwrite: true
            })
            if (!avatar.moved()) {
                return response.json({ message: 'Failed Upload Image' })
            } else {
                profile.avatar = fileName
                await profile.save()
                return response.json({ message: 'Success Upload Image' })
            }
        } catch (e) {
            console.log(e)
            return response.json({ message: 'Failed Update Avatar' })
        }
    }

    async getProfilePhoto({ params, response }) {
        const { name } = params
        const avatar = await response.download(Helpers.tmpPath(`uploads/${name}`))
        return avatar
    }

    async postLocation({ request, response }) {
        const { user_id, location } = request.post()
        try {
            const locations = new Location()
            locations.user_id = user_id
            locations.location = location
            await locations.save()
        } catch (e) {
            console.log(e)
            return response.json({ message: 'Failed Add Locations' })
        }
    }

    async patchLocation({ response, auth, params, request }) {
        const { id } = params
        const user = await auth.current.user
        try {
            if (user) {
                const location = await Location
                    .query()
                    .where('user_id', id)
                    .update(request.post())
                return { location }
            }

        } catch (e) {
            console.log(e)
            return response.json({ message: 'Failed Update location' })
        }
    }

    async getLocation({ params }) {
        const { id } = params
        const location = await Location.findBy('user_id', id)
        return { location: location.location }
    }
    async getLocationMatch({ params }) {
        const { id } = params
        const location = await Location.findBy('user_id', id)
        return location
    }


}
module.exports = UserController
