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
        if (page > 1){
            previous = page-1;
            res.render('jobs/list', {jobs: projectArray, previous: previous, page: page, next: next, second: second, third: third, fourth: fourth, fifth: fifth, sixth: sixth})
        } else {
            res.render('jobs/list', {jobs: projectArray, page: page, next: next, second: second, third: third, fourth: fourth, fifth: fifth, sixth: sixth})
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
            //console.log("hemen duzu: ", company)
            project.data.publication_date = ({day: day, hour: hour})
            res.render ("jobs/job", {job: project.data, company: company.data})
        });
    })
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
        if (page > 1){
            previous = page-1;
            res.render('jobs/companyList', {jobs: projectArray, previous: previous, page: page, next: next, second: second, third: third, fourth: fourth, fifth: fifth, sixth: sixth})
        } else {
            res.render('jobs/companyList', {jobs: projectArray, page: page, next: next, second: second, third: third, fourth: fourth, fifth: fifth, sixth: sixth})
        }
    })
    .catch(err => console.log(err));
})

/* router.post("/add-favorite", isLoggedIn ,(req, res) =>{
const query = { name, status, species, gender, image, apiId } = req.body
const idToCheck = req.body.apiId;
    Character.find({apiId: idToCheck})
	.then (charArray => {
		//comprobar si ese apiId ya esta en db characters
		if (charArray.length === 0) {
            Character
                .create(query)
                .then(result => {
                  User
                    .findByIdAndUpdate(req.user._id,{$push : {favorites : result._id}})
                    .then(()=>{
                        res.redirect("/characters")
                    })
                })
                .catch(err => console.log(err))
        } else {
			User
            .findById(req.user._id)
            .then((user)=>{
                if (!user.favorites.includes(charArray[0]._id)){
                    User
                    .findByIdAndUpdate(req.user._id,{$push : {favorites : charArray[0]._id}})
                    .then(()=>{
                        res.redirect("/characters")
                    })
                }else{res.redirect("/characters")}
            })
            .catch((err)=>{
            console.log(err)
            })
            
            
            
		}
	}) 
})


router.post("/delete-favorite",isLoggedIn,(req,res)=>{
    const {id} = req.body
    User.findByIdAndUpdate(req.user._id,{$pull : {favorites : id}})
    .then(()=>{
        res.redirect("/profile")
    })
    .catch(err => console.log(err))
})

/**
 * ---arrays
{ field: { $in: [ value1, value2, ..... , valueN ] } }
{ field: { $nin: [ value1, value2, ..... , valueN ] } }
{ field: { $all: [ value1, value2, ..... , valueN ] } }
 */ 

module.exports = router;