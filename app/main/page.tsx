import prisma from "@/prisma/client";
import { Expense } from "@prisma/client";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Box, Grid, IconButton, Popover, Text } from "@radix-ui/themes";
import { BsPiggyBank } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import { LuReceipt } from "react-icons/lu";
import ExpensesChart from "./ExpensesChart";
import GlanceCard from "./GlanceCard";
import RecentExpensesCard from "./RecentExpensesCard";
import { getBudgets, getExpenses, getUser } from "./utils";

async function Main() {
  const [user, expenses, budgets] = await Promise.all([
    getUser(),
    getExpenses(),
    getBudgets(),
  ]);

  let categoricalExpenses: Expense[] = [];
  for (let i = 0; i < budgets!.length; i++) {
    const expenses = await prisma.expense.findMany({
      where: {
        userId: user?.id,
        category: budgets![i].type,
      },
    });

    if (expenses) categoricalExpenses = [...categoricalExpenses, ...expenses];
  }

  const totalExpense = expenses!.reduce((a, expense) => a + expense.amount, 0);

  const totalBudget = budgets!.reduce((a, budget) => a + budget.capacity, 0);

  const totalCategoricalExpenses = categoricalExpenses.reduce(
    (a, categoricalExpense) => a + categoricalExpense.amount,
    0
  );

  const recentExpenses = expenses!.slice(0, 7);

  const spendInfoButton = (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton variant="ghost">
          <InfoCircledIcon />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content className="text-pretty w-[200px] text-xs">
        Includes all the expenses you have made - budgeted expenses, categorised
        expenses and uncategorised expenses. To check the expenses under each
        budget head over to the budgets page.
      </Popover.Content>
    </Popover.Root>
  );

  const remainingInfoButton = (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton variant="ghost">
          <InfoCircledIcon />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content className="text-pretty w-[200px] text-xs">
        Includes only the total remaining budget of the budgeted expenses.
      </Popover.Content>
    </Popover.Root>
  );

  return (
    <Box className="m-5 md:m-10">
      <Text className="text-3xl md:text-5xl" weight="bold">
        Hi, {user!.name.split(" ")[0]} 👋
      </Text>
      <Text as="p" color="gray" className="mt-3 text-md md:text-xl">
        Here are your expenses at a glance.
      </Text>
      <Grid className="my-10" gap="5">
        <Grid columns={{ initial: "1", md: "3" }} gap="5">
          <GlanceCard
            title="Total Budget"
            amount={totalBudget}
            icon={<BsPiggyBank size={32} />}
          />
          <GlanceCard
            title="Total Remaining"
            amount={totalBudget - totalCategoricalExpenses}
            icon={<IoWalletOutline size={32} />}
            popover={remainingInfoButton}
          />
          <GlanceCard
            title="Total Spend"
            amount={totalExpense}
            icon={<LuReceipt size={32} />}
            popover={spendInfoButton}
          />
        </Grid>
        <Grid columns={{ initial: "1", md: "3" }} gap="5">
          <Box gridColumn={{ initial: "1", md: "span 2" }} height="350px">
            <ExpensesChart data={[...recentExpenses].reverse()} />
          </Box>
          <Box gridColumn={{ initial: "1", md: "3" }} height="350px">
            <RecentExpensesCard expenses={recentExpenses} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export const dynamic = "force-dynamic";

export default Main;
