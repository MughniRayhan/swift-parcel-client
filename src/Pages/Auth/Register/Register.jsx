import React from 'react'
import { useForm } from "react-hook-form"
import { Link } from 'react-router';
import UseAuth from '../../../Hooks/UseAuth';
import SocialLogin from '../SocialLogin/SocialLogin';

function Register() {
        const {register, handleSubmit, formState: { errors }} = useForm();
        const {createUser} = UseAuth()
    
        const onSubmit = (data) => {
            
            createUser(data.email, data.password)
            .then((result) => {
                console.log(result.user);
            })
            .catch((error) => {
                console.error(error.message);
            })
        }
  return (
        <div className=' my-10 sm:w-[70%] mx-auto w-full shadow-lg md:shadow-none'>
        <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
           <div className='mb-2'>
             <h2 className='font-extrabold sm:text-3xl text-xl mb-1'>Create an Account</h2>
            <p>Register with SwiftParcel</p>
           </div>
        <fieldset className="fieldset">
            <label className="label">Name</label>
          <input type="text"  
          {...register("name",{ required: true})} 
          className="input" placeholder="Name" />
          {
            errors.name?.type === 'required' && <span className='text-red-500'>Password is required</span>
          }

          <label className="label">Email</label>
          <input type="email"  
          {...register("email",{ required: true})} 
          className="input" placeholder="Email" />
          {
            errors.email?.type === 'required' && <span className='text-red-500'>Password is required</span>
          }

          <label className="label">Password</label>
          <input type="password"  
          {...register("password",{ required: true, minLength: 6 })} 
          className="input" placeholder="Password" />
          {
            errors.password?.type === 'required' && <span className='text-red-500'>Password is required</span>
          }
          {
            errors.password?.type === 'minLength' && <span className='text-red-500'>Must have to 6 length</span>
          }
         
          <button className="btn btn-neutral mt-4 sm:w-[330px] bg-primary text-black font-bold border-none">Register</button>
          <div className='mt-2 text-base'>Allready have an account?    <Link to='/login' className='text-primary font-semibold underline'>   Login</Link></div>
         <SocialLogin/>
        </fieldset>
          
    </form>
    </div>
  )
}

export default Register