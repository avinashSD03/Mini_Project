import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import _ from 'lodash';
import cors from 'cors';
import multer from "multer";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session, { Cookie } from "express-session";
import env from "dotenv";

// ------ Initialization ------
const app = express();
const port = 3001;
const saltRounds = 10;
env.config();

// ------ Middlewares ------
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// ------ Postgre Connection ------
const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});
db.connect();

// ------ Multer For Handling Files ------
const dir=process.env.DIR_PATH
const imageUpload = multer({
    storage: multer.diskStorage(
        {
            destination: function (req, file, cb) {
                cb(null, dir);
            },
            filename: function (req, file, cb) {
                cb(
                    null,
                    new Date().valueOf() + 
                    '_' +
                    file.originalname
                );
            }
        }
    ), 
});

// ------ Admin Routes ------
app.get('/allAdmin',async(req,res)=>{
  const queryRes=await db.query("SELECT * FROM admins");
  res.json(queryRes.rows);
})

app.get('/adminView',async(req,res)=>{
  const queryRes=await db.query("SELECT up_usn,up_dept,up_sem,up_sub,up_unit,up_filename,u_name,u_sem,u_dept,up_isvalid FROM uploads up inner join users u on up.up_usn=u.u_usn where up_isvalid is null");
  res.json(queryRes.rows);
})

app.get('/adminViewValid',async(req,res)=>{
  const queryRes=await db.query("SELECT up_usn,up_dept,up_sem,up_sub,up_unit,up_filename,u_name,u_sem,u_dept,up_isvalid FROM uploads up inner join users u on up.up_usn=u.u_usn where up_isvalid=$1",[true]);
  res.json(queryRes.rows);
})

app.get('/adminViewInvalid',async(req,res)=>{
  const queryRes=await db.query("SELECT up_usn,up_dept,up_sem,up_sub,up_unit,up_filename,u_name,u_sem,u_dept,up_isvalid FROM uploads up inner join users u on up.up_usn=u.u_usn where up_isvalid=$1",[false]);
  res.json(queryRes.rows);
})

app.post('/adminValidate',async(req,res)=>{
  const {target,status}=req.body;
  await db.query("UPDATE uploads SET up_isvalid=$1 WHERE up_filename=$2",[status,target]);
  res.json("Update Successful");
})

// ------ Login and Register Routes ------
app.get('/',(req,res)=>{
  res.json("logged in")
})

app.get("/login",(req,res)=>{
  res.json("wrong password")
})

app.post("/login",passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.post("/register", async (req, res) => {
  const {name,usn,sem,dept,pswd}=req.body;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE u_usn = $1", [usn]);

    if (checkResult.rows.length > 0) {
      res.json('exist')
    } else {
      bcrypt.hash(pswd, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query("INSERT INTO users (u_name, u_usn,u_sem,u_dept,u_pswd) VALUES ($1,$2,$3,$4,$5) RETURNING *",[name,usn,sem,dept,hash]);
          const user = result.rows[0];
          req.login(user, (err) => {
              res.json('registered')
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE u_usn = $1 ", [username]);

      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.u_pswd;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            //Error with password check
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              //Passed password check
              return cb(null, user);
            } else {
              //Did not pass password check
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// ------ Notes.jsx Routes ------
app.get('/getUniqueDept/:sem',async(req,res)=>{
  try {
    const {sem}=req.params;
    const queryRes=await db.query("SELECT DISTINCT up_dept FROM uploads WHERE up_sem=$1",[sem]);
    res.json(queryRes.rows);
  } catch (error) {
    console.log(error)
  } 
})

// ------ Department.jsx Routes ------
app.get('/getUniqueSubject/:semDept',async(req,res)=>{
  const param=req.params;
  const sem_dept=param.semDept.split('-');
  const sem=sem_dept[0]
  const dept=sem_dept[1];
  const queryRes=await db.query("SELECT DISTINCT up_sub FROM uploads WHERE up_sem=$1 AND up_dept=$2",[sem,dept]);
  res.json(queryRes.rows);
})

// ------ Unit.jsx Routes ------
app.get('/getPdf/:semDeptSubUnit',async(req,res)=>{
  const param=req.params;
  const sem_dept=param.semDeptSubUnit.split('-');
  const sem=sem_dept[0]
  const dept=sem_dept[1];
  const sub=sem_dept[2];
  const unit=sem_dept[3];
  const valid=true;
  const queryRes=await db.query("SELECT up_id,up_filename FROM uploads WHERE up_sem=$1 AND up_dept=$2 AND up_sub=$3 AND up_unit=$4 AND up_isvalid=$5",[sem,dept,sub,unit,valid]);
  res.json(queryRes.rows);
})

app.get('/filterDocument/:type',async(req,res)=>{
  const param=req.params;
  const sem_dept=param.type.split('-');
  const sem=sem_dept[0]
  const dept=sem_dept[1];
  const sub=sem_dept[2];
  const unit=sem_dept[3];
  const type=sem_dept[4];
  if(type==='other'){
    const queryRes=await db.query("SELECT DISTINCT up_other FROM uploads WHERE up_sem=$1 AND up_dept=$2 AND up_sub=$3 AND up_unit=$4 AND up_mimetype like $5",[sem,dept,sub,unit,'%'+type+'%']);
    res.json(queryRes.rows);
  }
  else{
    const queryRes=await db.query("SELECT DISTINCT up_filename FROM uploads WHERE up_sem=$1 AND up_dept=$2 AND up_sub=$3 AND up_unit=$4 AND up_mimetype like $5",[sem,dept,sub,unit,'%'+type+'%']);
    res.json(queryRes.rows);
  }
})

app.get('/starDocument/:type',async(req,res)=>{
  const param=req.params;
  const sem_dept=param.type.split('-');
  const id=sem_dept[0];
  const usn=sem_dept[1];
  try{
    await db.query("INSERT INTO star(usn,pdf_id) VALUES ($1,$2)",[usn,id])
    res.json("Star Successful")
  }catch(err){
    res.json("Already Starred")
  }
})

// ------ Starred.jsx Routes ------
app.get('/unstarDocument/:type',async(req,res)=>{
  const param=req.params;
  const sem_dept=param.type.split('-');
  const id=sem_dept[0];
  const usn=sem_dept[1];
  try{
    await db.query("DELETE FROM star WHERE usn=$1 AND pdf_id=$2",[usn,id])
    res.json("UnStar Successful")
  }catch(err){
    res.json("Already Starred")
  }
})

app.get('/getStar/:usn',async(req,res)=>{
    const usn=req.params.usn;
    const queryRes=await db.query("SELECT up_id,up_filename FROM uploads where up_id in (SELECT pdf_id FROM star where usn=$1)",[usn]);
    res.json(queryRes.rows)
})

// ------ Uploads.jsx Routes ------
app.post('/upload',imageUpload.single('file_info'),async(req, res) => { // here in imageUpload.single('file_info') file_info inside single is name given in axios

    const {usn,dept,sem,subject,unit,rsc}=req.body;
    const { filename, mimetype} = req.file;
  
    await db.query("INSERT INTO uploads(up_usn,up_dept,up_sem,up_sub,up_unit,up_fileName,up_mimeType,up_other) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",[usn,dept,sem,subject,unit,filename,mimetype,rsc]);
    res.json("upload successful")
});

//------ MyUploads.jsx Routes ------
app.get('/getMyUploads/:uid',async(req,res)=>{
  const usn=req.params.uid;
  const queryRes=await db.query("SELECT DISTINCT up_filename FROM uploads WHERE up_usn=$1",[usn]);
  res.json(queryRes.rows);
})

app.get('/getEditUploads/:paramList',async(req,res)=>{
  const param=req.params;
  const usn_file=param.paramList.split('-');
  const usn=usn_file[0]
  const file=usn_file[1];
  const queryRes=await db.query("SELECT up_dept,up_sem,up_sub,up_unit,up_other FROM uploads WHERE up_usn=$1 AND up_filename LIKE $2",[usn,'%'+file+'%']);
  res.json(queryRes.rows)
})

app.put('/updateUpload',async(req,res)=>{
    const {usn,dept,sem,subject,unit,rsc}=req.body;
    await db.query("UPDATE uploads SET up_dept=$1,up_sem=$2,up_sub=$3,up_unit=$4,up_other=$5 WHERE up_usn=$6",[dept,sem,subject,unit,rsc,usn])
    res.json("edit successful")
})

app.post('/delMyUploads',async(req,res)=>{
  const {usn,file}=req.body;
  await db.query("DELETE FROM uploads WHERE up_usn=$1 AND up_filename=$2",[usn,file]);
  res.json("Deletion Successful")
})

// ------ Header.jsx Routes ------
app.get('/currentUser/:usn',async(req,res)=>{
  const {usn}=req.params;
  const queryRes=await db.query("SELECT * FROM users WHERE u_usn=$1",[usn]);
  res.json(queryRes.rows[0]);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});