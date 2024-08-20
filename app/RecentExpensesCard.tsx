import { Expense } from "@prisma/client";
import { Card, Flex, ScrollArea, Box, Text } from "@radix-ui/themes";
import ExpenseBadge from "./expenses/ExpenseBadge";

function RecentExpensesCard({ expenses }: { expenses: Expense[] }) {
  return (
    <Card className="p-5 space-y-4">
      <Text as="p" className="text-xl">
        Recent Expenses
      </Text>
      <ScrollArea className="h-60" scrollbars="vertical" type="always">
        <Box className="mr-4 space-y-3">
          {expenses.map((expense) => (
            <Card key={expense.id}>
              <Flex justify="between" align="end">
                <Box>
                  <Text as="div">{expense.title}</Text>
                  <Text size="2">
                    {expense.date.toLocaleDateString("en-GB")}
                  </Text>
                </Box>
                <Flex justify="between" direction="column" gapY="2">
                  <Text align="right" weight="bold">
                    $ {expense.amount}
                  </Text>
                  {expense.category && (
                    <ExpenseBadge category={expense.category} />
                  )}
                </Flex>
              </Flex>
            </Card>
          ))}
        </Box>
      </ScrollArea>
    </Card>
  );
}

export default RecentExpensesCard;
