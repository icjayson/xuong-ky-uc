import MessengerIcon from "@/components/icons/messager";
import Link from "next/link";
import React from "react";

const MessengerWidget = () => {
  return (
    <Link
      href={`https://m.me/${process.env.NEXT_PUBLIC_MESSENGER_URL}`}
      target="_blank"
      className="fixed right-5 bottom-5 w-[50px] h-[50px] text-widget-messenger-background rounded-full flex items-center justify-center"
    >
      <MessengerIcon size={50} />
    </Link>
  );
};

export default MessengerWidget;
