import User from '../Model/user.js'
import { hashPassword ,comparePassword} from '../config/hashPassword.js';
import jwt from 'jsonwebtoken';  

export const signup = async(req,res)=>{
    try {
        const {name,email,password,department,designation,phone}=req.body;
        if(!name  || !email || !password){
            res.status(400).json({
                success:false,
                message:"Please Required All filds!",
                data:null
            })
        }
        const existingUser = await User.findOne({email:email});
        if(existingUser){
            res.status(400).json({
                success:false,
                message:"User already exists!",
                data:null
            })
        }
        const hashedPassword = await hashPassword(password);

        const user = await User({
            name:name,
            email:email,
            password:hashedPassword,
            department:department,
            designation:designation,
            phone:phone,
            status:"Inactive"
        })
        await user.save()
        res.status(200).json({
            success:true,
            message:"User registered successfully!",
            data:user
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Internal Server Error!"})
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password!",
                data: null
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found! Please sign up.",
                data: null
            });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password!",
                data: null
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            "12345",
            { expiresIn: '1h' }
        );

        res.status(200).json({
            success: true,
            message: "Login successful!",
            data: {
                user: {
                    name: user.name,
                    email: user.email
                },
                token: token
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

