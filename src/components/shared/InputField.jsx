/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const InputField = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    value,
    placeholder
}) => {
    return (
        <div className="flex flex-col gap-1 w-full">

            <label
                htmlFor="id"
                className={`${className ? className: ""} font-semibold text-sm text-slate-800`}>
                {label}
            </label>
{/* Using React Hook Form So Providing All The Validation In The Input Field Like That */}
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={`${className? className :  "px-2 py-2 border outline-none bg-transparent text-slate-800 rounded-md" }
                    ${errors[id]?.message ? "border-red-500" : "border-slate-700"}`}
                    {...register(id, {
                        required: {value: required, message},
                        minLength: min? {value:min, message:`Minimum ${min} Characters Required`} : null,
                        pattern: type === "email" ? {value: /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/ , message: "Invalid Email"} : 
                        type==="url" ? {value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/ , message: "Please Enter A Valid URL"} : null,
                    })} />

                    {errors[id]?.message && (
                        <p className="text-sm font-semibold text-red-600 mt-0">
                            {errors[id]?.message}
                        </p>
                    )}
        </div>
    )
};

export default InputField;