import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {selectTrainer} from '../actions/index'

class TrainerList extends Component{
    createListItems(){
        return this.props.trainers.map((trainer)=>{
            return(
                <div>
                    <h4 className="text-danger" key={trainer.id} onClick={()=>this.props.st(trainer) }>
                    {trainer.first} {trainer.last}
                    </h4>
                </div>
            )
        })
    }
    render(){
        return(
            <div>
                {this.createListItems()}
            </div>
        )
    }
}//end on container

//below code is outside class
function mapStateToPros(state){
    //So take state from store and pass to components as props
    return{
        trainers:state.trainers
    }
}
function matchDispatchToProps(dispatch){
    //pass prop selectTrainer with action selectTrainer
    return bindActionCreators({
        st:selectTrainer
    }, dispatch)
}
export default connect(mapStateToPros,matchDispatchToProps)(TrainerList)