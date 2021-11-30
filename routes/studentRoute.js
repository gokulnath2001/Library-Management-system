//jshint esversion:6
const router = require("express").Router();
const Student = require("../models/student");
const Book = require("../models/books");
const Borrow = require("../models/borrow");
const { forEach } = require("lodash");
var count = 0;
router.get("/login", function(req, res){
    res.render("login",{count:count});
});

router.get("/register", function(req, res){
    res.render("register",{count:count});
});

router.get("/borrow/:user",function(req,res){
    const username = req.params.user;
    res.render("borrow",{count:0, username: username});
});

router.post("/borrow", function(req, res){
    const username = req.body.user;
    const bookname = req.body.bookname;
    Borrow.findOne({title: bookname}, function(err, foundbook){
        if(err){
            res.render(home);
        }
        else{
            if(foundbook){
                res.render("borrow", {count: 1, username: username});
            }
            else{
                Book.findOne({title: bookname}, function(err, bookuser){
                    if(err){
                        res.render("home");
                    }
                    else{
                        if(bookuser){
                            
                            
                            const newBook = new Borrow({
                                title: bookname,
                                author: bookuser.authors,
                                username: username,
                                date: new Date(),
                                datereturn: addDays(),
                            });
                            newBook.save();
                            // res.redirect("/student/dashboard/" + username);
                            res.render("borrowsuccess", { username: username, title: bookname});
                        }
                        else{
                            res.render("borrow", {count: 2, username: username});
                        }
                    }
                });
            }
        }
    });
});

router.get("/dashboard/:user",function(req,res){
    const username = req.params.user;
    Borrow.find({ username: username}, function(err, founduser){
        if(err){
            res.render("home");
        }
        else{
            if(founduser){
                var fit = founduser.length;
                var fine = 0;
                var list = [];
                founduser.forEach(element => {
                    fine = fine + fineCalc(element.date);
                    list.push(fineCalc(element.date));
                });
                res.render("dashboard",{
                    username:username,
                    fit: fit,
                    fine:fine,
                    founduser: founduser,
                    list: list, 
                });
            }
        }
    });
    
});

router.post("/login",function(req,res){
    var count = 0;
    const username = req.body.username;
    const password = req.body.password;
    Student.findOne({username: username}, function(err, founduser){
        if(err){
            res.render("login");
        }
        else{
            if(founduser){
                if(founduser.password === password ){
                    res.redirect("/student/dashboard/" + founduser.username);
                }
                else{
                    count = 1;
                    res.render("login",{count:count});
                }
            }
            else{
                count = 1;
                res.render("login",{count:count});
            }
        }
    });
});

router.post("/register",function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    var count =0;
    Student.findOne({username: username}, function(err, founduser){
        if(err){
            res.render("login");
        }
        else{
            if(founduser){
                count = 1;
                res.render("register",{count:count});
            }
            else{
                const studentItem = new Student({
                    username: req.body.username,
                    password: req.body.password
                });
                studentItem.save();
                res.redirect("/student/dashboard/" + req.body.username);
            }
        }
    });
});

router.post("/return", function( req, res){
    const title = req.body.title;
    const username = req.body.username;
    Borrow.findOneAndDelete({title: title}, function(err, deleteBook){
        if(err){
            console.log(err);
        }
        else{
            res.render("return", {deleteBook: title, username: username});
        }
    });
});

module.exports = router;

// Student.findOne({username: username}, function(err, founduser){
//     // rry Potter and the Half-Blood Prince (Harry Potter  #6)
//     if(err){
//         res.render("home");
//     }
//     else{
//         if(founduser){
//             var fit = founduser.books;
//             fit = fit.length;
            
//             res.render("dashboard",{
//                 username: username,
//                 founduser: founduser,
                
//                 fit: fit
//             });
//         }
//         else{
//             res.render("home");
//         }
//     }
// });  

function addDays() {
    var result = new Date();
    result.setDate(result.getDate() +15);
    return result;
}

function subDays() {
     var result = new Date();
    result.setDate(result.getDate() +5);
    return result;
}

function fineCalc(date1){
    var date2 = new Date();
    var Difference_In_Time = date2.getTime() - date1.getTime();
  
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if(Difference_In_Days>15){
        Difference_In_Days = Difference_In_Days - 15;
        return Math.trunc(Difference_In_Days)*10;
    }
    else{
        return 0;
    }
}

function getDate(today){   
    var year = today.getFullYear();
    var mes = today.getMonth()+1;
    var dia = today.getDate();
    var fecha =dia+"-"+mes+"-"+year;
    return fecha;
}