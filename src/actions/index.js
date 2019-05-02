export const selectTrainer=(trainer)=>{
    console.log("You have clicked on Trainer ",trainer.id)
    //CRUD to invoke Rest services
    //Axios.get () or middleware
    //$.ajax(url)
    //fetch(url)
    return{
        type:'TRAINER_SELECTED',
        payload:trainer
    }
}