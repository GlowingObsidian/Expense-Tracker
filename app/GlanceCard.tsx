"use client";
import { Avatar, Card, Flex, Text } from "@radix-ui/themes";
import { ReactNode } from "react";
import CountUp from "react-countup";

function GlanceCard({
  title,
  amount,
  icon,
}: {
  title: string;
  amount: number;
  icon: NonNullable<ReactNode>;
}) {
  return (
    <Card>
      <Flex className="p-2" align="center" justify="between">
        <Flex className="space-y-2" direction="column">
          <Text as="p" className="text-xl">
            {title}
          </Text>
          <Text as="p" className="text-3xl" weight="bold">
            $ <CountUp end={amount} duration={2} />
          </Text>
        </Flex>
        <Avatar size="5" radius="full" fallback={icon} />
      </Flex>
    </Card>
  );
}

export default GlanceCard;
