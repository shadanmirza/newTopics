import {useEffect,useState} from 'react'


const DarkButton = () => {

    const [darkMode, setDarkMode] = useState(
        ()=> localStorage.getItem("theme") === "dark"
    );
    
    useEffect(()=>{
        const root = document.documentElement

        if(darkMode){
            root.classList.add("dark");
            localStorage.setItem("theme","dark")
        }else {
            root.classList.remove("dark")
            localStorage.setItem("theme","light")
        }
    }), [darkMode];

  return (
   
    <button
    onClick={()=>setDarkMode((prev) => !prev)}
    className='bg-gray-500 px-3 py-1 border-2 border-black rounded-2xl text-amber-200 '>
     {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  )
}

export default DarkButton