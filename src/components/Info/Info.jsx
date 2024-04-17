

const Info = ({isActive, isLoading}) => {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center gap-y-4">
                <div className="logo">
                    <img src="./status3.svg" alt="logo"/>
                </div>
            </div>
        )
    } else if (isActive) {
        return (
            <div className="flex flex-col items-center gap-y-4">
                <div className="logo">
                    <img src="./status2.svg" alt="logo"/>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="logo">
                <img src="./status.svg" alt="logo"/>
            </div>
       </div>
   )
}

export default Info