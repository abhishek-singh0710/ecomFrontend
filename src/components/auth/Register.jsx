/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/inputField";
import { registerNewUser } from "../../store/actions";
import toast from "react-hot-toast";
import Spinner from "../shared/Spinner";

const Register = () => {
    
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const dispatch = useDispatch();

    // Everything Will Be Triggered On Touch Over Here
    // So When The Form Is Touched It Will Trigger The Validations Etc.
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        console.log("hello From Register Handler");
        dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
    }

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form onSubmit={handleSubmit(registerHandler)}
                  className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <FaUserPlus className="text-slate-800 text-5xl"/>
                        <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">Register Here</h1>
                    </div>

                    <hr className="mt-2 mb-5 text-black" />
                    <div className="flex flex-col gap-3">
                        <InputField 
                                label="Username"
                                required
                                id="username"
                                type="text"
                                register={register}
                                errors={errors}
                                message={"Username Is Required"}
                                placeholder={"Enter Your Username"}
                        />

                        <InputField 
                                label="Email"
                                required
                                id="email"
                                type="email"
                                register={register}
                                errors={errors}
                                message={"*Email Is Required"}
                                placeholder={"Enter Your Email"}
                        />

                        <InputField 
                                label="Password"
                                required
                                id="password"
                                type="password"
                                min={6}
                                register={register}
                                errors={errors}
                                message={"Password Is Required"}
                                placeholder={"Enter Your Password"}
                        />
                    </div>

                    <button disabled={loader}
                            className={`${loader? "bg-gray-400": "bg-button-gradient"} flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-md my-4`}
                            type="submit">
                            {loader ? (<><Spinner /><span className="text-black text-1xl font-semibold">Loading...</span></>) : ("Register")}
                    </button>

                    <p className="text-center text-sm text-slate-700 mt-6">
                        Already Have An Account?
                        <Link to="/login" className="font-semibold underline decoration-blue-500">
                            <span className="ml-1 text-blue-600 hover:text-blue-800">Login</span>
                        </Link>
                    </p>
                  </form>
        </div>
    )

};

export default Register;