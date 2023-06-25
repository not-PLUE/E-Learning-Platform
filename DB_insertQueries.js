const { db, disconnect_DB} = require('./DB_connect.js');

//====INSERT INTO INSTRUCTORS TABLE
function populateInstructorTable(name, email){
    const insertInstructors = `
        INSERT INTO Instructors (name, email) VALUES 
        ('`+name+`', '`+email+`')
    `;
    db.query(insertInstructors,(err)=>{
        if(err){
            console.log("Could not insert into Instructors Table \n"+err+"\n");
            return 1;
        }
        else{
            console.log("Successfully inserted into Instructor Table!\n"); 
            return 0;
        }
    })
}

//=====INSERT INTO COURSES TABLE
function populateCoursesTable(course_name, instructor_id, max_seat, free_seats, start_date){
    const insertCourses = `
    INSERT INTO Courses (course_name, instructor_id, max_seat, free_seats, start_date) VALUES 
        ('`+course_name+`', `+instructor_id+`, `+max_seat+`, `+free_seats+`, '`+start_date+`')
    `;
    db.query(insertCourses,(err)=>{
        if(err){
            console.log("Could not insert into Courses Table \n"+err+"\n");
            return 1;
        }
        else{
            console.log("Successfully inserted into Courses Table!\n"); 
            return 0;
        }
    })
}

//======INSERT INTO LEARNERS TABLE

function populateLearnersTable(name, email, phone_number, linkedin){
    const insertLearners = `
    INSERT INTO Learners (name, email, phone_number, linkedin) VALUES 
        ('`+name+`', '`+email+`', '`+phone_number+`', '`+linkedin+`')
    `;
    db.query(insertLearners,(err)=>{
        if(err){
            console.log("Could not insert into Learners Table \n"+err+"\n");
            return 1;
        }
        else{
            console.log("Successfully inserted into Learners Table!\n"); 
            return 0;
        }
    })
}


function populateLeadsTable(course_id, learner_id){
    var status; //'Accept', 'Reject', 'Waitlist'
    const getCourseTime=`
        SELECT start_date, free_seats FROM Courses
        WHERE course_id=`+course_id+`
    `;

    db.query(getCourseTime, (err, results) => {
        if (err) {
            console.error('Could not retrieving course start date:', err+"\n");
        }
        else{
            if (results.length > 0) {
                const startDate = results[0].start_date;
                const freeSeats = results[0].free_seats;
                const date = new Date();
                if(date<startDate)
                    status = 'Accept'
                else
                    status = 'Reject'
                if(freeSeats<=0)        //we don't need to check accept
                    status = 'Reject'
                const insertLead=`
                    INSERT INTO Leads (course_id, learner_id, status) VALUES 
                    (`+course_id+`, `+learner_id+`, '`+status+`')
                `;
                db.query(insertLead,(err)=>{
                    if(err){
                        console.log("Could not insert into Leads Table \n"+err+"\n");
                        return 1;
                    }
                    else{
                        console.log("Successfully inserted into Leads Table!\n"); 
                        return 0;
                    }
                })
    
            } else {
                console.log('Course not found.\n');
                }
            }
    })
}

function populateCommentsTable(lead_id, instructor_id, comment){
    const insertComments = `
        INSERT INTO Comments (lead_id, instructor_id, comment) VALUES (
            `+lead_id+`, `+instructor_id+`, '`+comment+`'
            )`;
    db.query(insertComments,(err)=>{
        if(err){
            console.log("Could not insert into Comments Table \n"+err+"\n");
            return 1;
        }
        else{
            console.log("Successfully inserted into Comments Table!\n"); 
            return 0;
        }
    })
}


module.exports = {
    populateInstructorTable,
    populateCoursesTable,
    populateLearnersTable,
    populateLeadsTable,
    populateCommentsTable
}