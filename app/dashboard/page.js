"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Card,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter(); // Move useRouter to the top level
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [user, setUser] = useState(null);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Use router here without re-declaring it
    } else {
      setUser(session?.user);
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div className="loading"></div>; // You can customize this with a loading spinner or animation
  }

  const handleSignOut = () => {
    signOut({
      redirect: true,
      callbackUrl: "/", // Redirect to the landing page after sign-out
    });
  };

  const cards = [
    {
      title: "TVKU Semarang",
      image: "/TVKU.webp",
      url_link: "http://103.30.1.14:8080/hls/live.m3u8",
    },
    {
      title: "UGTV",
      image: "/UGTV.webp",
      url_link: "https://cdn.gunadarma.ac.id/streams/ugtv/ingestugtv.m3u8",
    },
    {
      title: "Animax",
      image: "/Animax-tv.webp",
      url_link:
        "http://cdns.jp-primehome.com:8000/zhongying/live/playlist.m3u8?cid=bs15",
    },
    {
      title: "Spacetoonn",
      image: "/spacetoon.webp",
      url_link:
        "https://streams.spacetoon.com/live/stchannel/smil:livesmil.smil/playlist.m3u8",
    },
    {
      title: "Arirang",
      image: "/arirang.webp",
      url_link: "https://cdn-01.bonus-tv.ru/arirang_edge/playlist.m3u8",
    },
    {
      title: "Kansai TV",
      image: "/kansai.webp",
      url_link:
        "http://cdns.jp-primehome.com:8000/zhongying/live/playlist.m3u8?cid=gx03",
    },
    {
      title: "NHK",
      image: "/nhk.webp",
      url_link:
        "http://cdns.jp-primehome.com:8000/zhongying/live/playlist.m3u8?cid=gx06",
    },
    {
      title: "TV Asahi",
      image: "/tv-asahi.webp",
      url_link:
        "http://cdns.jp-primehome.com:8000/zhongying/live/playlist.m3u8?cid=gd06",
    },
    {
      title: "TV Tokyo",
      image: "/tv-tokyo.webp",
      url_link:
        "http://cdns.jp-primehome.com:8000/zhongying/live/playlist.m3u8?cid=gd07",
    },
    {
      title: "YTV",
      image: "/ytv.webp",
      url_link:
        "http://cdns.jp-primehome.com:8000/zhongying/live/playlist.m3u8?cid=gx04",
    },
    {
      title: "Bloomberg",
      image: "/bloomberg.webp",
      url_link: "https://bloomberg.com/media-manifest/streams/asia.m3u8",
    },
    {
      title: "BBS",
      image: "/bbs.webp",
      url_link:
        "https://cdn4.skygo.mn/live/disk1/BBC_News/HLSv3-FTA/BBC_News.m3u8",
    },
    // Add more cards here
  ];

  return (
    <div className="relative h-screen">
      <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <img src="/logo-land.png" alt="Logo" className="mx-auto" />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={user?.name}
                size="sm"
                src={
                  user?.image ||
                  "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                }
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <div className="grid grid-cols-2 gap-4 p-4">
        {cards.map((card, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() => router.push(`/play?url=${card.url_link}`)}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={card.title}
                className="w-full object-cover"
                src={card.image}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{card.title}</b>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
