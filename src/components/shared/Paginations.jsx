/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Pagination } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Paginations = ({ numberOfPages, totalProducts}) => {
    console.log(numberOfPages);
    const [searchParams] = useSearchParams();
    const pathName = useLocation().pathname;
    const params = new URLSearchParams(searchParams);
    const navigate = useNavigate();
    const paramValue = searchParams.get("page")
                        ? Number(searchParams.get("page")) : 1;

    const onChangeHandler = (event, value) => {
        params.set("page", value.toString());
        navigate(`${pathName}?${params}`);
    };

    return (
        <Pagination 
        count={numberOfPages}
        page={paramValue}
        defaultPage={1} 
        siblingCount={0} 
        boundaryCount={2} shape="rounded" 
        onChange = {onChangeHandler}
        />
    )
};

export default Paginations;