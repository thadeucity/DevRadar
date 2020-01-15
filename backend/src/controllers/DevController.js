const axios = require ('axios');
const Dev = require ('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray')

// index, show, store, update, destroy

module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`http://api.github.com/users/${github_username}`);
            // continuar
    
            const { name = login, avatar_url, bio } = apiResponse.data;
    
            const techsArray = parseStringAsArray(techs);
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
    
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }

        return response.json(dev);
    },

    async update(request, response){
        const {github_username, name, avatar_url, bio, techs, latitude, longitude} = request.body;

        let dev = await Dev.findOne({ github_username });

        if (dev != null){
            if (name != null){
                await Dev.update({github_username},{name});
            }
            if (avatar_url != null){
                await Dev.update({github_username},{avatar_url});
            }
            if (bio != null){
                await Dev.update({github_username},{bio});
            }
            if (techs != null){
                const techsArray = parseStringAsArray(techs);
                await Dev.update({github_username},{techs:techsArray});
            } 
            if (latitude != null || longitude != null){
                const location = {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                };
                await Dev.update({github_username},{location});
            }
   
        }

        dev = await Dev.findOne({ github_username });
        
        // realizar update de Name, avatar_url, bio, techs e location, não permitir alterar github_username.
        return response.json(dev);
    },

    async destroy(request, response){

        const {github_username} = request.body;
        await Dev.deleteOne({github_username}, function (err) {
            if (err) return handleError(err);
            // deleted at most one tank document
          });
        return response.json({message: 'User Deleted'});
    },
};