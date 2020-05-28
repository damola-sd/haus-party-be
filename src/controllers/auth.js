const dbQuery = require('../utils/dbQueries');
const response = require('../utils/response');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Email = require('../services/Email');

export const Register = async (req, res) => {
    try {
        let user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        };
        let existingUser = await dbQuery.GetOne(User, { email: req.body.email });
        if (existingUser) return res.status(409).json({
            message: 'User already Exists.',
            description: 'Please Use Another Email to Sign up'
        });
        const newUser = new User(user);
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.confirmPassword = hash;

                newUser.save().then(async user => {
                    user.password = undefined;
                    const resetURL = `${req.protocol}://localhost:4000.com/auth/verify/${user._id}`;
                    let msg = {};
                    msg.to = user.email;
                    msg.from = 'support@hausparty.com';
                    msg.subject = "Please Verify Your Account";
                    msg.text = `Verify your account. Click this link ${resetURL} `;
                    await Email.send(msg, () => { console.log(`Your Email Submitted Successfully at ${msg.to} From ${msg.from}`) });
                    res.status(200).json({
                        message: 'Please Verify Account! And Check Email.'
                    });
                });
            });
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(response.error(400, `Error: ${error.message}`));
    }
},

export const Login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        User.findOne({ email }).then(user => {
            if (!user) return res.status(403).json({
                message: 'User Does not Exist.'
            });
            bcrypt.compare(password, user.password).then(isMatch => {
                if (!isMatch) return res.status(400).json({
                    message: 'Wrong password, Try again'
                });
                jwt.sign({ user }, process.env.JWT_SECRET, (err, token) => {
                    if (err) throw err;
                    user.password = undefined;
                    user.conformPassword = undefined;
                    res.json({
                        token,
                        message: 'Your are Logged In  Successfully',
                        user: {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            profilePicture: user.profilePicture,
                            dateOfBirth: user.dateOfBirth,
                            status: user.status,
                            role: user.role,
                            facebook: user.facebook,
                            instagram: user.instagram,
                            twitter: user.twitter
                        }
                    });
                });

            });
        });
    } catch (error) {
        return response.error(400, `Error: ${error.message}`);
    }
},

export const VerifyAccount = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params._id
        });

        if (!user || user === null) {
            return res.status(403).json({
                message: 'User Does not Exit.'
            });
        }

        user.status = 'active';
        user.save().then((user) => {
            let msg = {};
            msg.to = user.email;
            msg.from = 'support@hausparty.com';
            msg.subject = "Account Registered Successfully";
            msg.text = `Hello ${user.firstName}\n Your Account Successfully Created on \n\n\n Welcome to the HausParty family`;
            Email.send(msg, () => { console.log(`Your Email Submitted Successfully at ${msg.to} From ${msg.from}`) });
            user.password = undefined;
            user.confirmPassword = undefined;
            res.status(200).json({
                message: 'Your Account is Activated! Now You Can Login',
                user
            });
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(403).json({
                message: 'User ID Invalid.'
            });
        }
        return response.error(400, `Error: ${error.message}`);
    }


},

export const ForgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || user === null) {
            return res.status(403).json({
                message: 'User Does not Exist.'
            });
        }

        if (user.status !== 'active') {
            return res.status(403).json({
                message: `Please Activate Account. Your Account Status is ${user.status}.`
            });
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.passwordResetToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
        await user.save();
        try {
            const resetURL = `${req.protocol}://localhost:4000/auth/reset-password/${resetToken}`;
            let msg = {};
            msg.to = user.email;
            msg.from = 'support@hausparty.com';
            msg.subject = "Reset Your Password";
            msg.text = `Hello ${user.firstName}\n\n Reset your password with this link ${resetURL} `;
            await Email.send(msg, () => { console.log(`Your Email Submitted Successfully at ${msg.to} From ${msg.from}`) });
            // Send Response
            res.status(200).json({
                message: 'Token sent to email! Please Check Your Email.'
            });
        } catch (error) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save();
            return response.error(400, `There was an error sending the email. Try agin later.`);
        }
    } catch (error) {
        return response.error(400, `Error: ${error.message}`);
    }
},

export const ResetPassword = async (req, res) => {
    try {
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: {
                $gt: Date.now()
            }
        });

        if (!user) {
            return res.status(400).json({
                message: 'Token is invalid or has expired'
            });
        }
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        bcrypt.genSalt(10, (err, salt) => {
            console.log(err)
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) throw err;
                user.password = hash;
                user.confirmPassword = hash;
                user.save().then(async user => {
                    res.status(200).json({
                        message: `You have successfully reset your password`
                    });
                });
            });
        });
    } catch (error) {
        console.log(error);
        return response.error(400, `Error: ${error.message}`);
    }
}