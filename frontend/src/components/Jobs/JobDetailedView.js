import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {set_active_id} from "../../actions/jobCardActiveId";
import { api , printError, printMessage} from '../../services/';
import jwt_decode from 'jwt-decode';
import "./jobs.css";
import JobSkills from "./JobSkills";
import JobFunctions from "./JobFunctions"
import JobRecruiter from "./JobRecruiter";
import {connect} from "react-redux";
import Watch from '../Files/Images/Watch.svg';
import Logo from '../Files/Images/linkedinlogo.png';
import $ from 'jquery'; 
import { IMAGE_PATHS, S3_URL } from '../../constants/routes';
class JobDetailedView extends Component {


  constructor(props){
    super(props)
    this.state={
      applicantFname:"Shubham",
      applicantLname:"Sand",
      applicantHeading:"",
      applicantLocation:"",
      profile_img:"",
      applicant_id:"",
      applicant_email:"",
      applicant_phone:"",
      applicant_resume_name:"",
      jobs:[],
      title:"js developer",
      company:"Cong ty Abc",
      address:{city:"CAn tho", country: "Viet Nam"},
      jobDescription:"",
      skills:['Java','Js','Python'],
      easyapply:true,
      industry:"job industry",
      type:"fullTime",
      jobFunction:"job function",
      recruiter_id:"rec id01",
      job_id:"jobid01",
      time_diff:"",
      company_logo:"data:image/png;base64,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",
      profile_image:"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"


    }
    this.saveJob=this.saveJob.bind(this);
    this.setPhone=this.setPhone.bind(this);
    this.setEmail=this.setEmail.bind(this);
    this.uploadResume=this.uploadResume.bind(this);
    this.easy_apply=this.easy_apply.bind(this);
    this.getApplicant=this.getApplicant.bind(this);
  }

setPhone(e){
    this.setState({
        applicant_phone:e.target.value
    })
}
setEmail(e){
    this.setState({
        applicant_email:e.target.value
    })
}

async uploadResume(e){
console.log("RESUMES",e);


var fd = new FormData();
var filesList = document.getElementById("uploadResume").files;
if (!filesList[0].name.match(/.(pdf|doc|docx)$/i))
{
    printMessage("Please select an pdf/doc/docx file to upload.");
    return false;
}
fd.append("uploadSelect",filesList[0]);
console.log(fd);

try {
    let ret = await api('POST','/document/upload',fd,{'Content-Type': 'multipart/form-data'});
    console.log(ret);
    if(ret.status>=200 && ret.status<300)
    {
        let data = {
            'resume_url' : ((S3_URL) + ret['data']['payLoad'])
        }
        printMessage("Resume added Successfully.");
        this.setState({
            applicant_resume_name : data.resume_url
        })
        
    }
} catch (error) {
    console.log(Object.keys(error), error.response);
    printError(error);   //Pass Full response object to the printError method.
}

}

async easy_apply(){
    
    if(this.state.job_id && this.state.applicant_id && this.state.applicant_email && this.state.applicant_phone && this.state.applicant_resume_name){
        let data={
            email:this.state.applicant_email,
            phone:this.state.applicant_phone,
            resume:this.state.applicant_resume_name
        }
        try {
            let ret = await api('POST','jobs/' +this.state.job_id +'/easyApply',data);
            
            if(ret.status===200)
            {
                printMessage("You have successfully applied to this job ");
                $('#btn_close_apply').click();
            }
            else 
            {
                throw "error";
            }
          } 
          catch (error) 
          {
            console.log("ERROR in SAVE",error);
            console.log(Object.keys(error), error.response);
            printError(error);
          }

    }else{
        printMessage("Please entire the required Fields");
    }
    return false;
    
}

 async saveJob(){
     console.log("JOB ID",this.state.job_id);
    try {
        let ret = await api('POST','/jobs/'+this.state.job_id+'/save');
        console.log("ttt",ret);
        if(ret.status===200)
        {
            printMessage("Success! This job is successfully saved");
            
        }
        else 
        {
            throw "error";
        }
      } 
      catch (error) 
      {
        console.log("ERROR in SAVE",error);
        console.log(Object.keys(error), error.response);
        printError(error);
      }
        
  }

  setActiveID(id){
    this.props.set_active_id(id);
  }

  async getApplicant(){


    
    let _t = this;
    let id = sessionStorage.getItem('user_id');
   
  console.log(id);
  try {
    await api('PUT','/log/startApplication/'+this.state.job_id)
    let ret = await api('GET','/users/'+id);

   
    console.log("profile_img",ret.data.payLoad)
    if(ret.status>=200 && ret.status<300)
    {
        
        this.setState({
            applicantFname:ret.data.payLoad.user.name.first,
            applicantLname:ret.data.payLoad.user.name.last,
            profile_img:"user_profile_img.jpeg",
            applicantHeading:ret.data.payLoad.user.heading?ret.data.payLoad.user.heading:"Former Systems Engineer | Masters in Software Engineering|",
            applicantLocation:ret.data.payLoad.user.address?ret.data.payLoad.user.address.city:"San Francisco Bay Area",
            applicant_id:ret.data.payLoad.user.id,
            profile_image:S3_URL+ret.data.payLoad.user.profile_image,

        })
    }
    else 
    {
        throw "error";
    }
  } 
  catch (error) 
  {
    console.log(Object.keys(error), error.response);
    printError(error);
  }

  }

componentWillReceiveProps(nextProps){
let jobs=nextProps.jobs?nextProps.jobs:null;
let activeID=nextProps.activeID?nextProps.activeID:null;
let filteredJob=null;
if(activeID==null && jobs.length > 0){
    this.setActiveID(jobs[0]._id);
}
if(activeID!=null){
for(var i=0;i<jobs.length;i++){
    if(jobs[i]._id==activeID){
        filteredJob=jobs[i]
    }
}
}
if(filteredJob!=null){
    
    this.setState({
    title:filteredJob.title,
    company:filteredJob.company,
    address:filteredJob.address,
    jobDescription:filteredJob.description,
    industry:filteredJob.industry,
    type:filteredJob.type,
    skills:filteredJob.skills,
    easyapply:filteredJob.easy_apply,
    jobFunction:filteredJob.function,
    recruiter_id:filteredJob.recruiter,
    job_id:filteredJob._id,
    time_diff:filteredJob.time_diff,
    company_logo:S3_URL+filteredJob.company_logo

    })
}else{
    return;
}

}

  render() {

    $('#easy_apply_form').off('submit').submit((e) => {e.preventDefault(); this.easy_apply(); return false;});
    
    let activeJob=null;

let easyApplyButton=null;

if(this.state.easyapply){
    easyApplyButton=<div className='child inline-block-child'><button type="button" className="btn easy-apply" data-toggle="modal" data-target="#easyApplyModal" onClick={this.getApplicant}>Easy Apply</button></div>

}else {
  easyApplyButton = (
    <div className="child inline-block-child">
      <Link className="btn easy-apply" to={`/apply/${this.state.job_id}`}>
        Apply{" "}
      </Link>
    </div>
  );
}
    return (
      <div>
      <div className="row left-job-detail">
           
              <div className="col-md-3 left-job-detail-image">
                  <img src={this.state.company_logo} className="img-fluid job-detail-image" alt="LinkedIn"/>
                  
              </div>



{/*  Easy Apply Modal Dialog*/}
<div className="modal fade" id="easyApplyModal" tabindex="-1" role="dialog" aria-labelledby="easyApplyModalLabel" aria-hidden="true">
<div className="modal-dialog" role="document">
    <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="easyApplyModalLabel">Easy Apply</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="modal-body">

        <div className="row left-job-detail" >
           
              <div className="col-md-3 left-job-detail-image">
                  <img src={this.state.profile_image} className="img-fluid job-card-image-easy-apply" alt="" />
              </div>
              <div className="col-md-8 left-job-detail-desc">
              <div>
              <label className="heading-company">{this.state.applicantFname} {this.state.applicantLname}</label>
              </div>
              <div>
              <label>{this.state.applicantHeading}</label>
              </div>
              <div>
              <label style={{fontSize:"12px",color:"gray",fontWeight:"bold"}}>{this.state.applicantLocation}</label>
              </div>
              <div>
              <Link to={`/public-profile/${this.state.applicant_id}`}><button type="button" className="btn btn-link" onClick={() => $("#easyApplyModal").modal('hide')}>Review your profile</button></Link>
              </div>
              </div>
      </div>
            <form id="easy_apply_form">
                <label id="work-exp-form"> Email:</label><br/><input type="email" className="form-control" placeholder="abc@gmail.com" onChange={this.setEmail} required></input><br />
                <label id="work-exp-form"> Phone:</label><br/><input type="tel" id="work-exp-form" name="phone"
                placeholder="Contact Number (123-456-7890)"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required  className="form-control" onChange={this.setPhone}></input>
                <br/>
                    <div className="input-group">
                      <div className="upload-btn-wrapper">
                        <button className="btn btn1" >Upload Resume</button>
                        <input id="uploadResume" type="file" name="myfile" onChange={this.uploadResume} required/>
                      </div>

                    </div>
                    <div className="modal-footer">
            <button id="btn_close_apply" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary">Submit Application</button>
        </div>

            </form>
        </div>
        
    </div>
</div>
</div>







              <div className="col-md-9 left-job-detail-desc">
              <div className="heading-company">
              {this.state.title}
              </div>
              <div className="heading-location">
              {this.state.company} &#9670; {this.state.address.city}, {this.state.address.country}
              </div>
              
              <div className="heading-location">
              <label style={{color:"green",fontSize:"12px"}}>New &#9670;</label>&nbsp;<label style={{fontSize:"12px"}}>Posted {this.state.time_diff} ago</label>
              </div>
              <div className="heading-location-button">
              <img src={Watch} style={{width:"4%"}}></img>&nbsp;<label style={{paddingTop:"1%",fontSize:"12px"}}>Be an early applicant</label>
              </div>
              <div className="heading-location-button">
              <div className='parent' >
              <div className='child inline-block-child' style={{paddingRight:"20px"}}><button type="button" className="btn btn-outline-primary" style={{fontWeight:"bold"}} onClick={this.saveJob}>Save</button></div>
              {easyApplyButton}
            </div>
            </div>
            
              </div>

              <div style={{width:"100%"}}>
              
              <hr/>
              </div>
              <div className="row">
              
              <div className="col-md-8 job-description-partition">
              <div>
                <label className="heading-company">Job description</label>
                </div>
                <div>
                {this.state.jobDescription}
                </div>
                
              </div>
              <div className="col-md-4 job-description-partition">
                  <JobSkills skills={this.state.skills}/>
                  <JobRecruiter data={this.state.recruiter_id}/>
                  <JobFunctions type={this.state.type} industry={this.state.industry} jobFunction={this.state.jobFunction}/>                  
              </div>
              </div>
              
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    console.log("in map Jobs Search",state);
   return { jobs: state.searched_jobs.jobs,
            activeID:state.active_id.activeID
  };
  }
  
  const mapDispachToProps = dispatch => {
    return {
      
        set_active_id: (id) => dispatch(set_active_id(id)),

  
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(JobDetailedView);
  