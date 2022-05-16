import {ImDatabase} from "react-icons/im";

const NoData = ({text}) => {

    return (
        <div className="noData">
            <ImDatabase/>
            <p>{text}</p>
        </div>
    )
}

export default NoData