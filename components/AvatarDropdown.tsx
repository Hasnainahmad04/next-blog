"use client";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { LuUser, LuPencilLine } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";

import * as React from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AvatarDropdown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data: session } = useSession();
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Profile">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {session?.user?.image ? (
                <Image
                  src={session?.user?.image ?? ""}
                  width={38}
                  height={38}
                  className="rounded-full cursor-pointer"
                  alt="Logo"
                />
              ) : (
                session?.user?.name?.at(0)?.toUpperCase()
              )}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            width: 240,
            padding: 1,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose} className="gap-3">
          <LuUser />
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose} className="gap-3">
          <LuPencilLine />
          <Link href={"/write-story"}>Write Story</Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            signOut();
          }}
          className="gap-3"
        >
          <IoIosLogOut />
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
