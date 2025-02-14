/* eslint-disable no-unused-vars */
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import BackDrop from "./BackDrop";
import { logoutUser } from "../store/actions";
import toast from "react-hot-toast";

const UserMenu = () => {
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const { user } = useSelector((state) => state.auth);

    const logoutHandler = () => {
        console.log("from logout handler", user);
        dispatch(logoutUser(user, toast, navigate, setLoader))
    }

    return (
        <div className="relative z-30">
        <div
            className="sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
            onClick={handleClick}
        >
            <Avatar alt="menu" sx={{ bgcolor: deepOrange[500] }}>{user.username.charAt(0).toUpperCase()}</Avatar>
        </div>
        {/* sx Allows Me To Write System CSS It Will Overwrite The Default CSS From The Material UI Library */}
        <Menu
            sx={{ width: "400px" }}
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            sx: { width: 160 },
            }}
        >
        <Link to="/profile">
            <MenuItem className="flex gap-2" onClick={handleClose}>
                <BiUser className="text-xl" />
                <span className="font-bold text-[16px] mt-1">{user?.username}</span>
            </MenuItem>
        </Link>

        <Link to="/profile/orders">
            <MenuItem className="flex gap-2" onClick={handleClose}>
                <FaShoppingCart className="text-xl" />
                <span className="font-semibold">Order</span>
            </MenuItem>
        </Link>

            <MenuItem className="flex gap-2" onClick={() => logoutHandler()}>
                <div className="font-semibold w-full flex gap-2 items-center bg-button-gradient px-4 py-1 text-white rounded-sm">
                    <IoExit className="text-xl" />
                    <span className="font-bold text-[16px] mt-1">{loader ? "Logging Out..." : "Logout"}</span>
                </div>
            </MenuItem>
        </Menu>

        {open && <BackDrop />}
        </div>
    );
};

export default UserMenu;