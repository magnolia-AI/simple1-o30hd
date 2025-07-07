import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

async function createTask(formData: FormData) {
  'use server';
  const title = formData.get('title') as string;
  if (title) {
    await prisma.task.create({
      data: { title },
    });
    revalidatePath('/');
  }
}

export default async function Home() {
  const tasks = await prisma.task.findMany();

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Task Manager</CardTitle>
          <CardDescription>
            A simple application to test database integration with Neon and Prisma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createTask} className="flex gap-2 mb-4">
            <Input
              type="text"
              name="title"
              placeholder="Enter a new task"
            />
            <Button type="submit">
              Add Task
            </Button>
          </form>

          <ul className="divide-y">
            {tasks.map((task) => (
              <li key={task.id} className="p-2">
                {task.title}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

