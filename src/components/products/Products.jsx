/* eslint-disable no-unused-vars */
import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useProductFilter from "../../hooks/useProductFilter.jsx";
import { fetchCategories } from "../../store/actions/index.js";
import Filter from "./Filter.jsx";
import Loader from "../shared/Loader.jsx";
import Paginations from "../shared/Paginations.jsx";
import ProductCard from "../shared/ProductCard.jsx";
import { Skeleton } from "@mui/material";
import ShowSkeleton from "../ShowSkeleton.jsx";

// http://localhost:xxxx?keyword=test&sortby=desc
// Make Sure The URL Is Updated With Filter Values  Done In Filter.jsx
// Use These Filter Values For Getting The Data From The Backend

const Products = () => {
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );
    const {products,pagination} = useSelector(
        (state) => state.products
    )
    const {categories} = useSelector(
        (state) => state.categories
    )

    const dispatch = useDispatch();
    useProductFilter();

    // No Need Of This Since useProductFilter() Will Anyways Get The Products Since It Is Also Dispatching To The Backend API
    // // Fetching The Products Once When This Component Mounts
    // useEffect(() => {
    //     dispatch(fetchProducts());
    // }, [dispatch]);
    // console.log(products);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch])

    console.log("categories ", categories);
    const c = 1;
    return (
        <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
        <Filter categories={ categories? categories : [] } />
        {isLoading ? (
            <>
            {/* <Loader loadingText={"Products Loading"}/> */}
            <ShowSkeleton />
            </>
        ) : errorMessage ? (
            <div className="flex justify-center items-center h-[200px]">
                <FaExclamationTriangle className="text-slate-800 text-3xl mr-2"/>
                <span className="text-slate-800 text-lg font-medium">{errorMessage}</span>
            </div>
        ) : (
            <div className="min-h-[700px]">
                <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                {products && 
                products.map((item,i) => <ProductCard key={i} {...item} />)}
                </div>

                <div className="flex justify-center p-10">
                    <Paginations 
                        numberOfPages={pagination?.totalPages}
                        totalProduct = {pagination?.totalElements}
                    />
                </div>
            </div>
        )
        }
        </div>
    )
}

export default Products;