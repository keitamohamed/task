import {PulseLoader} from "react-spinners";

const Loading = ({loading, color, size}) => {

    return (
        <div className="loading">
            <PulseLoader loading={loading} size={size} color={color} />
        </div>
    )

}

export default Loading