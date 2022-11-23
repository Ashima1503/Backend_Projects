const express=require('express');
var app=express();
const fs=require('fs');
const bodyParser=require('body-parser');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(request,response){
response.sendFile(__dirname+'/st1.html');

})

app.post('/next',function(request,response){
    var id1=request.body.id;
    var name1=request.body.name;
    var addr =request.body.address;
    var M1=Number(request.body.s1);
    var M2=Number(request.body.s2);
    var M3=Number(request.body.s3);
    var M4=Number(request.body.s4);
    var M5=Number(request.body.s5);

    var total=Number(M1+M2+M3+M4+M5);
    var average=total/5;
    
    var grade = 'A';
    if(average>=90){
        grade='A';
    }else if(average>=80 && average<90){
        grade='B';
    }else if(average>=70 && average<80){
        grade='C';
    }else if(average>=55 && average<70){
        grade='D';
    }else if(average>=40 && average<55){
        grade='E';
    }else if(total<=33){
        grade='F';
    }

    

    let scoreCard = {
        'Student Id' : id1,
        'Student Name' : name1,
        'Address':addr,
        'Programming Abstraction' : M1,
        'Front End Development' : M2,
        'Back End Development' : M3,
        'Algorithms Designs And Implementation':M4,
        'Business Communication':M5,
        'Total Marks' : total,
        'Average Marks' : average,
        'Grade':grade
    }

    fs.appendFileSync("data.txt",JSON.stringify(scoreCard));
    const data = fs.readFileSync("data.txt","utf-8")
    
    // fs.writeFileSync("data.txt","DATA OF ALL STUDENTS\r\n");
    // var info=JSON.stringify(scoreCard);
    // fs.appendFileSync("data.txt",`\r\n ${info}`);
    // const data = fs.readFileSync("data.txt","utf-8",`\r\n ${info}`)
   
    console.log(data);
    response.send(data);
})

app.listen(5000,()=>{
    console.log("Server started at 5000.")
})
