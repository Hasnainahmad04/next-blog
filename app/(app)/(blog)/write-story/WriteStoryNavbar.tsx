import Logo from "@assets/icons/Logo";
import AppButton from "@components/AppButton";
import AvatarDropdown from "@components/AvatarDropdown";
import Link from "next/link";
import React from "react";

interface Props {
  isDisabled?: boolean;
  onClickPublish?: () => void;
}

const WriteStoryNavbar: React.FC<Props> = ({
  isDisabled = false,
  onClickPublish,
}) => {
  return (
    <div className="w-full flex justify-between items-center text-black py-4">
      <Link href={"/"} className="w-[10rem]">
        <Logo />
      </Link>

      <div className="flex flex-row gap-3 items-center">
        <AppButton
          title="Publish"
          disabled={isDisabled}
          onClick={onClickPublish}
        />
        <AvatarDropdown />
      </div>
    </div>
  );
};

export default WriteStoryNavbar;
