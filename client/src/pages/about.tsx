import Myphoto from "../components/icons/myphoto"

const About = () => {

    return <div className="h-max w-screen bg-gradient-to-l from-red-100 to-sky-200 bg-gradient-to-r from-yellow-100 p-5">
        <div className="h-max">
            <div className="flex justify-center items-center h-1/3 mb-10">
                <div className="h-32 w-32 image-container">
                    <Myphoto />
                </div>
            </div>
            <div className="flex flex-col text-lg text-slate-500 font-semibold items-center h-2/3">
                <div className="w-2/3 text-center">
                    Hello there! I'm Sundaram Singh, currently pursuing my second year in Computer Science. My passion lies in crafting seamless applications using the MERN stack, with a special focus on Next.js, React, and Node.js. I thrive on challenges and am particularly drawn to DevOps and CI/CD pipelines.
                </div>
                
                <div className=" mt-10 w-2/3 text-center">
                    My journey in web development has been exhilarating. I enjoy the intricacies of building applications and am well-versed in technologies like TypeScript, PostgreSQL, MongoDB, and Redis. My recent project has been a testament to my skills, where I've leveraged React, Express, Prisma, and Docker to create a dynamic solution;;;;
                </div>
            </div>
        </div>
    </div>
}

export default About