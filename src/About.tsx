import {motion} from "framer-motion"
export default function About (){
  return(
    <>
    <div>
      <motion.h1
       animate={{rotate:360}}
       className="text-4xl text-red-600 flex flex-col justify-center"
       >
        About page
       </motion.h1>
    </div>
    </>
  )
}