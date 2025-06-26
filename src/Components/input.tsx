import type { UseFormRegister } from "react-hook-form";

interface InputProps{
    type: string;
    placeholder: string;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    error?: string
}

export function Input({name, type, placeholder, register, error}: InputProps){
    return(
        <div>
            <input 
                className="w-full bg-white rounded-md border-1 px-2 h-8 mb-3"
                type={type}
                placeholder={placeholder}
                {...register(name)} 
            />
            {error && <p className="my-1 text-red-600">{error}</p>}
        </div>
    )
}