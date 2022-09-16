import React, { Component } from 'react'
import "./jobs.css";
import { Link } from 'react-router-dom';
import Watch from '../Files/Images/Watch.svg';
import Tick from '../Files/Images/tick.svg';
import { api , printError} from '../../services/';
import { throws } from 'assert';

class JobRecruiter extends Component {
constructor(props){
    super(props)

    this.state={
        fname:"Varun",
        lname:"Jain",
        company:"Sr Recruiter at Google",
        id:"",
        rec_id:this.props.data
    }
    this.getRecruiter=this.getRecruiter.bind(this);

}

async getRecruiter(id){
if(id){

  try {

    
    this.setState({
      fname:"Hắt",
      lname:"Rờ",
      company:"abcCompany"
    })
  } catch (error) {
    console.log("error",Object.keys(error), error.response);
    if(error.response){
    printError(error);
    }
  }

}else{
  return;
}
}

componentWillReceiveProps(nextProps){
  
  
    this.getRecruiter(nextProps.data);
 
  
}

  render() {
    
    return (
      <div>
<hr/>
      <label className="heading-location">
      Contact the Job Poster
      </label>
      <div>
      <div class="row">
            <div class="col-md-5 image-tick">
            <img id="target2" src={""} className="avatar img-circle img-thumbnail" alt="" />

            </div>
            <div class="col-md-6">
            <div>
            <label className="recuiter-name">{this.state.fname} &nbsp; {this.state.lname}</label><br/>
            </div>
            <br/>
            <div>
            <label style={{fontSize:"10px"}}>{this.state.company}</label>
            </div>
            </div>
            
            </div>
            <Link to="/profile"><label style={{fontSize:"14px"}}>Recruiter Profile</label></Link>
            <hr/>
            
      </div>
      </div>
      
    )
  }
}
export default JobRecruiter;