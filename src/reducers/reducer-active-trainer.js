export default function(state=null,action){
    switch(action.type){
        case 'TRAINER_SELECTED':
        return action.payload
    }
    return state
}