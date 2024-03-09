import pnf from "../assets/3804935.jpg";

const PageNotFound = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-xl font-bold">Error, page not found!</h1>
      <img height={900} width={900} src={pnf} alt="pnf" />
    </div>
  )
}

export default PageNotFound