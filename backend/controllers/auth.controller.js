import User from "../models/user.model.js";

export const signup = async (req,res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({error:"Password do not match"})
        }

        const user = await User.findOne({username})

        if(user) {
            return res.status(400).json({error:"Username already exists."})
        }

        //HASH PASSWORD HERE
        // https://avatar-placeholder.iran.liara.run/

        const boyProfilePic = `https://avatar.iran.liara.run/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/girl?username=${username}`

        const newUser = new User ({
            fullName,
            username,
            password,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic:newUser.profilePic

        })

    } catch (error) {
        console.log("Error in signup controller". error.message)
        res.status(500).json({error:"Internal Server error"})
    }
}

export const login = (req,res) => {
    console.log("loginUser");
}

export const logout = (req,res) => {
    console.log("logoutUser");
}
