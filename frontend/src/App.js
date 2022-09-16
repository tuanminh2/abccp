import React, { Component } from "react";
import "./App.css";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import "../node_modules/font-awesome/css/font-awesome.min.css";

import "bootstrap";

import store from "./store/store";

import { Route, BrowserRouter } from "react-router-dom";
import Main from "./components/Main/Main";
import { Provider } from "react-redux";

import StateLoader from "./store/store-actions";



import HomePage from "./components/Home/Home";
import RecruiterDashboard from "./components/recruiter/Dashboard/Dashboard";
import JobsHome from "./components/Jobs/JobsHome";
import JobDetailedView from "./components/Jobs/JobDetailedView";
import SearchedJobs from "./components/Jobs/SearchedJobs";
import Profile from "./components/profile/profile";
import Message from "./components/Message/Message";
import CompanyPage from "./components/Jobs/CompanyPage";
import JobSaved from "./components/Jobs/JobSaved";
import PostJob from "./components/PostJob/PostJob";
import PostJobfirst from "./components/PostJob/PostJobfirst";
import SavedJobsHome from "./components/Jobs/SavedJobsHome";
import JobsBySkill from "./components/Jobs/JobsBySkill";
import PublicProfile from "./components/profile/publicprofile";
import ApplicantHome from "./components/Home/ApplicantHome";
import RecruiterHome from "./components/Home/RecruiterHome";
import RecruiterConnection from "./components/Connection/RecruiterConnection";
import ApplicantConnection from "./components/Connection/ApplicantConnection";
import ListedJobs from "./components/recruiter/listedJobs";
import Recruitersignup from "./components/Recruitersignup/Recruitersignup";
import ApplyJob from "./components/ApplyJob/Applyjob";
import JobApplicantsHome from "./components/recruiter/jobApplicantsHome";
import RecruiterProfile from "./components/profile/RecruiterProfile";


const stateLoader = new StateLoader();

store.subscribe(() => {
    stateLoader.saveState(store.getState());
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
          <div>
                <Route path="/" component={HomePage} exact/>
                <Route path="/jobshome" component={JobsHome} exact />
                <Route path="/recruiter" component={RecruiterDashboard} exact/>
              
                <Route path="/jobdetailedview" component={JobDetailedView} exact />
                <Route path="/postedjobs" component={ListedJobs} exact />
                <Route path="/profile" component={Profile} exact />
                <Route path="/message" component={Message} exact />
                <Route path="/jobshome/savedjobs" component={SavedJobsHome} exact />
                <Route path="/searchedjobs/:criterion/:lat/:long" component={SearchedJobs} exact />
                <Route path="/searchedjobs/:title/:location" component={SearchedJobs} exact />
                <Route path="/jobsbyskill" component={JobsBySkill} exact />
                <Route path="/public-profile/:id" component={PublicProfile} exact />
                <Route path="/applicanthome" component={ApplicantHome} exact />
                <Route path="/applicantconnection" component={ApplicantConnection} exact />
                <Route path="/recruiterhome" component={RecruiterHome} exact />
                <Route path="/recruiterconnection" component={RecruiterConnection} exact />
                <Route path="/jobsaved" component={JobSaved} exact />
                <Route path="/postjob" component={PostJob} exact />
                <Route path="/postjobfirst" component={PostJobfirst} exact />
                <Route path="/recruitersignup" component={Recruitersignup} exact />
                <Route path="/apply/:id" component={ApplyJob} exact />
                <Route path="/jobapplicant/:jobId" component={JobApplicantsHome} exact />
                <Route path="/jobsaved" component={JobSaved} exact />
                <Route path="/companypage/:id" component={CompanyPage} exact />
                <Route path="/recruiterprofile" component={RecruiterProfile} exact />
                
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;