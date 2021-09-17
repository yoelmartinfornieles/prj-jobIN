const router = require("express").Router();
const alert = require("alert");
const isLoggedIn = require("../middleware/isLoggedIn");
const Job = require("../models/Job.model");
const User = require("../models/User.model");
const Api = require("../services/ApiHandler");
const themuseAPI = new Api('https://www.themuse.com/api/public')

router.get('/projectList/:page',(req, res)=>{
    let page = Number(req.params.page);
    themuseAPI
    .getAllProjects(page)
    .then((allProjects) => {
        const projectArray = allProjects.data.results;
        for (let z=0; z<projectArray.length; z++) {
            let date = projectArray[z].publication_date.split(["T"])
            let day = date[0]
            let hour = date[1].split("Z")
            hour = hour [0]
            projectArray[z].publication_date = ({day: day, hour: hour})
        } 
        let previous;
        let second = page +1;
        let third = page +2;
        let fourth = page +3;
        let fifth = page +4;
        let sixth = page +5;
        let next = page + 6;
        let loggedIn = req.session.user;
        if (page > 1){
            previous = page-1;
            res.render('jobs/list', {jobs: projectArray, previous: previous, page: page, next: next, second: second, third: third, fourth: fourth, fifth: fifth, sixth: sixth, loggedIn: loggedIn})
        } else {
            res.render('jobs/list', {jobs: projectArray, page: page, next: next, second: second, third: third, fourth: fourth, fifth: fifth, sixth: sixth, loggedIn: loggedIn})
        }
    })
    .catch(err => console.log(err));
})

router.get('/companyList/:page',(req, res)=>{
    let page = Number(req.params.page);
    themuseAPI
    .getAllCompanies(page)
    .then((allCompanies) => {
        const companyArray = allCompanies.data.results;
        let previous;
        let second = page +1;
        let third = page +2;
        let fourth = page +3;
        let fifth = page +4;
        let sixth = page +5;
        let next = page + 6;
        let loggedIn = req.session.user;
        if (page > 1){
            previous = page-1;
            res.render('companies/list', {companies: companyArray, previous: previous, page: page, next: next, second: second, third: third, fourth: fourth, fifth: fifth, sixth: sixth, loggedIn: loggedIn})
        } else {
            res.render('companies/list', {companies: companyArray, page: page, next: next, second: second, third: third, fourth: fourth, fifth: fifth, sixth: sixth, loggedIn: loggedIn})
        }
    })
    .catch(err => console.log(err));
})

router.get(`/jobs/:id`,(req, res) => {
    let projectId = req.params.id;
    themuseAPI
    .getProjectById (projectId)
    .then((project) => {
        let date = project.data.publication_date.split(["T"])
        let day = date[0]
        let hour = date[1].split("Z")
        hour = hour [0]
        
        let companyId = project.data.company.id;
        themuseAPI
        .getCompanyData(companyId)
        .then((company) =>{ 
            let loggedIn = req.session.user;
            project.data.publication_date = ({day: day, hour: hour})
            res.render ("jobs/job", {job: project.data, company: company.data, loggedIn: loggedIn})
        });
    })
})

router.get(`/company/:id`,(req, res) => {
    let companyId = req.params.id;
    themuseAPI
    .getCompanyData (companyId)
    .then((company) => { 
        let loggedIn = req.session.user;
        res.render ("companies/company", {company: company.data, loggedIn: loggedIn})
    });
})

router.get(`/jobs/company/:id/:page`, (req, res) => {
    let companyId = req.params.id;
    let page = Number(req.params.page);
    themuseAPI
    .getCompanyJobs(companyId, 1)
    .then((allProjects) => {
        const projectArray = allProjects.data.results;
        for (let z=0; z<projectArray.length; z++) {
            let date = projectArray[z].publication_date.split(["T"])
            let day = date[0]
            let hour = date[1].split("Z")
            hour = hour [0]
            projectArray[z].publication_date = ({day: day, hour: hour})
        } 
        let previous;
        let second = page +1;
        let third = page +2;
        let fourth = page +3;
        let fifth = page +4;
        let sixth = page +5;
        let next = page + 6;
        let loggedIn = req.session.user;
        if (page > 1){
            previous = page-1;
            res.render('jobs/list', {jobs: projectArray, previous: previous, page: page, next: next, second: second, third: third, fourth: fourth, fifth: fifth, sixth: sixth, loggedIn: loggedIn})
        } else {
            res.render('jobs/list', {jobs: projectArray, page: page, next: next, second: second, third: third, fourth: fourth, fifth: fifth, sixth: sixth, loggedIn: loggedIn})
        }
    })
    .catch(err => console.log(err));
})

router.post('/search', (req, res) => {
    let url="";
    let bodyArray = Object.values(req.body)
    let index= 0;
    let firstPart = true;
    for(variable in req.body){
        if (bodyArray[index]){
            console.log ("variable: ", bodyArray[index])
            let key = variable
            if (firstPart){
                url=`${key}`+"="+`${bodyArray[index]}`;
                firstPart = false;
            } else {
                url+="&"+`${key}`+"="+`${bodyArray[index]}`;
            }
        }
        index ++;
    }
    console.log("url: ", url)
    let page=1;
    themuseAPI
    .getProjectsBy(url,page)
    .then((allProjects) => {
        const projectArray = allProjects.data.results;
        for (let z=0; z<projectArray.length; z++) {
            let date = projectArray[z].publication_date.split(["T"])
            let day = date[0]
            let hour = date[1].split("Z")
            hour = hour [0]
            projectArray[z].publication_date = ({day: day, hour: hour})
        } 
        let previous;
        let second = page +1;
        let third = page +2;
        let fourth = page +3;
        let fifth = page +4;
        let sixth = page +5;
        let next = page + 6;
        let loggedIn = req.session.user;
        if (page > 1){
            previous = page-1;
            res.render('jobs/list', {jobs: projectArray, previous: previous, page: page, next: next, second: second, third: third, fourth: fourth, fifth: fifth, sixth: sixth, loggedIn: loggedIn})
        } else {
            res.render('jobs/list', {jobs: projectArray, page: page, next: next, second: second, third: third, fourth: fourth, fifth: fifth, sixth: sixth, loggedIn: loggedIn})
        }
    })
    .catch(err => console.log(err));  
}) 

router.post('/searchCompany', (req, res) => {
    let url="";
    let bodyArray = Object.values(req.body)
    let index= 0;
    let firstPart = true;
    for(variable in req.body){
        if (bodyArray[index]){
            console.log ("variable: ", bodyArray[index])
            let key = variable
            if (firstPart){
                url=`${key}`+"="+`${bodyArray[index]}`;
                firstPart = false;
            } else {
                url+="&"+`${key}`+"="+`${bodyArray[index]}`;
            }
        }
        index ++;
    }
    console.log("url: ", url)
    let page=1;
    themuseAPI
    .getCompaniesBy(url,page)
    .then((allCompanies) => {
        const companyArray = allCompanies.data.results;
        let previous;
        let second = page +1;
        let third = page +2;
        let fourth = page +3;
        let fifth = page +4;
        let sixth = page +5;
        let next = page + 6;
        let loggedIn = req.session.user;
        if (page > 1){
            previous = page-1;
            res.render('companies/list', {companies: companyArray, previous: previous, page: page, next: next, second: second, third: third, fourth: fourth, fifth: fifth, sixth: sixth, loggedIn: loggedIn})
        } else {
            res.render('companies/list', {companies: companyArray, page: page, next: next, second: second, third: third, fourth: fourth, fifth: fifth, sixth: sixth, loggedIn: loggedIn})
        }
    })
    .catch(err => console.log(err));  
}) 

router.post("/add-favorite", isLoggedIn ,(req, res) =>{
    const query = { name, locations, publication_date_day, publication_date_hour, apiId, company } = req.body
    const idToCheck = req.body.apiId;
        Job.find({apiId: idToCheck})
	    .then (jobArray => {
		if (jobArray.length === 0) {
            console.log("No estoy repetido")
            Job.create(query)
            .then(result => {
                console.log("Result: ", result)
                User.findByIdAndUpdate(req.user._id, {$push : {favorites : result._id}})
                .then(()=>{
                    res.redirect("/profile");
                })
            })
            .catch(err => console.log(err))
        } else {
            console.log("Si estoy repetido")
			User.findById(req.user._id)
            .then((user)=>{
                if (!user.favorites.includes(jobArray[0]._id)){
                    User.findByIdAndUpdate(req.user._id, {$push: {favorites : jobArray[0]._id}})
                    .then(()=>{
                        res.redirect("/profile")
                    })
                }else{
                res.redirect("/profile")
                }
            })
            .catch((err)=>{
            console.log(err)
            })
		}
	}) 
})


router.post("/delete-favorite",isLoggedIn,(req,res)=>{
    const {apiId} = req.body
    User.findByIdAndUpdate(req.user._id, {$pull : {favorites : apiId}})
    .then(()=>{
        res.redirect("/profile")
    })
    .catch(err => console.log(err))
})

module.exports = router;