//Init Github
const github = new GitHub;

//Init UI
const ui = new UI;

//Search Input 
const searchUser = document.getElementById('searchUser')

//Search Input Event Listener
searchUser.addEventListener('keyup',(e) => {
    //Get the Input text
    const userText = e.target.value;

    if(userText !== ''){
       
        //Make HTTP call
        github.getUser(userText)
            .then(data => {
                //To check whether the user exsists
                if(data.profile.message === 'Not Found'){
                    
                }else{
                    //Show profile
                    ui.showProfile(data.profile)
                }
            })
        
    }else{
        //clear profile
    }
})