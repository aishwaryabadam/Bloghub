const express=require('express')
const app=express()
const cors=require('cors');
const mysql=require('mysql2');
const bcrypt=require('bcrypt')
app.use(cors({origin: '*',}));
app.use(express.json({limit:'10MB'}))
app.use(express.urlencoded({extended:true ,limit:'10mb'}));

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'your password',
    database: 'database name'
});

db.connect((err)=>{
    if(err){
        console.error('Error connecting to the database:',err);
        return;
    }
    console.log('Connected to the database');
});

app.get('/',(req,res)=>{
    console.log('In base route');
    res.status(200).json("You are in base route")
})
app.get('/greetServer',(req,res)=>{
    res.status(200).json("Hi user")
})


app.post('/user/login', async (req, res) => {
  const { emailAddress, password } = req.body;

  if (!emailAddress || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  db.query("SELECT * FROM Users WHERE emailAddress = ?", [emailAddress], async (error, result) => {
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const user = result[0];
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({ success: false, message: "Password not matched" });
    }

    console.log("✅ Password matched for:", emailAddress);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.ID,
        name: user.Name,
        email: user.emailAddress
      }
    });
  });
});



app.post('/user/registration',async (req, res) => {
  console.log("Received Registration Data:", req.body);
  let{name,phoneNumber,emailAddress,password}=req.body

  let hashedPassword=await bcrypt.hash(password,10);

  console.log('After Assiging: ',name,phoneNumber,emailAddress,password,hashedPassword);

  let result=db.query(`insert into Users(Name,phoneNumber,emailAddress,password)values('${name}','${phoneNumber}','${emailAddress}','${hashedPassword}');`,(error,result)=>{
    if(error){
        console.log(error)
        return res.status(500).json("Something went wrong")
    }
    res.status(200).json("User registration successful")
  })

  

  //res.status(200).json({ message: "Details Received", data: req.body });
});

app.post('/blog/newBlog', (req, res) => {
  console.log("📝 New Blog Data:", req.body);

  const { userID, category, title, content } = req.body;

  if (!userID) {
    return res.status(400).json("UserID missing!");
  }

  db.query(
    `INSERT INTO Blogs (UserID, BlogCategory, BlogTitle, BlogContent, BlogPreviewContent)
     VALUES (?, ?, ?, ?, ?)`,
    [userID, category, title, content, content.slice(0, 25)],
    (error, result) => {
      if (error) {
        console.log("DB Error:", error);
        return res.status(500).json("Something went wrong");
      }
      console.log("Blog posted successfully by user:", userID);
      res.status(200).json("Blog posted successfully");
    }
  );
});


// ✅ 1) GET ALL BLOGS
app.get('/blog/getAllBlogs', (req, res) => {
  console.log("Fetching all Blogs");

  const sql = `
    SELECT 
      b.ID,
      b.UserID,
      u.Name AS authorName,
      b.BlogCategory,
      b.BlogTitle,
      b.BlogPreviewContent,
      b.CreatedAt
    FROM Blogs b
    LEFT JOIN Users u ON b.UserID = u.ID
    ORDER BY b.CreatedAt DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error fetching blogs:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    return res.status(200).json({
      success: true,
      blogs: rows
    });
  });
});



// ✅ 2) GET BLOG BY ID
app.get('/blogGetBlog/:ID', (req, res) => {
  const { ID } = req.params;
  console.log("Fetching blog with ID:", ID);

  const sql = `
    SELECT 
      b.ID,
      b.UserID,
      u.Name AS authorName,
      b.BlogCategory,
      b.BlogTitle,
      b.BlogContent,
      b.CreatedAt
    FROM Blogs b
    LEFT JOIN Users u ON b.UserID = u.ID
    WHERE b.ID = ?
  `;

  db.query(sql, [ID], (err, rows) => {
    if (err) {
      console.error("Error fetching blog by ID:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    return res.status(200).json({
      success: true,
      blog: rows[0]
    });
  });
});



// ✅ 3) GET BLOGS BY CATEGORY
app.get('/blog/Category/:category', (req, res) => {
  const { category } = req.params;
  console.log("Fetching blogs in category:", category);

  const sql = `
    SELECT 
      b.ID,
      b.UserID,
      u.Name AS authorName,
      b.BlogCategory,
      b.BlogTitle,
      b.BlogPreviewContent,
      b.CreatedAt
    FROM Blogs b
    LEFT JOIN Users u ON b.UserID = u.ID
    WHERE b.BlogCategory = ?
    ORDER BY b.CreatedAt DESC
  `;

  db.query(sql, [category], (err, rows) => {
    if (err) {
      console.error("Error fetching category blogs:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    return res.status(200).json({
      success: true,
      category,
      blogs: rows
    });
  });
});

app.listen(3000,()=>{
    console.log('Server Started on port 3000')
})
