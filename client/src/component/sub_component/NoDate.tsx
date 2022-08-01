import {ImDatabase} from "react-icons/im";

interface Props {
    message: string;
}
const NoData = (props: Props) => {

    return (
        <div className="noData">
            <ImDatabase/>
            <p>{props.message}</p>
        </div>
    )
}

export default NoData