const nodemailer=require("nodemailer");
require("dotenv").config;
const cron = require('node-cron');
const Tasks = require("../models/task");

const sendNotification = async ()=>{
    const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.MAIL_ID,
    pass:process.env.MAIL_PASS
  }
});
// cron.schedule('* * * * *', async () => {
const now = new Date();
const fiveMins = new Date(now.getTime() + 5 * 60 * 1000);

// this conversion is for server purpose for local above two line is enough
//  deadline: { $gte: nowUTC, $lte: fiveMinsUTC },
const nowUTC = new Date(now.toISOString());
  const fiveMinsUTC = new Date(fiveMins.toISOString());

    console.log("now time",now);
    console.log("fivemins",fiveMins);
     console.log("now time iso",now.toISOString());
    console.log("fivemins",fiveMins.toISOString());

  console.log("utc",nowUTC);
  console.log(fiveMinsUTC)
    
  const tasks = await Tasks.find({
    completed: false,
    deadline: { $gte: now, $lte: fiveMins },
    isNotificationSent:{$ne:true},
  }).populate('userID');

  tasks.forEach(async task=>{
      const message = `
    Hi ${task.userID.name},
    
    Your task "${task.name}" is about to reach its deadline at ${task.deadline}.
    Please complete it on time.

    Regards,
    Task Manager
  `;

  const options={
  from:process.env.MAIL_ID,
to:task.userID.email,
  subject: `Task Reminder: ${task.name} `,
  text:message
  };
  transporter.sendMail(options,(error,info)=>{
  if(error){
    console.log("error",error)
  }else{
    console.log("sent",info.response);
  }
  })

  task.isNotificationSent=true;
  await task.save();
  })








// });

}

module.exports = sendNotification;

