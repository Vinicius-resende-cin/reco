"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { useNotificationContext } from "@/contexts/NotificationContext";
import { useSideBarContext } from "@/contexts/SideBarContext";

import NotificationFlyMenu from "./components/NotificationFlyMenu/notification-fly-menu";

export default function Header() {
  const { notifications, setNotifications } = useNotificationContext();
  const { hideSideBar, setHideSideBar } = useSideBarContext();
  const { data: session } = useSession();

  const bgClass = session ? "bg-white" : "bg-neutral-950";
  const textClass = session ? "text-red-600" : "text-neutral-200";

  function handleLogin() {
    signIn(undefined, {
      callbackUrl: "/tenants/",
    });
  }

  function handleLogout() {
    signOut({
      callbackUrl: "/",
    });
  }

  function handleSidebarToggle() {
    setHideSideBar(!hideSideBar);
  }

  function handleRemoveNotification(index: number) {
    const newNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(newNotifications);
  }

  return (
    <div
      className={`w-full absolute h-20 py-2 flex items-center ${
        session ? "pr-28" : "pr-0"
      } ${bgClass} ${textClass}`}
    >
      {session && (
        <button
          onClick={handleSidebarToggle}
          className="w-16 fixed sm:static flex justify-center items-center"
        >
          <Image
            src="/icons/sidebar_toggle.svg"
            alt="Sidebar Toggle"
            width={24}
            height={24}
          />
        </button>
      )}
      <span
        className={
          "w-full flex items-center " +
          (session ? "justify-center" : "justify-between px-4")
        }
      >
        {session && <span className="w-1/3 invisible"></span>}
        <Link
          href="/"
          className={
            "flex justify-center items-center " + (session ? "w-1/3" : "")
          }
        >
          <Image
            src={session ? "/logo.svg" : "/logo_cinza.svg"}
            alt="Reco Logo"
            width={125}
            height={31}
            priority
          />
        </Link>
        <span
          className={` flex justify-end items-center gap-2 font-semibold underline ${
            session ? "justify-end w-1/3" : "justify-start px-4"
          }`}
        >
          {session ? (
            <>
              <NotificationFlyMenu
                notifications={notifications}
                onRemoveCard={handleRemoveNotification}
              />
              <button
                onClick={handleLogout}
                className="flex place-items-center gap-2"
              >
                <Image
                  src="/icons/logout.svg"
                  alt="Logout Logo"
                  width={24}
                  height={24}
                />
                Sair
              </button>
            </>
          ) : (
            <>
              <button onClick={handleLogin}>Entrar</button>
              <button className="bg-primary rounded-full py-2 px-10 ml-6 text-white">
                Contato
              </button>
            </>
          )}
        </span>
      </span>
    </div>
  );
}
