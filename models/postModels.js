var mongoose = require('mongoose');

var RegistGovernSchema = new mongoose.Schema({
    fullname: String,
    dateofBirth: String,
    sex: String,
    maritalStatus: String,
    age: String,
    email: String,
    phone: String,
    village: String,
    community: String,
    lga: String,
    state: String,
    cv: String,
    categories: String,

    businessIntrst: String,
    businessHwLng: String,
    civilServant: String,
    formerWork: String,
    businessLng: String,
    businessNature: String,
    fmlyMembers: String,
    expandBusiness: String,
    attractCapital: String,
    details: String,
    respStateElder: String,
    respCommElder: String,
    presentResident: String,
    areaIntEbnyi: String,
    AssistanceRq: String ,
    
    areaofInterest: String,
    schlAttended: String,
    gradeObtained: String,
    qualification: String,
    employed: String,
    employer: String,
    yrWorkExp: String,
    subject: String,
    intrtDvpmt: String,
    projectHelp: String,

    School: String,
    NameSchool: String,
    CourseStudy: String,
    Grade: String,
    yearAdmitted: String,
    yearGraduated: String,
    degreeObtained: String,
    professionalCert: String,
    Schoolprogram: String,
    certReceived: String,
    employer: String,
    addressEmployer: String,
    jobTitle: String,
    nameSupervisor: String,
    supervisorPhone: String,
    dateStarted: String,
    dateEnded: String,
    uniqueAchievements: String,
    currentlyDoing: String,
    assistanceNeeded: String,
    businessPlan: String,
    yourAchievement: String,
    referralName: String,
    referralPhone: String,
    referralRelationship: String,

    SchoolAt: String,
    yrGrad: String,
    AreaSpec: String,
    completedInternship: String,
    ProfWrkExp: String,
    VolWrkExp: String,
    license: String,
    areaIntrst: String,
    governmentHelp: String,

    yrstrading: String,
    learnUnderSomeone: String,
    duration: String,
    learn: String,
    tradeLine: String,
    exportingImporting: String,
    dollarsHow: String,
    receiveMoney: String,
    sourceGoods: String,
    financeDepts: String,
    howMuch: String,
    growTrade: String,
    learningTrade: String,
    howmanyYoungP: String,
    traderEsSDP: String, 

    businessInterest: String,
    Qualification: String,
    workExper: String,
    discussWorkExp: String,
    businessNature: String,
    succeChall: String,
    peopleProject: String,
    mentored: String,
    remarkproject: String,
    entInterest: String,
    businessEBSDP: String,
    presResident: String,

    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model("RegistGov", RegistGovernSchema);