#! /usr/bin/env node

console.log('This script populates courses and professors data to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

const async = require('async')
const Course = require('./app/models/course.model.js')
const Professor = require('./app/models/professor.model.js')

const dbConfig = require('./config/database.config.js');

const courses = new Map();
const professors = [];

function courseCreate(course_code, course_name, course_description, callback) {
  coursedetail = {
    course_code: course_code,
    course_name: course_name || "Name for " + course_code,
    course_description: course_description || "Testing description pending editing."
  }

  const course = new Course(coursedetail);
  course.save(function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    console.log('New Course: ' + course);
    courses.set(course_code, course);
    callback(null, course);
  });
}


function professorCreate(last_name, middle_name, first_name, course, callback) {
  professordetail = {
    last_name: last_name,
    middle_name: middle_name || "",
    first_name: first_name,
    course: course || []
  }

  const professor = new Professor(professordetail);
  professor.save(function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    console.log('New Professor: ' + professor);
    professors.push(professor);
    callback(null, professor);
  });
}

function createCourses(cb) {
  async.parallel([
    function (callback) {
      courseCreate('CI', null, null, callback);
    },
    function (callback) {
      courseCreate('ANLY 502', null, null, callback);
    },
    function (callback) {
      courseCreate('ANLY 500', null, null, callback);
    },
    function (callback) {
      courseCreate('ANLY 510', null, null, callback);
    },
    function (callback) {
      courseCreate('ITPM 515-50', null, null, callback);
    },
    function (callback) {
      courseCreate('ISEM 565', null, null, callback);
    },
    function (callback) {
      courseCreate('PGMT 510-55', null, null, callback);
    },
    function (callback) {
      courseCreate('ISEM 501-ICT', null, null, callback);
    },
    function (callback) {
      courseCreate('ANLY 515', null, null, callback);
    },
    function (callback) {
      courseCreate('MGMT 520-91', null, null, callback);
    },
    function (callback) {
      courseCreate('PMGT 530', null, null, callback);
    },
    function (callback) {
      courseCreate('PGMT 530-90', null, null, callback);
    },
    function (callback) {
      courseCreate('ANLY 500-51', null, null, callback);
    },
    function (callback) {
      courseCreate('PGMT 540-90', null, null, callback);
    },
    function (callback) {
      courseCreate('MGMT 510-50', null, null, callback);
    },
    function (callback) {
      courseCreate('LTMS 500', null, null, callback);
    },
    function (callback) {
      courseCreate('ISEM 551-90', null, null, callback);
    },
    function (callback) {
      courseCreate('MGMT 510-53N', null, null, callback);
    },
    function (callback) {
      courseCreate('ANLY 500-52', null, null, callback);
    },
    function (callback) {
      courseCreate('ANLY 506-91', null, null, callback);
    },
    function (callback) {
      courseCreate('PMGT 510', null, null, callback);
    },
    function (callback) {
      courseCreate('ANLY 525', null, null, callback);
    },
    function (callback) {
      courseCreate('GRAD 695-93', null, null, callback);
    },
    function (callback) {
      courseCreate('MATH 510-90', null, null, callback);
    },
    function (callback) {
      courseCreate('MGMT 520-52', null, null, callback);
    },
    function (callback) {
      courseCreate('ANLY 500-53', null, null, callback);
    },
    function (callback) {
      courseCreate('PMGT 510-91', null, null, callback);
    },
    function (callback) {
      courseCreate('MGMT 560-50', null, null, callback);
    },
    function (callback) {
      courseCreate('CISC 520', null, null, callback);
    },
    function (callback) {
      courseCreate('MGMT 513-50', null, null, callback);
    },
    function (callback) {
      courseCreate('PMGT 570-90', null, null, callback);
    },
    function (callback) {
      courseCreate('MGMT 520-92', null, null, callback);
    },
    function (callback) {
      courseCreate('ANLY 512', null, null, callback);
    },
    function (callback) {
      courseCreate('ANLY 500-50', null, null, callback);
    },
    function (callback) {
      courseCreate('ISEM 500', null, null, callback);
    }
  ],
    // optional callback
    cb);
}


function createProfessors(cb) {
  async.parallel([
    function (callback) {
      professorCreate("Faculty", null, "Adjunct", [courses.get("CI")], callback);
    },
    function (callback) {
      professorCreate("Motamedi", null, "Ali", [courses.get("ANLY 502")], callback);
    },
    function (callback) {
      professorCreate("Bagirov", null, "Feyzi", [courses.get("ANLY 500"), courses.get("ANLY 510")], callback);
    },
    function (callback) {
      professorCreate("Plummer", null, "Chris", [courses.get("ITPM 515-50")], callback);
    },
    function (callback) {
      professorCreate("Morgan", null, "Don", [courses.get("ISEM 565"), courses.get("PGMT 510-55")], callback);
    },
    function (callback) {
      professorCreate("O'Hara", null, "Don", [courses.get("ISEM 501-ICT")], callback);
    },
    function (callback) {
      professorCreate("Geisler", null, "Barbara", [courses.get("MGMT 520-91")], callback);
    },
    function (callback) {
      professorCreate("North", null, "Matt", [courses.get("ISEM 565")], callback);
    },
    function (callback) {
      professorCreate("Onu", null, "Stephen", [courses.get("PMGT 530")], callback);
    },
    function (callback) {
      professorCreate("Maher", null, "Edmund", [courses.get("ANLY 500")], callback);
    },
    function (callback) {
      professorCreate("Bradley", null, "Faith", [courses.get("ANLY 502")], callback);
    },
    function (callback) {
      professorCreate("Robinson", null, "Gerry", [courses.get("PGMT 530-90")], callback);
    },
    function (callback) {
      professorCreate("Sell", null, "John", [courses.get("ANLY 500-51")], callback);
    },
    function (callback) {
      professorCreate("Korn", null, "Jonathan", [courses.get("ANLY 500-51")], callback);
    },
    function (callback) {
      professorCreate("Crocco", "Di", "Katherine", [courses.get("PGMT 540-90")], callback);
    },
    function (callback) {
      professorCreate("Huggins", null, "Kevin", [courses.get("ANLY 510")], callback);
    },
    function (callback) {
      professorCreate("Unknown Last Name", null, "Martin", [courses.get("ANLY 515")], callback);
    },
    function (callback) {
      professorCreate("Korn", null, "Matthew", [courses.get("ANLY 500-51")], callback);
    },
    function (callback) {
      professorCreate("Noorbaksh", null, "Mehdi", [courses.get("MGMT 510-50")], callback);
    },
    function (callback) {
      professorCreate("Moore", "R.", "Mark", [courses.get("LTMS 500")], callback);
    },
    function (callback) {
      professorCreate("Ashby", null, "Nathaniel", [courses.get("ANLY 510")], callback);
    },
    function (callback) {
      professorCreate("Allu", null, "Naveen", [courses.get("ISEM 551-90")], callback);
    },
    function (callback) {
      professorCreate("Unkown Last Name", null, "Nwoji", [courses.get("MGMT 510-53N")], callback);
    },
    function (callback) {
      professorCreate("Scrivner", null, "Olga", [courses.get("ANLY 500-52")], callback);
    },
    function (callback) {
      professorCreate("Casimir", null, "Patrick", [courses.get("ANLY 506-91")], callback);
    },
    function (callback) {
      professorCreate("Harvey III", "A.", "Paul", [courses.get("PMGT 510")], callback);
    },
    function (callback) {
      professorCreate("Penn", null, "Stephen Paul", [courses.get("ANLY 525")], callback);
    },
    function (callback) {
      professorCreate("MacDougall", null, "Elizabeth", [courses.get("GRAD 695-93")], callback);
    },
    function (callback) {
      professorCreate("Ford", null, "Rand", [courses.get("MATH 510-90")], callback);
    },
    function (callback) {
      professorCreate("Bradley", null, "Richard", [courses.get("MGMT 520-52")], callback);
    },
    function (callback) {
      professorCreate("Sadeghian", null, "Roozbeh", [courses.get("ANLY 500-53")], callback);
    },
    function (callback) {
      professorCreate("Upadhyay", null, "Satish", [courses.get("PMGT 510-91")], callback);
    },
    function (callback) {
      professorCreate("Rainey", null, "Scott", [courses.get("MGMT 560-50")], callback);
    },
    function (callback) {
      professorCreate("Shaalan", null, "Majid", [courses.get("CISC 520")], callback);
    },
    function (callback) {
      professorCreate("Martin", "R.", "Spencer", [courses.get("MGMT 513-50")], callback);
    },
    function (callback) {
      professorCreate("Taha", "M", "Doaa", [courses.get("ANLY 500")], callback);
    },
    function (callback) {
      professorCreate("Sheives", "C.", "Thomas", [courses.get("PMGT 570-90")], callback);
    },
    function (callback) {
      professorCreate("Villone", null, "Vicki", [courses.get("MGMT 520-92")], callback);
    },
    function (callback) {
      professorCreate("Dutka", "L.", "Warren", [courses.get("PMGT 510-20")], callback);
    },
    function (callback) {
      professorCreate("Unknown Last Name", null, "Unknown First Name", [courses.get("ANLY 500-53"), courses.get("ANLY 512"), courses.get("ANLY 500-50")], callback);
    },
    function (callback) {
      professorCreate("French", null, "William", [courses.get("ISEM 500")], callback);
    },
    function (callback) {
      professorCreate("Yun", null, "Daqing", [courses.get("CISC 520")], callback);
    }
  ],
    // Optional callback
    cb);
}



async.series([
  createCourses,
  createProfessors
],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    else {
    }
    // All done, disconnect from database
    dbConfig.close();
    console.log(courses.size);
    console.log(professors.length);
  });