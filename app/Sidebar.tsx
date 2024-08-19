"use client";

import { Box, Container, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { FiHome, FiPieChart } from "react-icons/fi";
import { TbCashRegister } from "react-icons/tb";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: <FiHome />, link: "/" },
  { label: "Expenses", icon: <TbCashRegister />, link: "/expenses" },
  { label: "Budgets", icon: <FiPieChart />, link: "/budgets" },
];

function Sidebar() {
  const currentPath = usePathname();
  return (
    <Container
      gridArea="aside"
      className="hidden border-r bg-[var(--gray-2)] border-[var(--gray-5)] xl:block"
    >
      <Flex direction="column" justify="center">
        <Box className="border-b h-[65px] p-5 border-[var(--gray-5)]">
          <Logo />
        </Box>
        <Flex direction="column" gapY="3" className="p-5">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.link}
              className={`flex items-center space-x-2 p-3 rounded-2xl transition-colors ${
                currentPath === item.link
                  ? "bg-[var(--gray-5)] text-[var(--accent-11)]"
                  : "text-[var(--gray-11)]"
              } hover:text-[var(--accent-9)]`}
            >
              {item.icon}
              <Text>{item.label}</Text>
            </Link>
          ))}
        </Flex>
      </Flex>
    </Container>
  );
}

export default Sidebar;
