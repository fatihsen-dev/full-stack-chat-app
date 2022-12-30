export default function Login() {
   const submitHandle = () => {};
   return (
      <form
         className='flex flex-col bg-slate-100 p-3 gap-2 rounded-sm'
         onSubmit={submitHandle}>
         <input className='border w-80 p-1.5' type='text' placeholder='username' />
         <button className='bg-slate-800 py-1 rounded-sm text-white'>Send</button>
      </form>
   );
}
