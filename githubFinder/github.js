class GitHub{
    constructor() {
        this.client_id = '7c83bf827cd16aeecb0a'
        this.client_secret ='cba3be2f8b77babc7efe249c775b7dd9354157c1'
    }

    async getUser(user){
        const profileResponse =  await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        
        const profile = await profileResponse.json();
        

        return {
            profile
        }

    }
}