import { Box, Heading } from "@radix-ui/themes";
import React from "react";
import ExpenseFormData from "../ExpenseFormData";
import prisma from "@/prisma/client";

async function SingleExpensePage({ params }: { params: { id: string } }) {
  const expense = await prisma.expense.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!expense) return null;

  return (
    <Box className="m-10">
      <Heading size="8" className="mt-10">
        Expense
      </Heading>
      <ExpenseFormData expense={expense} />
    </Box>
  );
}

export default SingleExpensePage;
