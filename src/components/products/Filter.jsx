/* eslint-disable react/prop-types */
import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { FaSearch, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

/* eslint-disable no-unused-vars */
const Filter = ( { categories }) => {

    // Allows Me To Create The URL's Query Parameters
    const [searchParams] = useSearchParams();

    // Allows Me To Get, Set And Manipulate Query Parameters In The URL's
    const params = new URLSearchParams(searchParams);

    // Allows Me To Keep Track Of The URL's Location The Current URL
    const pathName = useLocation().pathname;

    // Allows Me To Make The User Go To Some Other URL When The Query Parameters Are Updated This Helps In 
    // Navigating The User To That New URL
    const navigate = useNavigate();

    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("desc");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const currentCategory = searchParams.get("category") || "all";
        const sortOrder = searchParams.get("sortby") || "asc";
        const searchTerm = searchParams.get("keyword") || "";

        setCategory(currentCategory);
        setSortOrder(sortOrder);
        setSearchTerm(searchTerm);
    }, [searchParams])

    useEffect(() => {
        // As The User Is Typing I Do Not Want It To Be Running All The Time So Waiting For Some Time
        const handler = setTimeout(() => {
            if(searchTerm) {
                searchParams.set("keyword", searchTerm);
            }
            else {
                searchParams.delete("keyword");
            }
            navigate(`${pathName}?${searchParams.toString()}`);
        }, 700);

        // Cleanup Function
        return () => {
            clearTimeout(handler);
        };

    }, [searchParams, searchTerm, navigate, pathName]);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        console.log(selectedCategory);
        if(selectedCategory.toLowerCase() === "all") {
            params.delete("category"); // Since If All Categories Are To Be Fetched No Need To Provide Any Query Parameter
            // It Will Automatically Fetch All The Categories
        }
        else {
            params.set("category", selectedCategory);
        }
        navigate(`${pathName}?${params}`);
        setCategory(event.target.value);
    };

    const toggleSortOrder = () => {
        setSortOrder((prevSortOrder) => {
            const newSortOrder = prevSortOrder==="desc"?"asc":"desc";
            params.set("sortby", newSortOrder);
            navigate(`${pathName}?${params}`);
            return newSortOrder;
        })
    };

    const handleClearFilters = () => {
        // Getting The PathName From The Window Object Redirecting To http://localhost:xxxx/
        navigate({pathName : window.location.pathname});
        setCategory("all");
    }

    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
        {/* Search Bar */}
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input
                type="text"
                placeholder="Search Products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"/>

                <FaSearch className="absolute left-3 text-slate-800 size={20}" />
            </div>

            {/* Category Selection Dropdown List */}
            <div className="flex sm:flex-row flex-xol gap-4 items-center">
                <FormControl className="text-slate-800 border-slate-700" variant="outlined" size="small">

                    <InputLabel id="category-select-label">Category</InputLabel>

                    <Select
                        labelId="category-select-label"
                        value={category}
                        onChange={handleCategoryChange}
                        label="Category"
                        className="min-w-[120px] text-slate-800 border-slate-700">

                        {categories.map((item) => (
                            <MenuItem key={item.categoryId} value={item.categoryName}>{item.categoryName}</MenuItem>
                        ))}
                    </Select>

                </FormControl>


                {/* Sort Button And Clear Filter */}
                <Tooltip title="Sorted By Price: asc">
                    <Button variant="contained" onClick={toggleSortOrder} color="primary" className="flex items-center gap-2 h-10">
                        Sort By
                       {sortOrder==="asc"?<FaArrowUp size={20} />: <FaArrowDown size={20} />}
                    </Button>
                </Tooltip>

                <button onClick={handleClearFilters} className="flex items-center gap-2 bg-rose-600 hover:bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none">
                <FiRefreshCw className="font-semibold" size={16} />
                    <span className="font-semibold">Clear Filter</span>
                </button>
            </div>
        </div>
    )
}

export default Filter;